import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IUser, UserRole } from "../interfaces/user.interface";
import { Todo } from "./Todo";

@Entity("user")
export class User implements IUser {
  @PrimaryColumn({ type: "uuid", unique: true, default: () => "gen_random_uuid()" })
  id?: string | undefined;

  @Column({ type: "text" })
  name?: string | undefined;

  @Column({ type: "text", unique: true })
  email?: string | undefined;

  @Column({ type: "text" })
  password?: string | undefined;

  @Column({type: "enum", enum:UserRole})
  role?: UserRole | undefined;

  @Column({type: "text"})
  invited_by?: string | undefined;

  @OneToMany(()=>Todo,(todo)=>todo.user_id)
  todos?:Todo[];

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date | undefined;

  @CreateDateColumn({ name: 'updated_at' })
  updated_at?: Date | undefined;
}
