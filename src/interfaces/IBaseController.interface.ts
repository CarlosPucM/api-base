import { Request, Response } from "express";

export interface IBaseController {

    getAll(req: Request, res: Response): Promise<Response>;

    findById(req: Request, res: Response): Promise<Response>;

    insert(req: Request, res: Response): Promise<Response>;

    delete(req: Request, res: Response): Promise<Response>;

    update(req: Request, res: Response): Promise<Response>;
    
}