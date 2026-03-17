export const createRateLimitTable = async(pool)=>{
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS rate_limit_count(
                id BIGSERIAL PRIMARY KEY,
                identifier TEXT NOT NULL ,
                identifier_type VARCHAR(30) NOT NULL DEFAULT 'email' ,
                action_type VARCHAR(30) NOT NULL,
                count INT NOT NULL DEFAULT 1,
                
                window_start TIMESTAMPTZ DEFAULT now(),
                last_sent_at TIMESTAMPTZ DEFAULT now(),
                created_at TIMESTAMPTZ DEFAULT now(),

                CONSTRAINT unique_action_email 
                UNIQUE(identifier,action_type),
                CONSTRAINT identifier_check 
                CHECK(identifier_type IN ('email','ip_address','device_id'))
            )`
        )
        // window start --- counting start time 
        // last sent at --- last api/otp sent time
    } catch (err) {
        throw err;
    }
}