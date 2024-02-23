import { all } from "axios";
import todoSaga from "./todosSaga";
import { fork } from "redux-saga/effects";



export default function* rootSaga(){
    yield all([todoSaga])
}