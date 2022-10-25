import { response } from "express";

import { dbConn } from "./db.controller";

const fetchTodos = async (_req: any, res = response) => {
    try {
        const data = await dbConn.query('select * from tasks');
        return res.json({
            ok: true,
            data: data.rows,
        })
    } catch (e) {
        console.log('error: ', e);
        return res.status(400).json({
            ok: false,
            msg: e
        })
    }
}
const createTodo = async (req: any, res = response) => {
    try {
        const { title, status, completed } = req.body;

        let insertQuery = `INSERT INTO tasks  (title, status, completed, userid) VALUES ('${title}',  '${status}',  ${completed}, 1);`;
        await dbConn.query(insertQuery);
        const getLasCreatedIdQuery = `SELECT currval(pg_get_serial_sequence('tasks', 'id'));`;
        const fetchLastCreatedId = await dbConn.query(getLasCreatedIdQuery);

        const taskId = fetchLastCreatedId.rowCount === 1 ? fetchLastCreatedId.rows[0].currval : 'empty';
        const newTask = await (await dbConn.query(`select title, status, completed, id, userid from tasks where id = ${taskId};`)).rows[0];
        return res.json({
            ok: true,
            data: newTask
        });

    } catch (e) {
        console.log('error: ', e);
        return res.status(400).json({
            ok: false,
            msg: e
        })
    }
}

const updateTodo = async (req: any, res = response) => {
    const taskId = req.params.id;
    try {
        const dataExists = await validateExists(taskId);

        if (!dataExists) {
            return res.status(404).json({
                ok: false,
                msg: 'Element not found'
            });
        }

        const { title, status, completed } = req.body;
        const query = `UPDATE tasks SET title = '${title}', status = '${status}', completed = ${completed} WHERE id = ${taskId}`;
        const updatedTask = await dbConn.query(query);

        let newTask;

        if (updatedTask.rowCount === 1) {
            newTask = await (await dbConn.query(`select title, status, completed, id, userid from tasks where id = ${taskId};`)).rows[0];
        }

        return res.json({
            ok: true,
            data: newTask,
        });

    } catch (e) {
        console.log('error: ', e);
        return res.status(400).json({
            ok: false,
            msg: e
        })
    }
}

const deleteTodo = async (req: any, res = response) => {
    const taskId = req.params.id;
    try {
        const dataExists = await validateExists(taskId);

        if (!dataExists) {
            return res.status(404).json({
                ok: false,
                msg: 'Element not found'
            });
        }

        const deleteQuery = `DELETE FROM tasks WHERE id = ${taskId}`;
        await dbConn.query(deleteQuery);
        const data = await dbConn.query(`select title, status, completed, id, userid from tasks`);

        return res.json({
            ok: true,
            data: data.rows
        })
    } catch (e) {
        console.log('error: ', e);
        return res.status(400).json({
            ok: false,
            msg: e
        })
    }
}

const validateExists = async (id: number): Promise<boolean> => {
    try {
        const el = await dbConn.query(`select * from tasks where id = ${id};`);
        return el.rowCount > 0;
    } catch (e) {
        return false;
    }
}

export { fetchTodos, createTodo, updateTodo, deleteTodo };