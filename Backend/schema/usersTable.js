

export const createUsertable = async (pool) => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users(
                id BIGSERIAL PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                image TEXT,
                name TEXT NOT NULL,
                hashed_pass TEXT NOT NULL,
                acc_status VARCHAR(20) NOT NULL DEFAULT 'active',
                verified_email BOOLEAN DEFAULT FALSE,

                created_at TIMESTAMPTZ DEFAULT now(),

                CONSTRAINT acc_status_check 
                CHECK(acc_status IN ('active','suspended','deactivated'))
            )`
        )
        await pool.query(
            `
            CREATE INDEX IF NOT EXISTS idx_user_name ON users(name);
            `
        )
    } catch (err) {
        throw err;
    }
}