import PromisableResponseBody from "../PromisableRequestBody";

type RefreshTodoRequestBody = {
    pageSize:number;    
}

type PromisableRefreshTodoRequestBody = RefreshTodoRequestBody & PromisableResponseBody
export default PromisableRefreshTodoRequestBody;