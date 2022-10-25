import express from 'express';

import todoRoutes from './routes/todos.routes';
const PORT = 3000;
const app = express();
app.use(express.json());

// urls
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
