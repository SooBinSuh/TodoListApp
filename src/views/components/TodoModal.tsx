import { useState } from "react";
import VTodoInputModal, { VTodoInputModalProps } from "../vac/VTodoInputModal";
import { useAppSelector } from "../../hooks";
import { toggleTodoEditModalVisible } from "../../store/reducers/modalSlice";
import { useDispatch } from "react-redux";

export type TodoModalProps = {

};

export const TodoModal = (props: TodoModalProps): React.JSX.Element => {

  const {isTodoEditModalVisible} = useAppSelector(state => state.modal);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const _props: VTodoInputModalProps = {
    content: content,
    isModalVisible: isTodoEditModalVisible,
    onModalDismiss: () => {
      setContent('');
    },
    onBackgroundPress: ()=>dispatch(toggleTodoEditModalVisible()),
    onChangeText: t => {
      setContent(t);
    },
    onCreatePress: () => {
      console.log('Create PRESSED!');
    },
  };
  return <VTodoInputModal {..._props} />;
};

export default TodoModal