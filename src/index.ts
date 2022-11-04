import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/todos.routes'
import * as dotenv from 'dotenv';
dotenv.config();

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000']

const options: cors.CorsOptions = {
  origin: allowedOrigins
}

const PORT = process.env.PORT;
const app = express()
app.use(cors(options))
app.use(express.json())

// urls
app.use('/api/todos', todoRoutes)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
