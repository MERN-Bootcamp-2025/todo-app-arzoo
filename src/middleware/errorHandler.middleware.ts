import { Request, Response, NextFunction } from "express"

//use prefix _ on unused variables
export function errorHandler(
    err:any,
    _req: Request,
    res: Response,
    _next: NextFunction
){
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        details: err.details || null
    });
}