// import dbConn from "../controllers/db.controller";
import { User } from "./user.model";


enum Status {
    Pending = 'pending',
    InProgress = 'In progress',
    Done = 'Done'
}

export class Todo {
    id!: number;
    userId!: number;
    user!: User;
    title!: string;
    completed!: boolean;
    status?: Status;
}


