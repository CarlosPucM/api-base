import { Request, Response } from "express";
import { ECodeResponse } from "../enums/ECodeResponse";
import { ResponseModel } from "../models/response.model";
import { IWelcome } from "./../interfaces/IWelcome.interface";

class WelcomeController implements IWelcome {
    async welcome(req: Request, res: Response): Promise<Response>{
        const result: ResponseModel = new ResponseModel(ECodeResponse.Ok, "Welcome to my API", []);
        return res.json(result);
    }
}

const welcomeController: WelcomeController = new WelcomeController();
export default welcomeController;

