import { Router } from "express";
import Container from "typedi";
import { UserController } from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
const controller = Container.get(UserController);

router.get('/',authMiddleware,(req,res,next)=>controller.getAllUsers(req,res,next))

export default router;