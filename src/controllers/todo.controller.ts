import { request, response } from 'express';
import { dbConn } from './db.controller';

const fetchTodos = async (req = request, res = response) => {
    const PAGE_LIMIT = 5;
    const pageOfsset = req.query?.offset || 0;

    try {
        const data = await dbConn.query(`select * from tasks ORDER BY id DESC LIMIT ${PAGE_LIMIT} OFFSET ${pageOfsset} ;`);
        const totalRows = await dbConn.query('SELECT COUNT (*) FROM tasks');
        return res.status(200).json({
            ok: true,
            data: data.rows,
            totalRows: totalRows.rows[0].count
        });
    } catch (e) {
        return res.status(400).json({
            ok: false,
            msg: e
        });
    }
};

const createTodo = async (req = request, res = response) => {
    try {
        const { title, status } = req.body;
        let insertQuery = `INSERT INTO tasks  (title, status) VALUES ('${title}',  '${status}')`;
        await dbConn.query(insertQuery);
        const getLasCreatedIdQuery = `SELECT currval(pg_get_serial_sequence('tasks', 'id'))`;
        const fetchLastCreatedId = await dbConn.query(getLasCreatedIdQuery);
        const taskId = fetchLastCreatedId.rowCount === 1 ? fetchLastCreatedId.rows[0].currval : 'empty';
        const newCreatedTask = await (await dbConn.query(`select title, status, id from tasks where id = ${taskId}`)).rows[0];

        return res.status(200).json({
            ok: true,
            data: newCreatedTask
        });

    } catch (e) {
        return res.status(400).json({
            ok: false,
            msg: e
        });
    }
}

const updateTodo = async (req = request, res = response) => {
    const taskId = req.body.id;
    try {
        const dataExists = await validateExists(+taskId);

        if (!dataExists) {
            return res.status(404).json({
                ok: false,
                msg: 'Element not found'
            });
        }

        const { title, status } = req.body;
        const query = `UPDATE tasks SET title = '${title}', status = '${status.toLowerCase()}' WHERE id = ${taskId}`;
        const updatedTask = await dbConn.query(query);

        let newTask;

        if (updatedTask.rowCount === 1) {
            newTask = await (await dbConn.query(`select title, status, id from tasks where id = ${taskId}`)).rows[0];
        }

        return res.json({
            ok: true,
            data: newTask,
        })

    } catch (e) {
        return res.status(400).json({
            ok: false,
            msg: e
        });
    }
}

const deleteTodo = async (req = request, res = response) => {
    const taskId = req.params.id;
    try {
        const dataExists = await validateExists(+taskId);

        if (!dataExists) {
            return res.status(404).json({
                ok: false,
                msg: 'Element not found'
            });
        }

        const deleteQuery = `DELETE FROM tasks WHERE id = ${taskId}`;
        await dbConn.query(deleteQuery);
        const data = await dbConn.query(`select title, status, id from tasks`);

        return res.json({
            ok: true,
            data: data.rows
        });
    } catch (e) {
        return res.status(400).json({
            ok: false,
            msg: e
        })
    }
}

const validateExists = async (id: number): Promise<boolean> => {
    try {
        const el = await dbConn.query(`select * from tasks where id = ${id}`);
        return el.rowCount > 0;
    } catch (e) {
        return false
    }
}

export { fetchTodos, createTodo, updateTodo, deleteTodo };
