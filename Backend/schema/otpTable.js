export const createOTPTable = async(pool)=>{
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS otp_table(
                id BIGSERIAL PRIMARY KEY,
                identifier TEXT NOT NULL, 
                identifier_type VARCHAR(30) NOT NULL DEFAULT 'email',
                hashed_otp TEXT NOT NULL,
                otp_type VARCHAR(20) NOT NULL DEFAULT 'login',
                status VARCHAR(15) NOT NULL DEFAULT 'pending',

                expires_at TIMESTAMPTZ NOT NULL DEFAULT now()+INTERVAL '5 minutes',
                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

                attempts_count INT DEFAULT 0,

                CONSTRAINT unique_identifier_otp_type 
                UNIQUE(identifier,otp_type),

                CONSTRAINT identifier_type_check 
                CHECK (identifier_type IN ('email', 'ip_address', 'device_id')),

                CONSTRAINT otp_status_check 
                CHECK (status IN ('pending', 'verified', 'expired', 'failed'))

            )`
        )
        
    } catch (err) {
        throw err;
    }
}