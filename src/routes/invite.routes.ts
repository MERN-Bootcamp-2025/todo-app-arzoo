import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/role.middleware";
import Container from "typedi";
import { InviteController } from "../controllers/invite.controller";

const router = Router();
const controller = Container.get(InviteController);
//this route is used when admin sends the invitation to the user, here we are checking authentication using middlewares
router.post('/invite',authMiddleware,requireAdmin, (req,res,next)=>controller.inviteUser(req,res,next));

export default router;