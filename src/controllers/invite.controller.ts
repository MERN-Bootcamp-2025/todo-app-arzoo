import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import { InviteService } from "../services/invite.service";
import { InviteDTO } from "../common/dto/invite.dto";

@Service()
export class InviteController{
    constructor(@Inject() private inviteService: InviteService){}
//will take the value from the user from req.body and check the type via dto
    async inviteUser(req:Request, res:Response, next:NextFunction){
        try{
            const dto: InviteDTO = req.body;
//will check who is the inviter from request
            const inviter = (req as any).user;

            const result = await this.inviteService.inviteUser(inviter,dto);
            res.status(201).json(result);

        }catch(error){
            next(error);
        }
    }

} 