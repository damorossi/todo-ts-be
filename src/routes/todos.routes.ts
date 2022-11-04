// ROUTES TODO
import express from 'express';
import { check } from 'express-validator';
import * as crudActions from '../controllers/todo.controller';
import validate from '../helpers/validate';

const router = express.Router();
router.get('/', crudActions.fetchTodos);

router.post('/', [
    check('title', 'This field is mandatory').not().isEmpty(),
    check('status', 'This field is Mandatory').not().isEmpty(),
    validate
], crudActions.createTodo);

router.put('/:id', [
    check('title', 'This field is mandatory').not().isEmpty(),
    check('status', 'This field is Mandatory').not().isEmpty(),
    validate
], crudActions.updateTodo);

router.delete('/:id', crudActions.deleteTodo);

export default router;
