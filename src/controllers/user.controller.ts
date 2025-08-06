import { Inject, Service } from "typedi";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

@Service()
export class UserController{
    constructor(@Inject() private userService: UserService){}

    async getAllUsers(_req: Request, res: Response, next: NextFunction){
        try{
            const users = await this.userService.getAllUsers();
            res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data:users
            });

        }catch(error){
            next(error);
        }
    }
}