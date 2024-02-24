import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { RootNavigationProp } from "../../@types/Stacks";
import { useNavigation } from "@react-navigation/native";
import PromisableActionWrapper from "../../wrappers/PromisableAction";
import { todoActions } from "../../store/reducers/todoSlice";
import { useDispatch } from "react-redux";
import VTodoList, { VTodoListProps } from "../vac/VTodoList";
import Todo from "../../@types/Todo";

const TodoList = () => {
    const _pageSize = 10;
    const _initialPageNum = 0;
    const {data, idOfCompleteTodos, isLoading} = useAppSelector(
      state => state.todos,
    );
    const [currentPage, setCurrentPage] = useState(_initialPageNum);
    const navigation = useNavigation<RootNavigationProp>();
    useEffect(() => {
      PromisableActionWrapper(dispatch, todoActions.loadGetPagedTodosRequest, {
        page: currentPage,
        pageSize: _pageSize,
      })
        .then(() => setCurrentPage(currentPage + 1))
        .catch(() => {});
  
      return () => {
        setCurrentPage(_initialPageNum);
      };
    }, []);
  
    const dispatch = useDispatch();
  
  
    const _props:VTodoListProps = {
      data: data,
      isLoading: isLoading,
      handleItemPress: (item:Todo)=>handleItemPress(item),
      handleToggleChange: (id:number)=>handleToggleChange(id),
      handleOnEndReached: ()=>handleOnEndReached(),
      handleRefresh: ()=>handleRefresh(),
    }
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
    const handleOnEndReached = () => {
      PromisableActionWrapper(dispatch, todoActions.loadGetPagedTodosRequest, {
        page: currentPage,
        pageSize: _pageSize,
      })
        .then(() => {
          setCurrentPage(currentPage + 1);
        })
        .catch(() => {});
    };
    const handleRefresh = () => {
      PromisableActionWrapper(dispatch, todoActions.loadRefreshTodosRequest, {
        pageSize: _pageSize,
      })
        .then(() => setCurrentPage(_initialPageNum + 1))
        .catch(() => {});
    };
  
    const handleItemPress = (item: Todo) => {
      navigation.navigate('TodoDetail', {todo: item});
    };
  
    return (
      <VTodoList  {..._props}/>
    );
  };
export default TodoList;  