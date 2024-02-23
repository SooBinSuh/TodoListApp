import { AxiosResponse } from "axios";
import RequestResponse from "../../@types/responseType";
import Todo from "../../@types/Todo";
import { all,call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { todoActions } from "../reducers/todoSlice";
import { apiGetTodos, readTodosFromStorage, writeTodosToStorage } from "../../services/todoService";
import { PayloadAction } from "@reduxjs/toolkit";


function* loadGetTodos(){
    console.log("HERE")
    try{
        const {data}: AxiosResponse<Todo[]> = yield call(apiGetTodos);
        const storageData:number[] = yield call(readTodosFromStorage);
        yield put(todoActions.loadGetTodosSuccess({todos:data,idOfCompletedTodos:storageData}));
    }catch(error){
        if (error instanceof Error){
            console.log("error:",error);
            yield put(todoActions.loadGetTodosFail(error));
        }
    }
}
function* loadWriteTodosToStorage(action:PayloadAction<number[]>){
    try{
        yield call(writeTodosToStorage,action.payload);

        yield put(todoActions.toggleCompleteByIdSuccess(action.payload))
    }catch(e){
        if (e instanceof Error){
            yield put(todoActions.toggleCompleteByIdFail(e));
        }
    }
}

export default function* todoSaga(){
    console.log("todo")
    yield takeLatest(todoActions.loadGetTodosRequest,loadGetTodos);
    yield takeLatest(todoActions.toggleCompleteById,loadWriteTodosToStorage);
}