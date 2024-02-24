import { createSlice } from "@reduxjs/toolkit";


type IModal = {
    isTodoEditModalVisible:boolean;
    todoEditModalContent:string;
}

const initialState = {isTodoEditModalVisible:false,todoEditModalContent:''} as IModal;

const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        toggleTodoEditModalVisible:(state)=>{
            state.isTodoEditModalVisible = !state.isTodoEditModalVisible
        }
    }
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;

