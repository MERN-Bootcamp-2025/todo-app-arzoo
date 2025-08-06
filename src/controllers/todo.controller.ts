import { Inject, Service } from "typedi";
import { TodoService } from "../services/todo.service";
import { Request, Response, NextFunction } from "express";
import { CreateTodoDTO } from "../common/dto/todo.dto";
import { UpdateTodoDTO } from "../common/dto/update_todo.dto";

@Service()
export class TodoController {
  constructor(@Inject() private todoService: TodoService) {}

  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateTodoDTO = req.body;
      const userId = (req as any).user?.id;
      const todo = await this.todoService.create(dto, userId);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  }

  async getAllTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const {
        page = 1,
        limit = 10,
        status,
        priority,
        title,
        from_date,
        to_date,
      } = req.query;

      const result = await this.todoService.getAllTodos(userId, {
        page: Number(page),
        limit: Number(limit),
        status: status as string,
        priority: priority as string,
        title: title as string,
        from_date: from_date as string,
        to_date: to_date as string,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId = (req as any).params.id;
      const userId = (req as any).user?.id;
      const todo = await this.todoService.getById(todoId, userId);
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId = (req as any).params.id;
      const userId = (req as any).user?.id;
      const dto: UpdateTodoDTO = req.body;

      const updatedTodo = await this.todoService.updateById(
        todoId,
        userId,
        dto
      );

      res.status(200).json(updatedTodo);
    } catch (error) {
      next(error);
    }
  }

  async partialUpdateById(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId = (req as any).params.id;
      const userId = (req as any).user?.id;
      const dto: UpdateTodoDTO = req.body;

      const updatedTodo = await this.todoService.updatePartialById(
        todoId,
        userId,
        dto
      );

      res.status(200).json(updatedTodo);
    } catch (error) {
      next(error);
    }
  }

  async softDeleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId = (req as any).params.id;
      const userId = (req as any).user?.id;

      await this.todoService.softDeleteById(todoId,userId);

      res.status(200).json({message: "Todo Soft delted succefully."})
    } catch (error) {
      next(error);
    }
  }
}
