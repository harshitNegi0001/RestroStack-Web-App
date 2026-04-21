

export const createRolesTable = async (pool) => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS roles(
                id BIGSERIAL PRIMARY KEY,
                role_name VARCHAR(30) NOT NULL ,
                res_id BIGINT NOT NULL,
                user_id BIGINT NOT NULL,
                permissions jsonb,

                is_active BOOLEAN DEFAULT TRUE,

                deactivated_at TIMESTAMPTZ,
                updated_at TIMESTAMPTZ DEFAULT now(),
                created_at TIMESTAMPTZ DEFAULT now(),

                CONSTRAINT fk_role_user_id
                    FOREIGN KEY (user_id)
                    REFERENCES users(id),
                CONSTRAINT fk_role_res_id
                    FOREIGN KEY (res_id)
                    REFERENCES restaurants(id),

                CONSTRAINT unique_res_role 
                    UNIQUE(user_id,res_id)
                
            )`
        )
        await pool.query(
            `
            CREATE INDEX IF NOT EXISTS idx_roles_user_id ON roles(user_id);
            CREATE INDEX IF NOT EXISTS idx_roles_res_id ON roles(res_id);
            `
        )
    } catch (err) {
        throw err;
    }
}