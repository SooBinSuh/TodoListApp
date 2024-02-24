import {UpdateTodoRequestBody} from './../../@types/request/todo/UpdateTodoRequestBody';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import Todo from '../../@types/Todo';
import {CreateTodoRequestBody} from '../../@types/request/todo/CreateTodoRequestBody';
import DeleteTodoRequestBody from '../../@types/request/todo/DeleteTodoRequestBody';
import GetPagedTodoRequestBody from '../../@types/request/todo/GetPagedTodoRequestBody';

export type TodoStateType = {
  isLoading: boolean;
  error: NetworkError | undefined;
  data: Todo[];

  idOfCompleteTodos: number[];
};

//Action Type
const initialState: TodoStateType = {
  data: [],
  idOfCompleteTodos: [],
  isLoading: false,
  error: undefined,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    toggleCompleteById: (state, action: PayloadAction<number[]>) => {
      state.isLoading = true;
    },
    toggleCompleteByIdSuccess: (state, action: PayloadAction<number[]>) => {
      state.isLoading = false;
      state.idOfCompleteTodos = action.payload;
    },
    loadGetTodosRequest: state => {
      state.isLoading = true;
    },
    loadGetTodosSuccess: (
      state,
      action: PayloadAction<{todos: Todo[]; idOfCompletedTodos: number[]}>,
    ) => {
      state.isLoading = false;
      state.data = action.payload.todos;
      state.idOfCompleteTodos = action.payload.idOfCompletedTodos;
    },
    loadGetPagedTodosRequest:( state,action:PayloadAction<GetPagedTodoRequestBody>) =>{
      state.isLoading = true;
    },
    loadCreateTodoRequest: (
      state,
      action: PayloadAction<CreateTodoRequestBody>,
    ) => {
      state.isLoading = true;
    },
    loadCreateTodoRequestSuccess: (state, action: PayloadAction<Todo>) => {
      state.isLoading = false;
      state.data.unshift(action.payload);
    },
    loadUpdateTodoRequest: (
      state,
      action: PayloadAction<UpdateTodoRequestBody>,
    ) => {
      state.isLoading = true;
    },
    loadUpdateTodoRequestSuccess: (
      state,
      action: PayloadAction<{index: number; todo: Todo}>,
    ) => {
      state.isLoading = false;
      state.data[action.payload.index] = action.payload.todo;
    },
    loadTodoRequestFail: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loadDeleteTodoRequest: (
      state,
      action: PayloadAction<DeleteTodoRequestBody>,
    ) => {
      state.isLoading = true;
    },
    loadDeleteTodoRequestSuccess: (
      state,
      action: PayloadAction<{
        indexOfTodos: number;
        indexOfCompleteTodos: number;
      }>,
    ) => {
      state.isLoading = false;
      state.data.splice(action.payload.indexOfTodos, 1);
      state.idOfCompleteTodos.splice(
        action.payload.indexOfCompleteTodos,
        action.payload.indexOfCompleteTodos > -1 ? 1 : 0,
      );
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
