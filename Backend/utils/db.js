import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool(
    {
        connectionString: process.env.DB_CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }
    }
)


// pool.connect()
//     .then(client => {
//         console.log("✅ PostgreSQL connected successfully");
//         client.release();
//     })
//     .catch(err => {
//         console.error("❌ PostgreSQL connection error:", err.message);
//     });

// // Listen for runtime errors (prevents Node crash)
// pool.on('error', err => {
//     console.error('Unexpected PostgreSQL error:', err);
// });

pool.query('SELECT NOW()', (err, res) => {
    if (err) console.error("❌ DB Connection Error", err);
    else console.log("✅ DB Connected at:", res.rows[0].now);
});


export default pool;