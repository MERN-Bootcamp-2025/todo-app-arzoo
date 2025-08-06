import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { Priority, Status } from "../../interfaces/todo.interface";

export class UpdateTodoDTO{

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    desc?: string;

    @IsOptional()
    @IsEnum({type: 'enum', enum: Status})
    status?: string;

    @IsOptional()
    @IsEnum({type:'enum', enum: Priority})
    priority?:string;

    @IsOptional()
    @IsDateString()
    expected_completion?:string;
}