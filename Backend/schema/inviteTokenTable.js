
export const createTokenTable = async(pool)=>{
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS tokens(
                id BIGSERIAL PRIMARY KEY,
                token TEXT NOT NULL UNIQUE,
                status VARCHAR(20) NOT NULL DEFAULT 'pending',
                res_id BIGINT NOT NULL,
                role_name TEXT NOT NULL,

                expires_at TIMESTAMPTZ NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

                CONSTRAINT fk_res_id 
                    FOREIGN KEY (res_id)
                    REFERENCES restaurants(id)
            )`
        )
        
    } catch (err) {
        throw err;
    }
}