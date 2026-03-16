

export const createUsertable = async(pool)=>{
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users(
                id BIGSERIAL PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                role VARCHAR(30) NOT NULL DEFAULT 'undefined',
                hashed_pass TEXT NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                verified_email BOOLEAN DEFAULT FALSE,

                created_at TIMESTAMPTZ DEFAULT now()

            )`
        )
        // await pool.query(
        //     `CREATE INDEX IF NOT EXISTS`
        // )
    } catch (err) {
        throw err;
    }
}