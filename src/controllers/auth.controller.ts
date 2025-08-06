import { Inject, Service } from "typedi";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

@Service()
export class AuthController{
    constructor(@Inject() private authService: AuthService){}
    async login(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const { email, password} = req.body;

            if(!email || !password){
                 res.status(400).json({
                    message: 'Email and password are required'
                })
            }

            console.log("controller",this.authService)
            const { user, accessToken, refreshToken} = await this.authService.loginUser(email, password);

            
             res.status(200).json({
                message: 'Login successfully',
                data:{
                    user,
                    accessToken,
                    refreshToken
                }
            });

        }catch(error: any){
            next(error);
        }
    }
}