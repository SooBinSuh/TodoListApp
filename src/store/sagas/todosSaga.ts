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
import {PayloadAction, __DO_NOT_USE__ActionTypes} from '@reduxjs/toolkit';
import {CreateTodoRequestBody} from '../../@types/request/todo/CreateTodoRequestBody';
import {modalActions} from '../reducers/modalSlice';
import UpdateTodoRequestBody from '../../@types/request/todo/UpdateTodoRequestBody';
import {AppState} from 'react-native';
import {RootState} from '../reducers';
import DeleteTodoRequestBody from '../../@types/request/todo/DeleteTodoRequestBody';
import GetPagedTodoRequestBody from '../../@types/request/todo/GetPagedTodoRequestBody';
import PromisableResponseBody from '../../@types/request/PromisableRequestBody';
import PromisableRefreshTodoRequestBody from '../../@types/request/todo/RefreshTodoRequestBody';
// import { RootState } from "@reduxjs/toolkit/query";

const getTodos = (state: RootState): Todo[] => {
  return state.todos.data;
};

const getIdOfCompleteTodos = (state: RootState): number[]=>{
    return state.todos.idOfCompleteTodos;
}
const getModalIsVisible = (state:RootState):boolean=>state.modal.isTodoEditModalVisible;

function* loadRefreshTodos(action:PayloadAction<PromisableRefreshTodoRequestBody>){
  try{
    const {data}: AxiosResponse<Todo[]> = yield call(apiGetTodos);
    yield put(todoActions.loadRefreshTodosRequestSuccess(data.slice(0,action.payload.pageSize)));
    action.payload.resolve(true);
  }catch(e){
    if (e instanceof Error){
      yield put(todoActions.loadTodoRequestFail(e));
      action.payload.reject();
    }
  }
}
function* loadGetPagedTodos(action:PayloadAction<GetPagedTodoRequestBody>){
    try{
        const {data}: AxiosResponse<Todo[]> = yield call(apiGetTodos);
        const {page,pageSize} = action.payload;
        if (data.length > page * pageSize){//data exists
            const storageData: number[] = yield call(readTodosFromStorage);
            //re-order
            const _todos: Todo[] = yield select(getTodos);//returns immutable
            const slicedTodos = [...data.slice(page * pageSize,(page*pageSize)+pageSize)];

            yield put(todoActions.loadGetTodosSuccess({
                todos: _todos.concat(slicedTodos),
                idOfCompletedTodos:storageData
            }));
            action.payload.resolve(true);
        }else{
            //EOF
            throw new Error("더 이상 불러올 데이터가 없어요");
        }
    }catch(e){
        if (e instanceof Error){
            yield put(todoActions.loadTodoRequestFail(e));
            action.payload.reject();
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
function* loadCreateTodo(action: PayloadAction<CreateTodoRequestBody>) {
  try {
    const {data}: AxiosResponse<Todo> = yield call(
      apiCreateTodo,
      action.payload,
    );
    yield put(todoActions.loadCreateTodoRequestSuccess(data));
    yield put(modalActions.toggleTodoEditModalVisible({}));//close modal
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
      const isModalVisible:boolean = yield select(getModalIsVisible);

      if(isModalVisible){
        yield put((modalActions.toggleTodoEditModalVisible({})));
      }
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

    const _todos:Todo[] = yield select(getTodos);
    const indexOfTodo = _todos.findIndex((t)=>t.id === action.payload.id);
    const _idOfCompleteTodos:number[] = yield select(getIdOfCompleteTodos);
    const indexOfCompleteTodo = _idOfCompleteTodos.findIndex((n)=> n == action.payload.id);

    if(indexOfTodo > -1){
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
      yield put(todoActions.loadTodoRequestFail(e));
    }
  }
}

export default function* todoSaga() {
  yield takeLatest(todoActions.toggleCompleteById, loadWriteTodosToStorage);
  yield takeLatest(todoActions.loadCreateTodoRequest, loadCreateTodo);
  yield takeLatest(todoActions.loadUpdateTodoRequest, loadUpdateTodo);
  yield takeLatest(todoActions.loadDeleteTodoRequest,loadDeleteTodo);
  yield takeLatest(todoActions.loadGetPagedTodosRequest,loadGetPagedTodos);
  yield takeLatest(todoActions.loadRefreshTodosRequest,loadRefreshTodos);
}
