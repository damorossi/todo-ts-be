// DATA DB CONNECTION

import { Pool } from "pg"

const dbConn = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'dr-2022',
    database: 'postgres',
    port: 5432
});

export { dbConn }