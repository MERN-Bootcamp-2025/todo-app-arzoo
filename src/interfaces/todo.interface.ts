// id: UUID (Primary Key)
// title: String
// description: String
// status: String ('todo', 'in progress', 'on hold', 'done', 'will not do')
// priority: String ('low', 'medium', 'high', 'critical')
// expected_completion_at: Date
// user_id: UUID (Owner)
// is_deleted: Boolean (Soft delete flag)
// created_at: Date
// updated_at: Date

export enum Status{
    TODO="todo",
    INPROGRESS="in-progress",
    ONHOLD="on-hold",
    DONE="done",
    WILLNOTDO="will-not-do"
}

export enum Priority{
    LOW="low",
    MEDIUM="medium",
    HIGH="high",
    CRITICAL="critical"
}

export interface ITodo{
    id?:string;
    title?:string;
    desc?:string;
    status?:Status;
    priority?:Priority;
    expected_completion?:Date;
    user_id?:string;
    is_deleted?:Boolean;
    created_at?:Date;
    updated_at?:Date
}