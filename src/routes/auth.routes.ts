import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import Container from "typedi";
// import authMiddleware from "../middleware/auth.middleware";

const router = Router();
const authController = Container.get(AuthController);


router.post("/login",(req,res,next)=>authController.login(req,res,next));

export default router;
