import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import Todo from '../../@types/Todo';
import RequestResponse from '../../@types/responseType';

export type TodoStateType = {
  isLoading: boolean;
  error: NetworkError|undefined; 
  data: Todo[];
  idOfCompleteTodos: number[];
};

//Action Type
const initialState: TodoStateType = {
  data: [
    {
      id: 140,
      content: 'test',
      update_at: '2024-02-22T05:18:51.066388Z',
      create_at: '2023-06-16T04:13:02.864088Z',
      isComplete: false,
    } as Todo,
  ],
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
    toggleCompleteByIdFail:(state,action:PayloadAction<Error>)=>{
      state.isLoading = false;
      state.error = action.payload;
    },
    loadGetTodosRequest:(state)=>{
      state.isLoading = true;
    },
    loadGetTodosSuccess:(state, action:PayloadAction<{todos:Todo[],idOfCompletedTodos:number[]}>)=>{
      console.log("!@#");
      state.isLoading = false;
      state.data = action.payload.todos;
      state.idOfCompleteTodos = action.payload.idOfCompletedTodos;
      state.error = undefined;
    },
    loadGetTodosFail:(state,action:PayloadAction<Error>)=>{
      state.isLoading = false;
      state.data = [];
      state.error = action.payload;
    },
    
    // readTodosFromStorage:(state)=>{
    //   state.isLoading = true;
    // },
    // readTodosFromStorageSuccess:(state, action:PayloadAction<Map<number,boolean>>)=>{
    //   state.isLoading = false;
    //   // state.storageData = action.payload;
    // },
    // readTodosFromStorageFail:(state, action:PayloadAction<Error>)=>{
    //   state.isLoading = false;
    //   // state.storageData = new Map();
    //   state.error = action.payload;
    // }
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
