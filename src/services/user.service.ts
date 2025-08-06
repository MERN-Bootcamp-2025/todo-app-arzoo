import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import { Repository } from "typeorm";

@Service()
export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

 
  async getAllUsers(): Promise<User[]>{
    return await this.userRepository.find();
  }
}
