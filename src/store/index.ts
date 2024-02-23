import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import modalSlice from "./modalSlice";
// import todoReducer from "./todoSlice";

// const rootReducer = combineReducers({todos});


export const store = configureStore({
    reducer:{
        todos: todoSlice,
        modal: modalSlice,
    }
});


export type RootState = ReturnType<typeof store.getState>

export default store