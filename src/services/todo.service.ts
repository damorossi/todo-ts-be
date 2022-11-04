import { Todo } from '../models/todo.model';
import data from './todos.json';

const enum Status {
    Pending = 'pending',
    Progress = 'progress',
    Finished = 'finished'
}

const items: Todo[] = data;
export const getEntries = () => items;

export const addEntry = () => null;
