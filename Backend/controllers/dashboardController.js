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

                const active_orders_stats = await this.getLiveOrderStats(res_id)
                // average prepare time 
                const avgPrpareResult = 12.5 // fix later 
                // live table occupied

                const table_occupied_stats = await this.getTableStatusStats(res_id);
                // active staff no.
                const activeStaffResult = {
                    total_staff: 10,
                    active_staff: 10,
                    absent_staff: 0
                } // create later.


                // 3. top 3 selling items data
                const mostSoldItemsResult = await this.getTopSold(res_id);
                const revenueChartData = await this.getRevenueChart(res_id);
                return returnRes(res, 200, {
                    success: true,
                    error: false,
                    subStats: {
                        active_staff_stats: activeStaffResult,
                        active_orders_stats,
                        avg_prep_time: avgPrpareResult,
                        table_occupied_stats
                    },
                    most_sold_items: mostSoldItemsResult,
                    revenue_chart_data:revenueChartData
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
    // controller function to get updated table status after socket emit.
    getUpdatedTableStatus = async (req, res) => {
        const { res_id } = req.user;

        try {
            const table_occupied_stats = await this.getTableStatusStats(res_id);
            return returnRes(res, 200, {
                message: 'Fatched successfully.',
                error: false,
                success: true,
                table_occupied_stats
            })
        } catch (err) {
            return returnRes(res, 500, {
                error: 'INTERNAL_SERVER_ERROR',
                success: false,
                message: 'Internal server error!'
            })
        }
    }
    // Controller function to get updated orders stats and top sold item data and update Revenue chart
    getOrderStats = async (req, res) => {

        const { res_id } = req.user;

        try {
            const topSoldItems = await this.getTopSold(res_id);
            const active_orders_stats = await this.getLiveOrderStats(res_id);
            const revenueChartData = await this.getRevenueChart(res_id)
            return returnRes(res, 200, {
                success: true,
                error: false,
                active_orders_stats: active_orders_stats,
                most_sold_items: topSoldItems,
                revenue_chart_data:revenueChartData
            });

        } catch (err) {
            console.log('Getting live order & top sold error: ', err.message);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal server error!'
            });
        }
    }
    
    // Helper function for getting tables status data on dashboard 
    getTableStatusStats = async (res_id) => {


        const occupiedTableResult = await db.query(
            `SELECT 
                        *
                    FROM tables
                    WHERE res_id = $1
                        AND is_active = TRUE
                    `, [res_id]
        );

        const occupiedTableData = occupiedTableResult.rows ?? [];
        const table_occupied_stats = {
            total_tables: occupiedTableData.length,
            occupied: occupiedTableData.filter(t => t.status == 'occupied')?.length,
            available: occupiedTableData.filter(t => t.status == 'available')?.length,
            reserved: occupiedTableData.filter(t => t.status == 'reserved')?.length
        }
        return table_occupied_stats;
    }
    // Helper function for geetting orders stats
    getLiveOrderStats = async (res_id) => {

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

        return active_orders_stats
    }
    // Helper function to get top sold item list.

    getTopSold = async (res_id) => {
        const mostSoldItemsResult = await db.query(
            `SELECT 
                        i.item_name AS name,
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

        return mostSoldItemsResult.rows;
    }

    // helper function for getting revenue graph stats.
    getRevenueChart = async (res_id) => {
        const result = await db.query(
            `WITH AllHours AS (
                SELECT generate_series(0, 23) AS hour_of_day
            ),
            DailySales AS (
                SELECT 
                    EXTRACT(HOUR FROM created_at AT TIME ZONE 'Asia/Kolkata') AS hour_of_day,
                    SUM(grand_total) AS total_revenue
                FROM bills
                WHERE res_id = $1 
                AND DATE(created_at AT TIME ZONE 'Asia/Kolkata') = CURRENT_DATE
                AND payment_status = 'paid'
                GROUP BY 1
            )
            SELECT 
                h.hour_of_day,
                COALESCE(s.total_revenue, 0) AS total_revenue
            FROM AllHours h
            LEFT JOIN DailySales s ON h.hour_of_day = s.hour_of_day
            ORDER BY h.hour_of_day;`, [res_id]
        )


        const formattedData = result?.rows
        ?.filter(row => {
                const hour = Number(row.hour_of_day);
                return hour >= 7 && hour <= 22; // Sirf opening aur closing ke beech ka data
            })
            ?.map(row => {
                const hour = Number(row.hour_of_day);

                // AM/PM logic
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour % 12 || 12; // 0 baje ko 12 AM banayega, 13 ko 1 PM

                return {
                    time: `${hour12} ${ampm}`,
                    revenue: Number(row.total_revenue) // String se wapas number me convert karne ke liye
                };
            });
        return formattedData;
    }
}

export default new Dashboard();