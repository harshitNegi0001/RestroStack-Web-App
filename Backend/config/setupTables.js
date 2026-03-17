import { createOTPTable } from "../schema/otpTable.js";
import { createRateLimitTable } from "../schema/rateLimitTable.js";
import { createUsertable } from "../schema/usersTable.js";
import pool from "../utils/db.js";

export const setupTable = async()=>{
    try {
        await createUsertable(pool);
        await createRateLimitTable(pool);
        await createOTPTable(pool);
    } catch (err) {
        console.log(err);
        throw err;
    }
}