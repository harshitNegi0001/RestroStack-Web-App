import { createUsertable } from "../schema/usersTable.js";
import pool from "../utils/db.js";

export const setupTable = async()=>{
    try {
        await createUsertable(pool);
    } catch (err) {
        console.log(err);
        throw err;
    }
}