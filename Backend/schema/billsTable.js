
export const createBillTable = async(pool)=>{
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS bills(
                id SERIAL PRIMARY KEY,
                table_id BIGINT NOT NULL,
                created_by BIGINT NOT NULL,

                res_id BIGINT NOT NULL,
                order_id BIGINT NOT NULL,
                invoice_no VARCHAR(50) NOT NULL UNIQUE,
                payment_status VARCHAR(30) NOT NULL DEFAULT 'pending',
                payment_method VARCHAR(40) ,
                subtotal DECIMAL(10,2) NOT NULL,
                tax_amount DECIMAL(10,2) NOT NULL,
                table_charges DECIMAL(10,2) NOT NULL,
                grand_total DECIMAL(10,2) NOT NULL,

                payment_time TIMESTAMPTZ ,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

                CONSTRAINT bill_table_id_fk
                    FOREIGN KEY (table_id)
                    REFERENCES tables(id),
                CONSTRAINT bill_order_id_fk
                    FOREIGN KEY (order_id)
                    REFERENCES orders(id),
                CONSTRAINT bill_res_id_fk
                    FOREIGN KEY (res_id)
                    REFERENCES restaurants(id),
                CONSTRAINT bill_created_by_user_id_fk
                    FOREIGN KEY (created_by)
                    REFERENCES users(id)
            )`
        )

        await pool.query(
            `CREATE INDEX IF NOT EXISTS idx_bills_table_id ON bills(table_id)`
        );
        await pool.query(
            `CREATE INDEX IF NOT EXISTS idx_bills_res_id ON bills(res_id)`
        );
        
    } catch (err) {
        throw err;
    }
}