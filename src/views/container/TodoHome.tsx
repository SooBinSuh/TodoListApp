import {Button, Pressable, ScrollView, Switch, Text, View} from 'react-native';
import {useAppSelector} from '../../hooks';
import {ColorConstants, SizeConstants} from '../../constants/Constants';
import {todoActions} from '../../store/reducers/todoSlice';

import {useDispatch} from 'react-redux';
import {useEffect, useMemo} from 'react';
import Todo from '../../@types/Todo';
import { modalActions } from '../../store/reducers/modalSlice';

const TodoList = () => {
  const {data, isLoading, idOfCompleteTodos} = useAppSelector(
    state => state.todos,
  );
  const dispatch = useDispatch();
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

  // useD
  return (
    <ScrollView
      contentContainerStyle={{paddingHorizontal: SizeConstants.paddingRegular}}
      style={{flex: 1, backgroundColor: ColorConstants.background}}>
      {data.map(todo => {
        return (
          <TodoListItem key={todo.id} item={todo} handleToggleChange={handleToggleChange}/>  
        );
      })}
    </ScrollView>
  );
};
type TodoListItemProp = {
  item: Todo;
  handleToggleChange:(i:number)=>void;
};
const TodoListItem = ({item,handleToggleChange}: TodoListItemProp) => {
  const {idOfCompleteTodos} = useAppSelector(state => state.todos);
  //TODO: Rendering 최적화 필요, toggle 하는 children만 re-render하게 변경해야함
  console.log("rendering:",item.id);
  const isComplete = useMemo(
    () => idOfCompleteTodos.includes(item.id),
    [idOfCompleteTodos],
  );
  return (
    <View
    style={{
      height: 80,
      justifyContent: 'center',
    }}>
    <View style={{flexDirection: 'row'}}>
      <Text style={{flex: 1}}>{item.content}</Text>
      <Switch
        value={isComplete}
        onValueChange={() => handleToggleChange(item.id)}
      />
    </View>
  </View>
  )
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
          height: 50,
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
