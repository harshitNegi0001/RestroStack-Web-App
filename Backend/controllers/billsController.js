import { returnRes } from '../utils/returnRes.js';
import db from '../utils/db.js';

class Bills {
    getStartAndEndOfDate = (type, customFrom, customTo) => {
        const now = new Date();
        let start, end;

        switch (type) {
            case 'today':
                start = new Date(now.setHours(0, 0, 0, 0));
                end = new Date(now.setHours(23, 59, 59, 999));
                break;
            case 'yesterday':
                const yesterday = new Date(now);
                yesterday.setDate(yesterday.getDate() - 1);
                start = new Date(yesterday.setHours(0, 0, 0, 0));
                end = new Date(yesterday.setHours(23, 59, 59, 999));
                break;
            case 'week':
                start = new Date(now);
                start.setDate(start.getDate() - 7);
                start.setHours(0, 0, 0, 0);
                end = new Date();
                break;
            case 'month':
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
                break;
            case 'year':
                start = new Date(now.getFullYear(), 0, 1);
                end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
                break;
            case 'custom':
                if (customFrom && customTo) {
                    start = new Date(customFrom);
                    start.setHours(0, 0, 0, 0);
                    end = new Date(customTo);
                    end.setHours(23, 59, 59, 999);
                }
                break;
            default:
                start = new Date(now.setHours(0, 0, 0, 0));
                end = new Date(now.setHours(23, 59, 59, 999));
        }
        return { start, end };
    };
    getBillsHistory = async (req, res) => {
        const { id, role, res_id } = req.user;
        const permissions = req.permissions;

        if (role != 'owner' && !permissions['view_billings']) {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: `You didn't have permissions to see the bills history.`
            })
        }
        const { timeline = 'week', customTimeline, activePage, perPage, advanceFilter = 'default', searchQuery = '' } = req.body;
        try {
            const limit = parseInt(perPage) || 5;
            const page = parseInt(activePage) || 1;
            const offset = limit * (page - 1);
            let queryParams = [res_id,offset,limit];
            let summaryQueryParams = [res_id];
            let paramCount = 4;
            let dateCondition = "";
            let summaryDateCondition = "";
            const { start, end } = this.getStartAndEndOfDate(timeline, customTimeline?.from, customTimeline?.to)
            if (start && end) {
                dateCondition = ` AND b.created_at >= $${paramCount++} AND b.created_at <= $${paramCount++} `;
                queryParams.push(start.toISOString(), end.toISOString());
                summaryDateCondition = ` AND b.created_at >= $2 AND b.created_at <= $3 `;
                summaryQueryParams.push(start.toISOString(), end.toISOString());
            }

            let searchCondition = "";
            if (searchQuery && searchQuery.trim() !== '') {
                if (advanceFilter === 'default') {
                    searchCondition = ` AND (b.invoice_no ILIKE $${paramCount} OR u.name ILIKE $${paramCount}) `;
                } else if (advanceFilter === 'items' || advanceFilter === 'categories') {
                    searchCondition = ` AND (i.item_name ILIKE $${paramCount} OR c.name ILIKE $${paramCount}) `;
                }
                if (searchCondition !== "") {
                    queryParams.push(`%${searchQuery}%`);
                    paramCount++;
                }
            }
            let finalQuery = "";
            switch (advanceFilter) {
                case 'default':
                    finalQuery = `
                    SELECT 
                        b.id, b.invoice_no, b.created_at AS billed_at, 
                        b.grand_total, b.payment_method, b.payment_status,
                        u.name AS created_by, 
                        t.table_name AS table_name, 
                        z.zone_name AS zone_name
                    FROM bills b
                    LEFT JOIN users u ON b.created_by = u.id
                    LEFT JOIN tables t ON b.table_id = t.id
                    LEFT JOIN table_zone z ON t.zone_id = z.id
                    WHERE b.res_id = $1 ${dateCondition} ${searchCondition}
                    ORDER BY b.created_at DESC
                    offset $2::int
                    limit $3::int
                `;
                    break;

                case 'items':
                    finalQuery = `
                    SELECT 
                        i.item_name, 
                        c.name AS category_name, 
                        SUM(oi.quantity) AS total_quantity, 
                        SUM(oi.price * oi.quantity) AS total_revenue
                    FROM bills b
                    JOIN orders o ON b.order_id = o.id
                    JOIN order_items oi ON o.id = oi.order_id AND oi.status != 'cancelled'
                    JOIN item_prices ip ON oi.item_varity_id = ip.id
                    JOIN menu_items i ON ip.item_id = i.id
                    LEFT JOIN categories c ON i.category_id = c.id
                    WHERE b.res_id = $1 ${dateCondition} ${searchCondition}
                    GROUP BY i.item_name, c.name
                    ORDER BY total_revenue DESC
                    offset $2::int
                    limit $3::int
                `;
                    break;

                case 'categories':
                    finalQuery = `
                    SELECT 
                        c.name AS category_name, 
                        SUM(oi.quantity) AS total_quantity, 
                        SUM(oi.price * oi.quantity) AS total_revenue
                    FROM bills b
                    JOIN orders o ON b.order_id = o.id
                    JOIN order_items oi ON o.id = oi.order_id AND oi.status != 'cancelled'
                    JOIN item_prices ip ON oi.item_varity_id = ip.id
                    JOIN menu_items i ON ip.item_id = i.id
                    JOIN categories c ON i.category_id = c.id
                    WHERE b.res_id = $1 ${dateCondition} ${searchCondition}
                    GROUP BY c.name
                    ORDER BY total_revenue DESC
                    offset $2::int
                    limit $3::int
                `;
                    break;

                case 'date':
                    finalQuery = `
                    SELECT 
                        DATE(b.created_at AT TIME ZONE 'Asia/Kolkata') AS sales_date, 
                        COUNT(DISTINCT b.id) AS total_bills, 
                        SUM(b.grand_total) AS total_revenue
                    FROM bills b
                    WHERE b.res_id = $1 ${dateCondition}
                    GROUP BY DATE(b.created_at AT TIME ZONE 'Asia/Kolkata')
                    ORDER BY sales_date DESC
                    offset $2::int
                    limit $3::int
                `;
                    break;

                case 'table':
                    finalQuery = `
                    SELECT 
                        t.name AS table_name,
                        z.name AS zone_name,
                        COUNT(DISTINCT b.id) AS total_bills, 
                        SUM(b.grand_total) AS total_revenue
                    FROM bills b
                    JOIN tables t ON b.table_id = t.id
                    LEFT JOIN table_zone z ON t.zone_id = z.id
                    WHERE b.res_id = $1 ${dateCondition}
                    GROUP BY t.name, z.name
                    ORDER BY total_revenue DESC
                    offset $2::int
                    limit $3::int
                `;
                    break;

                case 'zone':
                    finalQuery = `
                    SELECT 
                        z.name AS zone_name,
                        COUNT(DISTINCT b.id) AS total_bills, 
                        SUM(b.grand_total) AS total_revenue
                    FROM bills b
                    JOIN tables t ON b.table_id = t.id
                    JOIN table_zone z ON t.zone_id = z.id
                    WHERE b.res_id = $1 ${dateCondition}
                    GROUP BY z.name
                    ORDER BY total_revenue DESC
                    offset $2::int
                    limit $3::int
                `;
                    break;

                default:
                    throw new Error("Invalid view basis");
            }

            const summaryQuery = `
            SELECT 
                COUNT(b.id) AS total_orders,
                COALESCE(SUM(b.grand_total), 0) AS total_revenue
            FROM bills b
            WHERE b.res_id = $1 ${summaryDateCondition}
        `;
            const [tableResults, summaryResults] = await Promise.all([
                db.query(finalQuery, queryParams),
                // Date condition same hai, isliye params array mein sirf res_id, start, end bhej rahe hain
                db.query(summaryQuery,summaryQueryParams)
            ]);
            return returnRes(res, 200, {
                success: true,
                summary: summaryResults.rows[0],
                table_data: tableResults.rows
            });
        } catch (err) {
            console.log('Getting bills history error: ', err.message);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
    }
    getQuantityRevenueStats = async () => {

    }
}

export default new Bills();