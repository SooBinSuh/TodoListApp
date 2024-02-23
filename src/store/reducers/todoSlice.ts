import { UpdateTodoRequestBody } from './../../@types/request/todo/UpdateTodoRequestBody';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import Todo from '../../@types/Todo';
import { CreateTodoRequestBody } from '../../@types/request/todo/CreateTodoRequestBody';


export type TodoStateType = {
  isLoading: boolean;
  error: NetworkError|undefined; 
  data: Todo[];
  idOfCompleteTodos: number[];
};

//Action Type
const initialState: TodoStateType = {
  data: [],
  idOfCompleteTodos: [],
  isLoading:false,
  error:undefined,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    toggleCompleteById: (state, action: PayloadAction<number[]>) => {
      state.isLoading = true;
      // const index = state.data.findIndex(i => i.id == action.payload);
      // state.data[index].isComplete = !state.data[index].isComplete;
    },
    toggleCompleteByIdSuccess:(state,action:PayloadAction<number[]>)=>{
      state.isLoading = false;
      state.idOfCompleteTodos = action.payload;
    },
    loadGetTodosRequest:(state)=>{
      state.isLoading = true;
    },
    loadGetTodosSuccess:(state, action:PayloadAction<{todos:Todo[],idOfCompletedTodos:number[]}>)=>{
      state.isLoading = false;
      state.data = action.payload.todos;
      state.idOfCompleteTodos = action.payload.idOfCompletedTodos;
    },
    loadCreateTodoRequest:(state,action:PayloadAction<CreateTodoRequestBody>)=>{
      state.isLoading = true;
    },
    loadCreateTodoRequestSuccess:(state,action:PayloadAction<Todo>)=>{
      state.isLoading = false;
      state.data.push(action.payload);
    },
    loadUpdateTodoRequest:(state, action:PayloadAction<UpdateTodoRequestBody>)=>{
      state.isLoading = true;
    },
    loadUpdateTodoRequestSuccess:(state,action:PayloadAction<{index:number,todo:Todo}>)=>{
      state.isLoading = false;
      state.data[action.payload.index] = action.payload.todo;
    },
    loadTodoRequestFail:(state,action:PayloadAction<Error>)=>{
      state.isLoading = false;
      state.error = action.payload
    }
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
