import { createOTPTable } from "../schema/otpTable.js";
import { createRateLimitTable } from "../schema/rateLimitTable.js";
import { createRestaurantTable } from "../schema/restaurantTable.js";
import { createRolesTable } from "../schema/roleTable.js";
import { createUsertable } from "../schema/usersTable.js";
import pool from "../utils/db.js";

export const setupTable = async()=>{
    try {
        await createUsertable(pool);
        await createRateLimitTable(pool);
        await createOTPTable(pool);
        await createRestaurantTable(pool);
        await createRolesTable(pool);
        
    } catch (err) {
        console.log(err);
        throw err;
    }
}