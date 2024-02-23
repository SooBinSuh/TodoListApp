import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Todo from '../../@types/Todo';
import {TodoStackParamList} from '../../@types/Stacks';
import {Keyboard, Pressable, Switch, Text, TextInput, View} from 'react-native';
import {ColorConstants, SizeConstants} from '../../constants/Constants';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useAppSelector} from '../../hooks';
import {useDispatch} from 'react-redux';
import {todoActions} from '../../store/reducers/todoSlice';
import VTodoDetail, {VTodoDetailProps} from '../vac/VTodoDetail';

type TodoDetailProp = NativeStackScreenProps<TodoStackParamList, 'TodoDetail'>;

export const TodoDetail = (props: TodoDetailProp) => {
  const [content, setContent] = useState(props.route.params.todo.content);
  const {idOfCompleteTodos,data} = useAppSelector(state => state.todos);
  const dispatch = useDispatch();
  const didRender = useRef(false);
  console.log('re-render ref:',didRender);
  
  const isComplete = useMemo(
    () => idOfCompleteTodos.includes(props.route.params.todo.id),
    [idOfCompleteTodos],
  );

  useEffect(() => {
    console.log('ref:',didRender);
    console.log('todoset!',props.route.params.todo);
    console.log('content:',content);
    if(!didRender.current){
      didRender.current = true;
    }else{
      props.navigation.pop();

    }
    console.log('set render:',didRender.current);
    return () => {
      setContent('');
    };
  }, [data]);

  const _props: VTodoDetailProps = {
    todo: props.route.params.todo,
    inputContent: content,
    isComplete: isComplete,
    isEditable: !isComplete,
    handleToggleChange: () => {
      let newArr = [...idOfCompleteTodos];
      let index = idOfCompleteTodos.indexOf(props.route.params.todo.id);
      if (index > -1) {
        newArr.splice(index, 1);
      } else {
        newArr.push(props.route.params.todo.id);
      }
      dispatch(todoActions.toggleCompleteById(newArr));
    },
    handleInputChange: (t: string) => setContent(t),
    handleBackgroundPress: () => Keyboard.dismiss(),
    handleSetTodo: () => {
      dispatch(
        todoActions.loadUpdateTodoRequest({
          id: props.route.params.todo.id,
          content: content,
        }),
      );
    },
  };
  return <VTodoDetail {..._props} />;
};

export default TodoDetail;
