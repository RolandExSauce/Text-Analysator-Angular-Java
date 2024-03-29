
//type for each obj in our letter arrays
interface IAlpha {
    letter: string;
    count: number;
}

//fields on body when making request
interface IReqBody { //should match name from backend as well
    inputProvided: string, 
    scanType: string
}


export {
    IAlpha,
    IReqBody
}