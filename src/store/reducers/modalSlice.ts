// import {PayloadAction, createSlice} from '@reduxjs/toolkit';
// import Todo from '../@types/Todo';

import { createSlice } from "@reduxjs/toolkit";

// //Action Type
// const initialState: Todo[] = [
//   {
//     id: 140,
//     content: 'test',
//     update_at: '2024-02-22T05:18:51.066388Z',
//     create_at: '2023-06-16T04:13:02.864088Z',
//     isComplete: false,
//   } as Todo,
// ];


// const todoSlice = createSlice({
//   name: 'todo',
//   initialState,
//   reducers: {
//     toggleCompleteById: (state, action: PayloadAction<number>) => {
//       state[action.payload].isComplete = !state[action.payload].isComplete;
//     },
//   },
// });


// export const {toggleCompleteById}  = todoSlice.actions
// export default todoSlice.reducer

type IModal = {
    isTodoEditModalVisible:boolean;
}

const initialState = {isTodoEditModalVisible:false} as IModal;

const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        toggleTodoEditModalVisible:(state)=>{
            state.isTodoEditModalVisible = !state.isTodoEditModalVisible
        }
    }
});

export const {toggleTodoEditModalVisible} = modalSlice.actions;
export default modalSlice.reducer;

