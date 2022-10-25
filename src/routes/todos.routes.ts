// ROUTES TODO
import express from 'express';
import * as actions from '../controllers/todo.controller';
const router = express.Router();

router.get('/', actions.fetchTodos);
router.post('/', actions.createTodo);
router.put('/:id', actions.updateTodo);
router.delete('/:id', actions.deleteTodo);

export default router;