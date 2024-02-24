type GetPagedTodoRequestBody = {
    page:number;
    pageSize:number;
    resolve:(t:any)=>void;
    reject:()=>void;
}

export default GetPagedTodoRequestBody