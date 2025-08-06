import { Service } from "typedi";
import { Between,  LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Todo } from "../models/Todo";
import { AppDataSource } from "../config/database";
import { CreateTodoDTO } from "../common/dto/todo.dto";
import { UpdateTodoDTO } from "../common/dto/update_todo.dto";

@Service()
export class TodoService {
  private todoRepository: Repository<Todo>;

  constructor() {
    this.todoRepository = AppDataSource.getRepository(Todo);
  }

  async create(todoData: CreateTodoDTO, userId: string): Promise<Todo> {
    try {
      const todo = this.todoRepository.create({
        title: todoData.title,
        desc: todoData.desc,
        status: todoData.status,
        priority: todoData.priority,
        expected_completion: todoData.expected_completion,
        user_id: userId,
      });

      return await this.todoRepository.save(todo);
    } catch (error) {
      throw { status: 400, message: "Bad Request" };
    }
  }

  async getAllTodos(userId: string, query:any){
    try{

        const {
            page=1,
            limit=10,
            status,
            priority,
            title,
            from_date,
            to_date
        } = query;

        const where:any = {
            user_id: userId,
            is_deleted: false
        }

        if(status) where.status = status;
        if(priority) where.priority = priority;
        if(title) where.title = title;

        if(from_date && to_date){
            where.expected_completion = Between(
                new Date(from_date),
                new Date(to_date)
            );
        }else if(from_date){
            where.expected_completion = MoreThanOrEqual(new Date(from_date));
        }else if(to_date){
            where.expected_completion = LessThanOrEqual(new Date(to_date));
        }

        const [todos, total] = await this.todoRepository.findAndCount({
            where,
            order: {created_at:"DESC"},
            skip: (Number(page) -1 )*Number(limit),
            take:Number(limit)
        });

        return {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total/limit),
            todos
        };

    }catch(error){
        throw {status: 401, message:"Deleted or Unauthorized"}
    }
  }

  async getById(todoId: string, userId: string): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOne({
        where: {
          id: todoId,
          user_id: userId,
          is_deleted: false,
        },
      });

      if (!todo){
        throw {status: 404, message: "Not Found"}
      };

      return todo;
    } catch (error) {
      throw {status: 401, message:"Deleted or Unauthorized"}
    }
  }

  async updateById(
    todoId: string,
    userId: string,
    todoData: UpdateTodoDTO
  ): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOne({
        where: {
          id: todoId,
          user_id: userId,
          is_deleted: false,
        },
      });

      if (!todo) {
        throw {status: 404, message:"Todo Not Found"}
      }

      Object.assign(todo, todoData);

      return await this.todoRepository.save(todo);
    } catch (error) {
      throw { status: 401, message:"Deleted or Unauthorized" };
    }
  }

  async updatePartialById(
    todoId: string,
    userId: string,
    todoData: UpdateTodoDTO
  ): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOne({
        where: {
          id: todoId,
          user_id: userId,
          is_deleted: false,
        },
      });

      if (!todo) {
        throw {status: 404, message:"Not Found"}
      };

      Object.assign(todo, todoData);

      return await this.todoRepository.save(todo);
    } catch (error) {
      throw {status: 401, message:"Deleted or Unauthorized"}
    }
  }

  async softDeleteById(todoId: string, userId: string): Promise<boolean> {
    try {
      const todo = await this.todoRepository.findOne({
        where: {
          id: todoId,
          user_id: userId,
          is_deleted: false,
        }
      });

      if(!todo) return false;

      todo.is_deleted = true;

      await this.todoRepository.save(todo);

      return true;
    } catch (error) {
      throw {status: 401, message:"Deleted or Unauthorized"}
    }
  }
}
