import {Request, Response, NextFunction} from "express";
import { RequestWithUser } from "./auth.middleware";
//this middleware chcks whther the user is admin or not
export const requireAdmin = (req:Request, res:Response, next:NextFunction) : Response|void=>{
    if((req as RequestWithUser).user?.role !== "admin"){

        return res.status(403).json({
            message: "Access Denied: Admins only"
        })
    }
    next();
}