import { Service } from "typedi";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../models/User";
import { AppDataSource } from "../config/database";
import bcrypt from "bcryptjs";
import { sendInvitationEmail } from "../common/util/email.util";
import { UserRole } from "../interfaces/user.interface";

@Service()
export class InviteService{

    private userRepository: Repository<User>;

    constructor(){
        this.userRepository = AppDataSource.getRepository(User);
    }

    async inviteUser(inviter: User, dto:{
        name:string,
        email:string,
        role:string
    }){
        //1.Check if user already exists
        const existing = await this.userRepository.findOne({where:{email: dto.email}});
        if(existing) throw new Error("User with this email already exists.");

        //2.Generate random password and hash that password
        const rawPassword = Math.random().toString(36).slice(-10);
        const hashedPassword = await bcrypt.hash(rawPassword,10);

        //3.create new user
        const newUser = this.userRepository.create({
            name: dto.name,
            email:dto.email,
            role: dto.role as UserRole,
            password: hashedPassword,
            invited_by:inviter.id,
        }) as DeepPartial<User>;

        //4. save new USer and send mail
        await this.userRepository.save(newUser);
        await sendInvitationEmail(dto.email,rawPassword);

        return {message: "User invited succesfully", email:dto.email}

    }
}