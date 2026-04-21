



export const createTableZone = async (pool) => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS table_zone(
                id BIGSERIAL PRIMARY KEY ,
                res_id BIGINT NOT NULL,
                zone_name VARCHAR(100) NOT NULL,
                hourly_charge DECIMAL(10, 2) DEFAULT 0.00,
                created_at TIMESTAMPTZ DEFAULT now(),
                is_active BOOLEAN DEFAULT TRUE,

                CONSTRAINT fk_zone_res_id
                FOREIGN KEY(res_id) 
                REFERENCES restaurants(id)
            )`
        );
    } catch (err) {
        throw err;
    }
}