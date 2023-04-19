import express, { Request, Response } from 'express';
import pg, { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = 3001;

const pool: Pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
});

let message: string = "";

async function getMessage(): Promise<void> {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM flats');
        message = '';
        message = JSON.stringify(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        message = 'Error ' + err;
    }
}

// Call getMessage initially and then every 10 seconds
getMessage();
setInterval(getMessage, 10000);

app.get('/', (req: Request, res: Response) => {
    res.send(message);
});

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});