import express, { Application } from "express";
import authRoutes from './routes/auth.routes';
import { errorHandler } from "./middleware/errorHandler.middleware";

import dotenv from 'dotenv';
dotenv.config();


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

  }
  private initializeRoutes(): void {
    this.app.use('/api',authRoutes);

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
