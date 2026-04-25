

export const createRestaurantTable = async (pool) => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS restaurants(
                id BIGSERIAL PRIMARY KEY,
                owner_id BIGINT NOT NULL,
                email TEXT NOT NULL,
                res_name TEXT NOT NULL,
                res_logo TEXT ,
                res_type VARCHAR(50) NOT NULL,
                contact_no VARCHAR(20) NOT NULL,
                res_status VARCHAR(20) NOT NULL DEFAULT 'active',
                opening_timeing jsonb,

                full_address TEXT NOT NULL,
                city TEXT NOT NULL,
                state TEXT NOT NULL,
                country TEXT NOT NULL,
                latitude DECIMAL,
                longitude DECIMAL,
                gstin VARCHAR(30),
                fssai_no VARCHAR(30),
                gst_tax DECIMAL NOT NULL DEFAULT 0,
                currency VARCHAR(5),

                verified_email BOOLEAN DEFAULT FALSE,

                updated_at TIMESTAMPTZ DEFAULT now(),
                created_at TIMESTAMPTZ DEFAULT now(),

                CONSTRAINT fk_owner_id 
                    FOREIGN KEY (owner_id)
                    REFERENCES users(id),

                CONSTRAINT res_status_check 
                CHECK(res_status IN ('active','suspended','deactivated','closed'))
            )`
        )
        await pool.query(
            `
            CREATE INDEX IF NOT EXISTS idx_restaurant_name ON restaurants(res_name);
            CREATE INDEX IF NOT EXISTS idx_owner_id ON restaurants(owner_id);
            CREATE INDEX IF NOT EXISTS idx_restaurant_city ON restaurants(city);
            CREATE INDEX IF NOT EXISTS idx_restaurant_email ON restaurants(email);
            `
        )
    } catch (err) {
        throw err;
    }
}