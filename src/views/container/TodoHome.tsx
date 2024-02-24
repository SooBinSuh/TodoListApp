import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import {useAppSelector} from '../../hooks';
import {ColorConstants, SizeConstants} from '../../constants/Constants';
import {todoActions} from '../../store/reducers/todoSlice';

import {useDispatch} from 'react-redux';
import {useEffect, useMemo, useReducer, useRef, useState} from 'react';
import Todo from '../../@types/Todo';
import {TodoEditModalMode, modalActions} from '../../store/reducers/modalSlice';
import {useNavigation} from '@react-navigation/native';

import {RootNavigationProp, TodoStackParamList} from '../../@types/Stacks';
import createYesOrNoAlert from '../components/MyAlert';
import {Dispatch} from '@reduxjs/toolkit';


//Reducer가 성공했을 경우에만 다음 페이지를 로딩하고자 Promise를 감쌌다.
const getTodoAsyncCreator = (
  dispatch: Dispatch,
  payload: {page: number; pageSize: number},
) => {
  return new Promise((resolve, reject) =>
    dispatch(
      todoActions.loadGetPagedTodosRequest({
        page: payload.page,
        pageSize: payload.pageSize,
        resolve: resolve,
        reject: reject,
      }),
    ),
  );
};

const TodoList = () => {
  const {data, idOfCompleteTodos} = useAppSelector(state => state.todos);
  const [currentPage, setCurrentPage] = useState(0);
  const _pageSize = 3;
  useEffect(() => {
    getTodoAsyncCreator(dispatch, {page: currentPage, pageSize: _pageSize})
      .then(() => {
        setCurrentPage(currentPage + 1);
      }).catch()

    return () => {
      setCurrentPage(0);
    };
  }, []);

  const navigation = useNavigation<RootNavigationProp>();

  const dispatch = useDispatch();

  //TODO: 액션핸들러에서 결과 배열을 계산하는것이 아닌 reducer에서 처리하도록 리펙토링 필요
  const handleToggleChange = (id: number) => {
    let newArr = [...idOfCompleteTodos];
    let index = idOfCompleteTodos.indexOf(id);
    if (index > -1) {
      newArr.splice(index, 1);
    } else {
      newArr.push(id);
    }
    dispatch(todoActions.toggleCompleteById(newArr));
  };
  const handleOnEndReached = () => {
    console.log('onEndReached!current PAge:',currentPage);
    getTodoAsyncCreator(dispatch, {page: currentPage, pageSize: _pageSize})
      .then(() => {
        setCurrentPage(currentPage + 1);
      }).catch()
  };

  const handleItemPress = (item: Todo) => {
    navigation.navigate('TodoDetail', {todo: item});
  };

  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: SizeConstants.paddingRegular}}
      data={data}
      renderItem={({item, index}) => (
        <Pressable key={item.id} style={{height:200}} onPress={()=>handleItemPress(item)}>
          <TodoListItem item={item} handleToggleChange={handleToggleChange} />
        </Pressable>
      )}
      onEndReached={()=>handleOnEndReached()}
    />
  );
};
type TodoListItemProp = {
  item: Todo;
  handleToggleChange: (i: number) => void;
};

type VTodoListItemProp = {
  handleDeletePress: () => void;
  handleEditPress: () => void;
};
const TodoListItem = ({item, handleToggleChange}: TodoListItemProp) => {
  const {idOfCompleteTodos} = useAppSelector(state => state.todos);
  const dispatch = useDispatch();
  //TODO: Rendering 최적화 필요, toggle 하는 children만 re-render하게 변경해야함
  const isComplete = useMemo(
    () => idOfCompleteTodos.includes(item.id),
    [idOfCompleteTodos],
  );

  const _props: VTodoListItemProp = {
    handleDeletePress: () => {
      createYesOrNoAlert({
        title: '삭제',
        body: `${item.id} 아이템을 삭제하시겠습니까?`,
        handleOK: () => {
          dispatch(
            todoActions.loadDeleteTodoRequest({
              id: item.id,
            }),
          );
        },
        handleNO: () => {},
      });
    },
    handleEditPress: () => {
      console.log('will edit!');
      dispatch(
        modalActions.toggleTodoEditModalVisible({
          content: item.content,
          mode: TodoEditModalMode.edit,
          id: item.id,
        }),
      );
    },
  };
  return (
    <View
      style={{
        height: 80,
        justifyContent: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex: 1}}>{item.content}</Text>
        <Pressable
          onPress={_props.handleEditPress}
          style={{
            padding: 8,
            backgroundColor: ColorConstants.green30,
            borderRadius: SizeConstants.borderRadius,
            justifyContent: 'center',
            alignItems: 'center',
            marginEnd: SizeConstants.paddingRegular,
          }}>
          <Text>수정</Text>
        </Pressable>
        <Pressable
          onPress={_props.handleDeletePress}
          style={{
            padding: 8,
            backgroundColor: ColorConstants.warning30,
            borderRadius: SizeConstants.borderRadius,
            justifyContent: 'center',
            alignItems: 'center',
            marginEnd: SizeConstants.paddingRegular,
          }}>
          <Text>삭제</Text>
        </Pressable>
        <Switch
          value={isComplete}
          onValueChange={() => handleToggleChange(item.id)}
        />
      </View>
    </View>
  );
};
const TodoHome = () => {
  const dispatch = useDispatch();
  const {data, isLoading} = useAppSelector(state => state.todos);

  const handleShowModalButtonPress = () => {
    dispatch(
      modalActions.toggleTodoEditModalVisible({
        content: '',
        mode: TodoEditModalMode.create,
      }),
    );
  };
  return (
    <View style={{flex: 1}}>
      
      <TodoList />
      <Pressable
        style={{
          height: SizeConstants.bottomButtonHeight,
          backgroundColor: 'lightblue',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleShowModalButtonPress}>
        <Text>{isLoading ? 'isloading' : 'not loading'}</Text>
        <Text>추가하기</Text>
      </Pressable>
    </View>
  );
};

export default TodoHome;
