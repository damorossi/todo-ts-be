export enum Status {
    Pending = 'Pending',
    InProgress = 'In progress',
    Done = 'Done'
}

export class Todo {
    id!: number;
    title!: string;
    status?: Status;
}


