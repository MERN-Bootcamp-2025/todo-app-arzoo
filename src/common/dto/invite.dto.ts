import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserRole } from "../../interfaces/user.interface";

export class InviteDTO{
    @IsEmail()
    email:string;

    @IsEnum({type: "role", enum: UserRole})
    role:string;

    @IsString()
    name:string;
}