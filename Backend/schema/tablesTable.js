



export const createTablesTable = async (pool) => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS tables(
                id BIGSERIAL PRIMARY KEY ,
                res_id BIGINT NOT NULL,
                zone_id BIGINT NOT NULL,
                table_name VARCHAR(100) NOT NULL,
                capacity INT NOT NULL DEFAULT 4,
                status VARCHAR(20) NOT NULL DEFAULT 'available',
                created_at TIMESTAMPTZ DEFAULT now(),
                is_active BOOLEAN DEFAULT TRUE,


                CONSTRAINT fk_res_id
                FOREIGN KEY(res_id) 
                REFERENCES restaurants(id),

                CONSTRAINT fk_zone_id
                FOREIGN KEY(zone_id) 
                REFERENCES table_zone(id),
                
                CONSTRAINT unique_table_name_per_zone
                UNIQUE(zone_id, table_name)
            )`
        );
    } catch (err) {
        throw err;
    }
}