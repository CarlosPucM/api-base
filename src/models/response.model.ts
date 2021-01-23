import { ECodeResponse } from "../enums/ECodeResponse";

export class ResponseModel{
    Code: ECodeResponse;
    Message: String;
    Object: Object;

    constructor(Code: ECodeResponse, Message: String, Object: Object){
        this.Code = Code;
        this.Message = Message;
        this.Object = Object;
    }
}