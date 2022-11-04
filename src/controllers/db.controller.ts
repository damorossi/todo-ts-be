// DATA DB CONNECTION
import * as dotenv from 'dotenv';
dotenv.config();

import { Pool } from "pg";

const dbConn = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: +(process.env.DB_PORT!)
});

export { dbConn }