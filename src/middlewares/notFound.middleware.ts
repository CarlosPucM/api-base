import { Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response, next: Function) {
    const error: Error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}