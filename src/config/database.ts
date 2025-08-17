import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Todo } from "../models/Todo";
import bcrypt from "bcryptjs";
import { UserRole } from "../interfaces/user.interface";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "arzoo",
  password: process.env.DB_PASSWORD || "stillwithyou",
  database: process.env.DB_NAME || "todoapp",
  synchronize: process.env.TYPEORM_SYNCHRONIZE === "true" || true,
  logging: process.env.TYPEORM_LOGGING === "true" || true,
  entities: [User, Todo],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection initialized successfully");
//after database initialize successfully, we will check whether there is a user exists or not
    const adminExists = await AppDataSource.getRepository(User).count();
//if not then create one user manually- superadmin(name, email,password)
    if (adminExists === 0) {
      const superAdmin = new User();
      superAdmin.name = process.env.SUPER_ADMIN_NAME!;
      superAdmin.email = process.env.SUPER_ADMIN_EMAIL!;

      const password = process.env.SUPER_ADMIN_PASSWORD;
      if (!password) {
        throw new Error(
          "SUPER_ADMIN_PASSWORD is not defined in environment variables."
        );
      }
//hash the password and save it in the db
      superAdmin.password = await bcrypt.hash(password, 10);
//declare the role of the superAdmin as ADMIN and invitedby -> system
      superAdmin.role = UserRole.ADMIN;
      superAdmin.invited_by = "system";
//store that user in the User table
      await AppDataSource.getRepository(User).save(superAdmin);
      console.log("Super Admin Created.");
    }
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error;
  }
};
