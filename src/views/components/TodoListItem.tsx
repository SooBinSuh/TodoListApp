import { useDispatch } from "react-redux";
import Todo from "../../@types/Todo";
import { useAppSelector } from "../../hooks";
import VTodoListItem, { VTodoListItemProp } from "../vac/VTodoListItem";
import { useMemo } from "react";
import createYesOrNoAlert from "./MyAlert";
import { todoActions } from "../../store/reducers/todoSlice";
import { TodoEditModalMode, modalActions } from "../../store/reducers/modalSlice";

type TodoListItemProp = {
    item: Todo;
    handleToggleChange: (i: number) => void;
  };
const TodoListItem = ({item, handleToggleChange}: TodoListItemProp) => {
    const {idOfCompleteTodos,data} = useAppSelector(state => state.todos);
    const dispatch = useDispatch();
    const isComplete = useMemo(
      () => idOfCompleteTodos.includes(item.id),
      [idOfCompleteTodos],
    );
  
    const _props: VTodoListItemProp = {
      handleToggleComplete:()=>{
        handleToggleChange(item.id)
      },
      content:item.content,
      isComplete:isComplete,
      isLastItem: data.slice(-1).shift() == item ,
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
      <VTodoListItem {..._props}/>
    );
  };

  export default TodoListItem;