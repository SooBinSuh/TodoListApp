import {useState} from 'react';
import VTodoInputModal, {VTodoInputModalProps} from '../vac/VTodoInputModal';
import {useAppSelector} from '../../hooks';
// import {  } from "../../store/reducers/modalSlice";
import {useDispatch} from 'react-redux';
import {todoActions} from '../../store/reducers/todoSlice';
import {TodoEditModalMode, modalActions} from '../../store/reducers/modalSlice';

// export type TodoModalProps = {};

export const TodoModal = (): React.JSX.Element => {
  const {
    isTodoEditModalVisible,
    todoEditModalContent,
    todoEditModalMode,
    todoEditModalId,
  } = useAppSelector(state => state.modal);

  // const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const _props: VTodoInputModalProps = {
    content: todoEditModalContent,
    isModalVisible: isTodoEditModalVisible,
    modalMode: todoEditModalMode,
    // onModalDismiss: () => {
    //   // dispatch(modalActions.setTodoEditModalContent(''))
    //   // setContent('');
    // },
    onBackgroundPress: () =>
      dispatch(modalActions.toggleTodoEditModalVisible({})),
    onChangeText: t => {
      dispatch(modalActions.setTodoEditModalContent(t));
    },
    onSubmitPress: () => {
      if (todoEditModalMode == TodoEditModalMode.create) {
        dispatch(
          todoActions.loadCreateTodoRequest({content: todoEditModalContent}),
        );
      } else {
        dispatch(
          todoActions.loadUpdateTodoRequest({
            id: todoEditModalId,
            content: todoEditModalContent,
          }),
        );
      }
    },
    isCreatePressable: todoEditModalContent.length > 0 ? true : false,
  };
  return <VTodoInputModal {..._props} />;
};

export default TodoModal;
