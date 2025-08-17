import { Inject, Service } from "typedi";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

//from here service fucntion will be called upon
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
//send email and password received from the req.body to the service method
            console.log("controller",this.authService)
            const { user, accessToken, refreshToken} = await this.authService.loginUser(email, password);

            //deconstruct user, accessToken and refreshToken in the response data
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