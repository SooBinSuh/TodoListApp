import {combineReducers} from 'redux';

import {configureStore} from '@reduxjs/toolkit';
import todoSlice from './todoSlice';
import modalSlice from './modalSlice';
import createSagaMiddleware from 'redux-saga';
import todoSaga from '../sagas/todosSaga';
import rootSaga from '../sagas';
// import rootSaga from '../sagas';
// import todoReducer from "./todoSlice";

// const rootReducer = combineReducers({todos});

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      todos: todoSlice,
      modal: modalSlice,
    },
    devTools:true,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(sagaMiddleware),
  });
  sagaMiddleware.run(todoSaga);
  return store;
};


const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
