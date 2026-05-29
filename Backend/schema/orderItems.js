export const createOrderItemsTable = async(pool)=>{
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS order_items(
                id BIGSERIAL PRIMARY KEY,
                order_id BIGINT NOT NULL,
                item_varity_id BIGINT NOT NULL,
                quantity INT NOT NULL DEFAULT 1,
                price DECIMAL(10,2) NOT NULL,
                special_instruction TEXT ,
                status VARCHAR(30) NOT NULL DEFAULT 'running',

                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now(),

                CONSTRAINT order_item_id_fk
                    FOREIGN KEY (item_varity_id)
                    REFERENCES item_prices(id),
                CONSTRAINT order_items_order_id_fk
                    FOREIGN KEY (order_id)
                    REFERENCES orders(id)

            )`
        )
        
    } catch (err) {
        throw err;
    }
}