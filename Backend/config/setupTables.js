import { createTokenTable } from "../schema/inviteTokenTable.js";
import { createItemPriceTable } from "../schema/itemPriceTable.js";
import { createMenuCategoryTable } from "../schema/menuCategoryTable.js";
import { createMenuItemTable } from "../schema/menuItemTable.js";
import { createOrderItemsTable } from "../schema/orderItems.js";
import { createOrdersTable } from "../schema/ordersTable.js";
import { createOTPTable } from "../schema/otpTable.js";
import { createRateLimitTable } from "../schema/rateLimitTable.js";
import { createResConnectReqTable } from "../schema/resConnectReqTable.js";
import { createRestaurantTable } from "../schema/restaurantTable.js";
import { createRolesTable } from "../schema/roleTable.js";
import { createTablesTable } from "../schema/tablesTable.js";
import { createTableZone } from "../schema/tableZoneTable.js";
import { createUsertable } from "../schema/usersTable.js";
import pool from "../utils/db.js";

export const setupTable = async()=>{
    try {
        await createUsertable(pool);
        await createRateLimitTable(pool);
        await createOTPTable(pool);
        await createRestaurantTable(pool);
        await createRolesTable(pool);
        await createTokenTable(pool);
        await createTableZone(pool);
        await createTablesTable(pool);
        await createMenuCategoryTable(pool);
        await createMenuItemTable(pool);
        await createItemPriceTable(pool);
        await createResConnectReqTable(pool);
        await createOrdersTable(pool);
        await createOrderItemsTable(pool);
        
    } catch (err) {
        console.log(err);
        throw err;
    }
}