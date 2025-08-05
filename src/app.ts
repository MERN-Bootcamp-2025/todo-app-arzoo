import express, { Application } from "express";

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

  }
  private initializeErrorHanding(): void {

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
