
export const createItemPriceTable = async (pool) => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS item_prices(
                id BIGSERIAL PRIMARY KEY,
                item_id BIGINT NOT NULL,
                variant_name TEXT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,

                created_at TIMESTAMPTZ DEFAULT now(),

                CONSTRAINT menu_item_price_fk 
                    FOREIGN KEY (item_id)
                    REFERENCES menu_items(id)
                    ON DELETE CASCADE
            )`
        );
        await pool.query(
            `CREATE INDEX IF NOT EXISTS idx_item_prices_item_id 
                ON item_prices(item_id);`
        );

    } catch (err) {
        throw err;
    }
}