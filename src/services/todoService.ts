import { AxiosResponse } from 'axios';
import {axiosInstance} from '.';
import Todo from '../@types/Todo';
import RequestResponse from '../@types/responseType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncConstants } from '../constants/Constants';

export const apiGetTodos = async () => {
   return await axiosInstance.get<Todo[]>(`/todo/`);
};

export const writeTodosToStorage = async (value:number[])=>{
    try{
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(AsyncConstants.completedTodoIDs,jsonValue);
    }catch(e){
        throw new AsyncStorageError(`할일을 저장하지 못했어요${e}`);
    }
}

export const readTodosFromStorage = async () => {
    try{
        const jsonValue = await AsyncStorage.getItem(AsyncConstants.completedTodoIDs);
        console.log("jsonval",jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) as number[]: [];
    } catch(e){
        throw new AsyncStorageError(`할일을 읽어오지 못했어요${e}`);
    }
}