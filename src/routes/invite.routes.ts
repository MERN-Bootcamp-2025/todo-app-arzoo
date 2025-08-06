import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/role.middleware";
import Container from "typedi";
import { InviteController } from "../controllers/invite.controller";

const router = Router();
const controller = Container.get(InviteController);

router.post('/invite',authMiddleware,requireAdmin, (req,res,next)=>controller.inviteUser(req,res,next));

export default router;