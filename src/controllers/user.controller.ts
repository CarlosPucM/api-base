import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ECodeResponse } from "../enums/ECodeResponse";
import { EMessage } from "../enums/EMessage";
import { IBaseController } from "../interfaces/IBaseController.interface";
import { ResponseModel } from "../models/response.model";
import { User } from "./../entity/user.entity";
import userValidator from "./../validators/user.validator";

class UserController implements IBaseController{

    async getAll(req: Request, res: Response): Promise<Response> {
        const result: ResponseModel = new ResponseModel(ECodeResponse.Ok, "", []);

        try {
            const users: User[] = await getRepository(User).find();
            result.Object = users;
            result.Message = EMessage.dataRetreivedSuccessfully;
        
        } catch (error) {
            result.Code = ECodeResponse.Error;
            result.Message = EMessage.internalServerError;
           
        }

        return res.json(result);
    };

    async findById(req: Request, res: Response): Promise<Response> {
        const result: ResponseModel = new ResponseModel(ECodeResponse.Ok, "", []);
        const { id } = req.params;
        try {
            const user = await getRepository(User).findOne(id);
            result.Object = user || [];
            result.Message = user ? EMessage.dataRetreivedSuccessfully : EMessage.dataNotFound;
        } catch (error) {
            result.Code = ECodeResponse.Error;
            result.Message = EMessage.internalServerError;
        }
        return res.json(result);
    };

    async insert(req: Request, res: Response): Promise<Response> {

        const result: ResponseModel = new ResponseModel(ECodeResponse.Ok, "", []);

        const user: User = req.body;
        try {
            const resultValidate = await userValidator.validateAsync(user);
        } catch (error) {
            result.Code = ECodeResponse.Warning;
            result.Object = error;
            return res.json(result);
        }

        try {
            const newUserModel = await getRepository(User).create(user);
            const newUser = await getRepository(User).save(newUserModel);
            result.Message = EMessage.actionOk;
            result.Object = newUser;
        } catch (error) {
            result.Message = EMessage.internalServerError;
            result.Code = ECodeResponse.Error
        }

        return res.json(result);
        
    };

    async delete(req: Request, res: Response): Promise<Response> {
        const result: ResponseModel = new ResponseModel(ECodeResponse.Ok, "", []);
        const { id } = req.params;

        try {
            const userDelete = await getRepository(User).delete(id);
            result.Message = EMessage.actionOk;
        } catch (error) {
            result.Message = EMessage.internalServerError;
            result.Code = ECodeResponse.Error
        }

        return res.json(result);
    };

    async update(req: Request, res: Response): Promise<Response> {
        const result: ResponseModel = new ResponseModel(ECodeResponse.Ok, "", []);
        const { id } = req.params;

        try {
            const resultValidate = await userValidator.validateAsync(req.body);
        } catch (error) {
            result.Code = ECodeResponse.Warning;
            result.Object = error;
            return res.json(result);
        }

        try {
            const user = await getRepository(User).findOne(id);
            if (user) {
                getRepository(User).merge(user, req.body);
                const results = await getRepository(User).save(user);
                result.Message = EMessage.actionOk;
                result.Object = results;
            }
        } catch (error) {
            result.Code = ECodeResponse.Error;
            result.Message = EMessage.internalServerError;
        }
        

        return res.json(result);
        
    };


}

const userController: UserController = new UserController();
export default userController;