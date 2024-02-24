

type PromisableResponseBody = {
    resolve:(t:any)=>void;
    reject:()=>void;    
}
export default PromisableResponseBody