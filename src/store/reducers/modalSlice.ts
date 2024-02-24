import { PayloadAction, createSlice } from "@reduxjs/toolkit";



type IModal = {
    isTodoEditModalVisible:boolean,
    todoEditModalId:number,
    todoEditModalContent:string,
    todoEditModalMode:TodoEditModalMode,
}

export enum TodoEditModalMode{
    create,
    edit
}

export type ToggleTodoEditModalActionProps = {
    content?:string;
    id?:number;
    mode?:TodoEditModalMode;
}

const initialState:IModal = {isTodoEditModalVisible:false,todoEditModalContent:'',todoEditModalId:-1,todoEditModalMode:TodoEditModalMode.create};


const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        toggleTodoEditModalVisible:(state,action:PayloadAction<ToggleTodoEditModalActionProps>)=>{
            state.isTodoEditModalVisible = !state.isTodoEditModalVisible;
            state.todoEditModalContent = action.payload.content ?? '';
            state.todoEditModalMode = action.payload.mode ?? TodoEditModalMode.create;
            state.todoEditModalId = action.payload.id ?? -1;
        },
        setTodoEditModalContent:(state,action:PayloadAction<string>)=>{
            state.todoEditModalContent = action.payload;
        },
    }
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;

