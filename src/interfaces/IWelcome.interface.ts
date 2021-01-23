import { Request, Response } from "express";

export interface IWelcome{
    welcome(req: Request, res: Response): Promise<Response>;
}