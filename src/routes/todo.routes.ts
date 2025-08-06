import { Router } from "express";
import Container from "typedi";
import { TodoController } from "../controllers/todo.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
const controller = Container.get(TodoController);

router.post('/',authMiddleware,(req,res,next)=>controller.createTodo(req,res,next));
router.get('/',authMiddleware,(req,res,next)=>controller.getAllTodos(req,res,next));
router.get('/:id',authMiddleware,(req,res,next)=>controller.getTodoById(req,res,next));
router.put('/:id',authMiddleware,(req,res,next)=>controller.updateById(req,res,next))
router.patch('/:id',authMiddleware,(req,res,next)=>controller.partialUpdateById(req,res,next));
router.delete('/:id',authMiddleware,(req,res,next)=>controller.softDeleteById(req,res,next));

export default router;
