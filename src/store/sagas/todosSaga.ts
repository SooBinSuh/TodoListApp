import { Axios, AxiosResponse } from "axios";

import Todo from "../../@types/Todo";
import { all,call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { todoActions } from "../reducers/todoSlice";
import { apiCreateTodo, apiGetTodos, readTodosFromStorage, writeTodosToStorage } from "../../services/todoService";
import { PayloadAction } from "@reduxjs/toolkit";
import { CreateTodoRequestBody } from "../../@types/request/todo/CreateTodoRequestBody";
import { modalActions } from "../reducers/modalSlice";

// Todo 목록 서버에서 불러오고 동기화하기 위한 Effect
function* loadGetTodos(){
    try{
        const {data}: AxiosResponse<Todo[]> = yield call(apiGetTodos);
        const storageData:number[] = yield call(readTodosFromStorage);
        yield put(todoActions.loadGetTodosSuccess({todos:data,idOfCompletedTodos:storageData}));
    }catch(error){
        if (error instanceof Error){
            yield put(todoActions.loadGetTodosFail(error));
        }
    }
}

// toggle이후 변동사항 저장소에 저장하기 위한 Effect
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
//Todo 생성하기 위한 Effect
function* loadCreateTodo(action:PayloadAction<CreateTodoRequestBody>){
    try{
        const {data}: AxiosResponse<Todo> = yield call(apiCreateTodo,action.payload);
        yield put(todoActions.loadCreateTodoRequestSuccess(data));
        yield put(modalActions.toggleTodoEditModalVisible());
    }catch(e){
        if (e instanceof Error){
            yield put(todoActions.loadCreateTodoRequestFail(e));
        }
    }
}
// function* loadUpdateTodo()

export default function* todoSaga(){
    yield takeLatest(todoActions.loadGetTodosRequest,loadGetTodos);
    yield takeLatest(todoActions.toggleCompleteById,loadWriteTodosToStorage);
    yield takeLatest(todoActions.loadCreateTodoRequest,loadCreateTodo);
}