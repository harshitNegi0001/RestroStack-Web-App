
export const createMenuItemTable = async (pool) => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS menu_items(
                id BIGSERIAL PRIMARY KEY,
                item_name TEXT NOT NULL,
                cat_id BIGINT NOT NULL,
                description TEXT ,
                image TEXT,
                is_veg BOOLEAN DEFAULT TRUE,
                is_active BOOLEAN DEFAULT TRUE,

                created_at TIMESTAMPTZ DEFAULT now(),

                CONSTRAINT menu_item_cat_fk 
                    FOREIGN KEY (cat_id)
                    REFERENCES menu_categories(id)
                    ON DELETE CASCADE
            )`
        );
        await pool.query(
            `CREATE INDEX IF NOT EXISTS idx_menu_items_cat_id 
                ON menu_items(cat_id);`
        );

    } catch (err) {
        throw err;
    }
}