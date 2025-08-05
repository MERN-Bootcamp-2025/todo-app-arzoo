// id: UUID (Primary Key)
// name: String
// email: String (Unique)
// password_hash: String (Hashed)
// role: String ('admin' or 'user')
// invited_by: UUID (Admin who invited)
// created_at: Date
// updated_at: Date

export enum UserRole{
    ADMIN="admin",
    USER="user"
}

export interface IUser{
    id?:string;
    name?:string;
    email?:string;
    password?:string;
    role?:UserRole;
    invited_by?:string;
    created_at?:Date;
    updated_at?:Date;
}