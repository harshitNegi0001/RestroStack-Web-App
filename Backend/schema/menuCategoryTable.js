
export const createMenuCategoryTable = async (pool) => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS menu_categories(
                id BIGSERIAL PRIMARY KEY,
                category_name TEXT NOT NULL,
                res_id BIGINT NOT NULL,
                is_active BOOLEAN NOT NULL DEFAULT TRUE,
                display_order INT NOT NULL DEFAULT 0,

                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

                CONSTRAINT fk_menu_category_res_id
                    FOREIGN KEY (res_id)
                    REFERENCES restaurants(id)
                    ON DELETE CASCADE
            )`
        )

        await pool.query(
            `CREATE UNIQUE INDEX IF NOT EXISTS unique_active_category_per_res 
                ON menu_categories (res_id, LOWER(category_name)) 
                WHERE is_active = TRUE;`
        )
        await pool.query(
            `CREATE INDEX IF NOT EXISTS idx_menu_categories_res_id 
                ON menu_categories(res_id);`
        );
    } catch (err) {
        throw err;
    }
}