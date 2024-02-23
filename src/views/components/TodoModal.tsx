import { useState } from "react";
import VTodoInputModal, { VTodoInputModalProps } from "../vac/VTodoInputModal";
import { useAppSelector } from "../../hooks";
// import {  } from "../../store/reducers/modalSlice";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/reducers/todoSlice";
import { modalActions } from "../../store/reducers/modalSlice";

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
    onBackgroundPress: () => dispatch(modalActions.toggleTodoEditModalVisible()),
    onChangeText: t => {
      setContent(t);
    },
    onCreatePress: () => {
      dispatch(todoActions.loadCreateTodoRequest({ content: content }));
    },
    isCreatePressable: content.length > 0 ? true: false
  };
  return <VTodoInputModal {..._props} />;
};

export default TodoModal