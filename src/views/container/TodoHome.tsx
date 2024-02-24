import {
  Pressable,
  Text,
  View,
} from 'react-native';
import {useAppSelector} from '../../hooks';
import {
  SizeConstants,
} from '../../constants/Constants';

import {useDispatch} from 'react-redux';
import {TodoEditModalMode, modalActions} from '../../store/reducers/modalSlice';



import TodoList from '../components/TodoList';





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
        <Text>추가하기</Text>
      </Pressable>
    </View>
  );
};

export default TodoHome;
