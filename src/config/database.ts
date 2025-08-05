import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Todo } from "../models/Todo";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'arzoo',
  password: process.env.DB_PASSWORD || 'stillwithyou',
  database: process.env.DB_NAME || 'todoapp',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || true,
  logging: process.env.TYPEORM_LOGGING === 'true' || true,
  entities: [User, Todo],
});

export const initializeDatabase = async(): Promise<void> => {
    try{
        await AppDataSource.initialize();
        console.log('Database connection initialized successfully');
    }catch(error){
        console.error('Error during database initialization:',error);
        throw error;   
    }
}