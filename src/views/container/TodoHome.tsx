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
import {
  ActionCreatorWithPayload,
  CaseReducerActions,
  Dispatch,
  current,
} from '@reduxjs/toolkit';



//Promise를 반환하는 Wrapper
const PromisableActionWrapper = <Type extends string, Payload>(
  dispatch: Dispatch,
  fn: ActionCreatorWithPayload<Payload, Type>,
  payload: {},
) => {
  return new Promise((resolve, reject) => {
    try {
      const newPayload: Payload = {...payload, resolve, reject} as Payload;
      dispatch(fn(newPayload));
    } catch (e) {
      reject();
    }
  });
};

const TodoList = () => {
  const _pageSize = 10;
  const _initialPageNum = 0;
  const {data, idOfCompleteTodos,isLoading} = useAppSelector(state => state.todos);
  const [currentPage, setCurrentPage] = useState(_initialPageNum);
  const navigation = useNavigation<RootNavigationProp>();
  useEffect(() => {
    console.log("HERE");
    PromisableActionWrapper(dispatch, todoActions.loadGetPagedTodosRequest, {
      page: currentPage,
      pageSize: _pageSize,
    })
      .then(() => setCurrentPage(currentPage + 1))
      .catch(() => {});

    return () => {
      setCurrentPage(_initialPageNum);
    };
  }, []);

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
    console.log('onEndReached!current PAge:', currentPage);

    PromisableActionWrapper(dispatch, todoActions.loadGetPagedTodosRequest, {
      page: currentPage,
      pageSize: _pageSize,
    })
      .then(() => {
        setCurrentPage(currentPage + 1);
      })
      .catch(() => {});
  };
  const handleRefresh = () => {
    console.log('swiped UP for refresh');
    PromisableActionWrapper(dispatch,todoActions.loadRefreshTodosRequest,{pageSize:_pageSize})
    .then(()=>setCurrentPage(_initialPageNum+1)).catch(()=>{});
    console.log('datasize:',data.length);
  };

  const handleItemPress = (item: Todo) => {
    navigation.navigate('TodoDetail', {todo: item});
  };

  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: SizeConstants.paddingRegular}}
      data={data}
      refreshing={isLoading}
      renderItem={({item, index}) => (
        <Pressable
          style={{height: 200}}
          onPress={() => handleItemPress(item)}>
          <TodoListItem item={item} handleToggleChange={handleToggleChange} />
        </Pressable>
      )}
      keyExtractor={item=>`${item.id}`}
      onEndReached={() => handleOnEndReached()}
      onRefresh={()=>handleRefresh()}
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
  //TODO: Rendering 최적화 필요, toggle 하는 children만 re-render하게 Store 데이터 구조를 변경해야 함.
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
