import {Button, Pressable, ScrollView, Switch, Text, View} from 'react-native';
import {useAppSelector} from '../../hooks';
import {ColorConstants, SizeConstants} from '../../constants/Constants';
import {toggleCompleteById} from '../../store/todoSlice';
import {toggleTodoEditModalVisible} from '../../store/modalSlice';
import { useDispatch } from 'react-redux';

const TodoList = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useDispatch();
  const handleToggleChange = (id:number) => {dispatch(toggleCompleteById(id))};

  // useD
  return (
    <ScrollView
      contentContainerStyle={{paddingHorizontal: SizeConstants.paddingRegular}}
      style={{flex: 1, backgroundColor: ColorConstants.background}}>
      {todos.map(todo => {
        return (
          <View
            key={todo.id}
            style={{
              height: 80,
              backgroundColor: 'red',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 1}}>{todo.content}</Text>
              <Switch
                value={todo.isComplete}
                onValueChange={()=>handleToggleChange(todo.id)}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const TodoHome = () => {
  const dispatch = useDispatch();
  const handleShowModalButtonPress = () => {
    console.log('click')
    dispatch(toggleTodoEditModalVisible());
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
        onPress={handleShowModalButtonPress}
        >
        <Text>추가하기</Text>
      </Pressable>
    </View>
  );
};

export default TodoHome;
