import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ITodo, Priority, Status } from "../interfaces/todo.interface";
import { User } from "./User";

@Entity("todo")
export class Todo implements ITodo{
  @PrimaryColumn({ type: "uuid", unique: true, default: () => "gen_random_uuid()" })
  id?: string | undefined;

  @Column({ type: "text" })
  title?: string | undefined;

  @Column({ type: "text"})
  desc?: string | undefined;

  @Column({ type: "enum", enum:Status })
  status?: Status;

  @Column({type: "enum", enum:Priority})
  priority?: Priority;

  @CreateDateColumn({ name: 'expected_completion' })
  expected_completion?: Date | undefined;

  @Column({type:"text"})
  user_id?: string | undefined;

  @ManyToOne(()=>User, (user)=>user.todos,{
    onDelete: "CASCADE"
  })
  @JoinColumn({name: "userId"})
  user?:User;

  @Column({type:"boolean", default: false})
  is_deleted?: Boolean | undefined;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date | undefined;

  @CreateDateColumn({ name: 'updated_at' })
  updated_at?: Date | undefined;
}