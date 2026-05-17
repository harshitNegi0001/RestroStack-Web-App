import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool(
    {
        connectionString: process.env.DB_CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }
    }
)


// const pool = new Pool(
//     {
//         host:process.env.PG_HOST,
//         user:process.env.PG_USER,
//         password:process.env.PG_PASSWORD,
//         port:process.env.PG_PORT,
//         database:process.env.PG_DATABASE
//     }
// )


pool.query('SELECT NOW()', (err, res) => {
    if (err) console.error("❌ DB Connection Error", err);
    else console.log("✅ DB Connected at:", res.rows[0].now);
});

export default pool;