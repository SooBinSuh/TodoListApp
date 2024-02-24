import {useAppSelector} from '../../hooks';

import {useDispatch} from 'react-redux';
import {TodoEditModalMode, modalActions} from '../../store/reducers/modalSlice';
import VTodoHome, { VTodoHomeProps } from '../vac/VTodoHome';





const TodoHome = () => {
  const dispatch = useDispatch();
  const {data, isLoading} = useAppSelector(state => state.todos);
  const _props: VTodoHomeProps = {
    handleShowModalButtonPress: ()=>handleShowModalButtonPress(),

  }
  const handleShowModalButtonPress = () => {
    dispatch(
      modalActions.toggleTodoEditModalVisible({
        content: '',
        mode: TodoEditModalMode.create,
      }),
    );
  };
  return (
    <VTodoHome  {..._props}/>
  );
};

export default TodoHome;
