import { returnRes } from '../utils/returnRes.js';
import db from '../utils/db.js';

class Dashboard {
    getInitialDashboardData = async (req, res) => {
        const { id, res_id, role } = req.user;
        // const permissions = req.permissions;


        try {
            //  check user's role and permission to access diffrent data accordingly.
            //  for owner and manager
            if (role == 'owner' || role == 'manager') {
                // hourly revenue data
                const hourlyResult = await db.query(
                    `SELECT 
                        EXTRACT(HOUR  FROM created_at) AS hour,
                        SUM(grand_total) AS revenue
                    FROM bills
                    WHERE res_id = $1 
                        AND created_at >= CURRENT_DATE
                        AND payment_status = 'paid'
                    GROUP BY hour
                    ORDER BY hour
                    `, [res_id]
                )// 2. substats data 

                // active orders 
                const activeOrderResult = await db.query(
                    `SELECT 
                        COUNT(id) AS active_orders
                    FROM orders 
                    WHERE res_id = $1 AND status = 'running'`,
                    [res_id]
                )
                const todayDoneResult = await db.query(
                    `SELECT 
                        COUNT(id) AS completed_orders
                    FROM orders 
                    WHERE res_id = $1 AND status = 'settled' AND created_at >= CURRENT_DATE`,
                    [res_id]
                )
                const active_orders_stats = {
                    running: activeOrderResult.rows[0]?.active_orders || 0,
                    completed: todayDoneResult.rows[0]?.completed_orders || 0
                }
                // average prepare time 
                const avgPrpareResult = 12.5 // fix later 
                // live table occupied
                const occupiedTableResult = await db.query(
                    `SELECT 
                        *
                    FROM tables
                    WHERE res_id = $1
                        AND is_active = TRUE
                    `, [res_id]
                )
                const occupiedTableData = occupiedTableResult.rows ?? [];
                const table_occupied_stats = {
                    total_tables: occupiedTableData.length,
                    occupied: occupiedTableData.filter(t => t.status == 'occupied')?.length,
                    available: occupiedTableData.filter(t => t.status == 'available')?.length,
                    reserved: occupiedTableData.filter(t => t.status == 'reserved')?.length
                }
                // active staff no.
                const activeStaffResult = {
                    total_staff: 10,
                    active_staff: 10,
                    absent_staff: 0
                } // create later.


                // 3. top 3 selling items data
                const mostSoldItemsResult = await db.query(
                    `SELECT 
                        i.item_name,
                        SUM(oi.quantity) AS total_sold,
                        i.image 
                    FROM order_items AS oi
                    JOIN orders AS o 
                    ON oi.order_id  = o.id
                    JOIN item_prices AS pi 
                    ON oi.item_varity_id = pi.id
                    JOIN menu_items AS i
                    ON pi.item_id = i.id
                    WHERE oi.created_at >= CURRENT_DATE AND
                        oi.status = 'served' AND o.res_id = $1
                    GROUP BY i.id, i.item_name, i.image
                    ORDER BY total_sold DESC
                    LIMIT 3
                    `, [res_id]
                );

                return returnRes(res, 200, {
                    success: true,
                    error: false,
                    subStats: {
                        active_staff_stats: activeStaffResult,
                        active_orders_stats,
                        avg_prep_time: avgPrpareResult,
                        table_occupied_stats
                    },
                    most_sold_items: mostSoldItemsResult.rows
                })

            }


        } catch (err) {
            console.log('Getting initial dashboard error: ', err.message);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal server error!'
            });
        }
    }


}

export default new Dashboard();