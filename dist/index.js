import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3001;
const pool = new pg.Pool({
    host: "localhost",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
});
let message = "";
async function getMessage() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM flats');
        message = result.rows[0].message;
        client.release();
    }
    catch (err) {
        console.error(err);
        message = 'Error ' + err;
    }
}
// Call getMessage initially and then every 10 seconds
getMessage();
setInterval(getMessage, 10000);
app.get('/', (req, res) => {
    res.send(message);
});
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input === 'x') {
        server.close(() => {
            console.log('Server closed');
            pool.end(() => {
                console.log('Postgres connection pool closed');
                process.exit();
            });
        });
    }
});
//# sourceMappingURL=index.js.map