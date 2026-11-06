

export const createRolesTable = async (pool) => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS roles(
                id BIGSERIAL PRIMARY KEY,
                role_name VARCHAR(30) NOT NULL ,
                res_id BIGINT NOT NULL,
                user_id BIGINT NOT NULL,
                permissions jsonb,

                role_status VARCHAR(20) DEFAULT 'active',

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
            CREATE UNIQUE INDEX IF NOT EXISTS unique_active_suspend_role 
                ON roles(user_id, res_id) 
                WHERE role_status IN ('active', 'suspend');
            `
        )
    } catch (err) {
        throw err;
    }
}