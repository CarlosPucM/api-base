import { Request, Response } from "express";
import { ECodeResponse } from "../enums/ECodeResponse";
import { ResponseModel } from "../models/response.model";

export function errorHandler(err: Error, req: Request, res: Response, next: Function) {
    const codeResponse: number = req.statusCode == 404 ? req.statusCode : 500;
    const result: ResponseModel = new ResponseModel(ECodeResponse.Error, err.message, []);
    return res.status(codeResponse).json(result);
}