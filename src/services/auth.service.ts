import { Service } from "typedi";
import { Repository } from "typeorm";
import { User } from "../models/User";
import { AppDataSource } from "../config/database";
import {
  generateAccessToken,
  generateRefershToken,
} from "../common/util/jwt.util";

import bcrypt from 'bcryptjs'

@Service()
export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
//this function takes email and password from the controller function
  async loginUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw { status: 404, message: "User not found" };
      }
//compare the password from the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password!);

      if (!isPasswordValid) {
        throw { status: 400, message: "Invalid credentials" };
      }
//will take the important information like userId, email and role and send it in the payload to the access token and refesh token
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefershToken(payload);
//return the response with user information and acsessToken and refreshToken
      return {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      if (error.status) {
        throw error; //rethrow known error
      }
      throw { status: 500, message: "Login Failed" };
    }
  }
}
