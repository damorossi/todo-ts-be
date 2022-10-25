import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';
import data from './todos.json';

const enum Status {
    Pending = 'pending',
    Progress = 'progress',
    Finished = 'finished'
}
interface task {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    status: Status | string;
    User?: User;
}

const items: Partial<Todo>[] = data;
export const getEntries = () => items;

export const addEntry = () => null;
