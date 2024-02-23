import {Axios, AxiosResponse} from 'axios';

import Todo from '../../@types/Todo';
import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {TodoStateType, todoActions} from '../reducers/todoSlice';
import {
  apiCreateTodo,
  apiDeleteTodo,
  apiGetTodos,
  apiUpdateTodo,
  readTodosFromStorage,
  writeTodosToStorage,
} from '../../services/todoService';
import {PayloadAction} from '@reduxjs/toolkit';
import {CreateTodoRequestBody} from '../../@types/request/todo/CreateTodoRequestBody';
import {modalActions} from '../reducers/modalSlice';
import UpdateTodoRequestBody from '../../@types/request/todo/UpdateTodoRequestBody';
import {AppState} from 'react-native';
import {RootState} from '../reducers';
import DeleteTodoRequestBody from '../../@types/request/todo/DeleteTodoRequestBody';
// import { RootState } from "@reduxjs/toolkit/query";

const getTodos = (state: RootState): Todo[] => {
  return state.todos.data;
};

const getIdOfCompleteTodos = (state: RootState): number[]=>{
    return state.todos.idOfCompleteTodos;
}
// Todo 목록 서버에서 불러오고 동기화하기 위한 Effect
function* loadGetTodos() {
  try {
    const {data}: AxiosResponse<Todo[]> = yield call(apiGetTodos);
    const storageData: number[] = yield call(readTodosFromStorage);
    yield put(
      todoActions.loadGetTodosSuccess({
        todos: data,
        idOfCompletedTodos: storageData,
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(todoActions.loadTodoRequestFail(error));
    }
  }
}

// toggle이후 변동사항 저장소에 저장하기 위한 Effect
function* loadWriteTodosToStorage(action: PayloadAction<number[]>) {
  try {
    yield call(writeTodosToStorage, action.payload);

    yield put(todoActions.toggleCompleteByIdSuccess(action.payload));
  } catch (e) {
    if (e instanceof Error) {
      yield put(todoActions.loadTodoRequestFail(e));
    }
  }
}
//Todo 생성하기 위한 Effect
function* loadCreateTodo(action: PayloadAction<CreateTodoRequestBody>) {
  try {
    const {data}: AxiosResponse<Todo> = yield call(
      apiCreateTodo,
      action.payload,
    );
    yield put(todoActions.loadCreateTodoRequestSuccess(data));
    yield put(modalActions.toggleTodoEditModalVisible());
  } catch (e) {
    if (e instanceof Error) {
      yield put(todoActions.loadTodoRequestFail(e));
    }
  }
}
function* loadUpdateTodo(action: PayloadAction<UpdateTodoRequestBody>) {
  try {
    const {data}: AxiosResponse<Todo> = yield call(
      apiUpdateTodo,
      action.payload,
    );
    const _todos: Todo[] = yield select(getTodos);

    const indexOfUpdatedItem = _todos.findIndex(t => t.id == action.payload.id);

    if (indexOfUpdatedItem > -1) {
      yield put(
        todoActions.loadUpdateTodoRequestSuccess({
          index: indexOfUpdatedItem,
          todo: data,
        }),
      );
    } else {
      throw new Error('업데이트를 하지 못했어요');
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(todoActions.loadTodoRequestFail(e));
    }
  }
}
function* loadDeleteTodo(action: PayloadAction<DeleteTodoRequestBody>) {
  try {
    const response: AxiosResponse = yield call(apiDeleteTodo, action.payload);
    console.log('delete response:', response);

    const _todos:Todo[] = yield select(getTodos);
    const indexOfTodo = _todos.findIndex((t)=>t.id === action.payload.id);
    const _idOfCompleteTodos:number[] = yield select(getIdOfCompleteTodos);
    const indexOfCompleteTodo = _idOfCompleteTodos.findIndex((n)=> n == action.payload.id);

    if(indexOfTodo > -1){
        console.log('index1:',indexOfTodo,'index2:',indexOfCompleteTodo);
        //async storage 저장
        // yield call(readTodosFromStorage)
        yield call(writeTodosToStorage,_idOfCompleteTodos.filter((n)=>n != action.payload.id));
        yield put(todoActions.loadDeleteTodoRequestSuccess({
            indexOfTodos: indexOfTodo,
            indexOfCompleteTodos: indexOfCompleteTodo
        }))
    }else{
        throw new Error('삭제를 하지 못했어요');
    }

  } catch (e) {
    if (e instanceof Error) {
        console.log('deleteerror',e);
      yield put(todoActions.loadTodoRequestFail(e));
    }
  }
}

export default function* todoSaga() {
  yield takeLatest(todoActions.loadGetTodosRequest, loadGetTodos);
  yield takeLatest(todoActions.toggleCompleteById, loadWriteTodosToStorage);
  yield takeLatest(todoActions.loadCreateTodoRequest, loadCreateTodo);
  yield takeLatest(todoActions.loadUpdateTodoRequest, loadUpdateTodo);
  yield takeLatest(todoActions.loadDeleteTodoRequest,loadDeleteTodo);
}
