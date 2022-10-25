import express from 'express';

//routes
import todoRoutes from './routes/todos.routes';

const PORT = 3000;

const app = express();

app.use(express.json());

// urls
app.use('/api/todos', todoRoutes);


app.get('/ping', (_req, res) => {
    console.log('K');
    res.send('here is ur pong');
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})