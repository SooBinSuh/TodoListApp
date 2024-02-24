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
    //TODO: Rendering 최적화 필요, toggle 하는 children만 re-render하게 Store 데이터 구조를 변경해야 함.
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