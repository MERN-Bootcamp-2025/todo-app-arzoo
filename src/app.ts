import express, { Application } from "express";
import authRoutes from './routes/auth.routes';
import inviteRoutes from './routes/invite.routes';
import userRoutes from './routes/user.routes';
import todoRoutes from './routes/todo.routes';
import { errorHandler } from "./middleware/errorHandler.middleware";
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

//this class has all the initialized moddlewares, routes and error handler
export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHanding();
  }
  private initializeMiddlewares(): void {
    this.app.use(express.json()); //to parse json req
    this.app.use(cors());
  }
  private initializeRoutes(): void {
    this.app.use('/api',authRoutes);
    this.app.use('/api',inviteRoutes);
    this.app.use('/api/users',userRoutes);
    this.app.use('/api/todo',todoRoutes);
  }
  private initializeErrorHanding(): void {
    this.app.use(errorHandler);
  }
  public getApp(): Application {
    return this.app;
  }
  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
}
