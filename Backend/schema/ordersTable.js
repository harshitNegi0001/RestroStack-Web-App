export const createOrdersTable = async(pool)=>{
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS orders(
                id BIGSERIAL PRIMARY KEY,
                res_id BIGINT NOT NULL, 
                table_id BIGINT NOT NULL,
                staff_id BIGINT NOT NULL,
                status VARCHAR(30) NOT NULL DEFAULT 'running',

                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now(),

                CONSTRAINT order_res_id_fk
                    FOREIGN KEY (res_id)
                    REFERENCES restaurants(id),
                CONSTRAINT order_table_id_fk
                    FOREIGN KEY (table_id)
                    REFERENCES tables(id),
                CONSTRAINT orders_staff_id_fk
                    FOREIGN KEY (staff_id)
                    REFERENCES users(id)

            )`
        )
        
    } catch (err) {
        throw err;
    }
}