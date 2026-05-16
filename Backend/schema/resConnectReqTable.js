
export const createResConnectReqTable = async(pool)=>{
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS connect_requests(
                id BIGSERIAL PRIMARY KEY,
                res_id BIGINT NOT NULL,
                user_id BIGINT NOT NULL,
                status VARCHAR(20) NOT NULL DEFAULT 'pending',
                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

                CONSTRAINT fk_connect_req_res_id 
                    FOREIGN KEY (res_id)
                    REFERENCES restaurants(id),
                CONSTRAINT fk_connect_req_user_id
                    FOREIGN KEY (user_id)
                    REFERENCES users(id),
                CONSTRAINT unique_connect_req
                    UNIQUE(res_id,user_id)
            )`
        );
        
    } catch (err) {
        throw err;
    }
}