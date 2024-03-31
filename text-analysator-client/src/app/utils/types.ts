
//type for each obj 
interface IAlphaObj {
    // letter: string;
    // count: number;
    [key: string]: number //altered to this structure cuz backend return json like this: { a: 2, b: 0, e: 3, etc... }
}

//fields on body when making request
interface IReqBody { //should match name from backend as well
    inputProvided: string,
    scanType: string
}


//custom type base on server response
type ServerResponseStruct = {
    CType?: {
        [key: string]: number;
    },
    VType?: {
        [key: string]: number;
    }
}


export {
    IAlphaObj,
    IReqBody,
    ServerResponseStruct
}