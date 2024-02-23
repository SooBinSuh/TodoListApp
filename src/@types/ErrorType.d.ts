

class AsyncStorageError extends Error{
    constructor(message: string){
        super(message);
        this.name = "AsyncStorageError";
    }
}


class NetworkError extends Error{
    constructor(message: string){
        super(message);
        this.name = "NetworkError";
    }
}

