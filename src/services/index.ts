import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://3.35.194.197:8000/',
  timeout: 10000,
});



export {apiGetTodos} from "./todoService"