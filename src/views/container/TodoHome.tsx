import {Button, Pressable, ScrollView, Switch, Text, View} from 'react-native';
import {useAppSelector} from '../../hooks';
import {ColorConstants, SizeConstants} from '../../constants/Constants';
import {todoActions} from '../../store/reducers/todoSlice';

import {useDispatch} from 'react-redux';
import {useEffect, useMemo} from 'react';
import Todo from '../../@types/Todo';
import {modalActions} from '../../store/reducers/modalSlice';
import {useNavigation} from '@react-navigation/native';

import {RootNavigationProp, TodoStackParamList} from '../../@types/Stacks';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import createYesOrNoAlert from '../components/MyAlert';

const TodoList = () => {
  const {data, idOfCompleteTodos} = useAppSelector(state => state.todos);
  const navigation = useNavigation<RootNavigationProp>();

  const dispatch = useDispatch();

  //TODO: 해당 로직 리팩토링 필요
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

  const handleItemPress = (item: Todo) => {
    navigation.navigate('TodoDetail', {todo: item});
  };

  return (
    <ScrollView
      contentContainerStyle={{paddingHorizontal: SizeConstants.paddingRegular}}
      style={{flex: 1, backgroundColor: ColorConstants.background}}>
      {data.map(todo => {
        return (
          <Pressable key={todo.id} onPress={() => handleItemPress(todo)}>
            <TodoListItem item={todo} handleToggleChange={handleToggleChange} />
          </Pressable>
        );
      })}
    </ScrollView>
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
      dispatch(modalActions.toggleTodoEditModalVisible());
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

  useEffect(() => {
    console.log('in useeffect');
    dispatch(todoActions.loadGetTodosRequest());
  }, []);

  const handleShowModalButtonPress = () => {
    dispatch(modalActions.toggleTodoEditModalVisible());
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
