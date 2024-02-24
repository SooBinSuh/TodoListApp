import PromisableResponseBody from "../PromisableRequestBody";

type GetPagedTodoRequestBody = {
    page:number;
    pageSize:number;
}

 type PromisableGetPagedTodoRequestBody = GetPagedTodoRequestBody & PromisableResponseBody
export default PromisableGetPagedTodoRequestBody
