import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import { io, resEmpMap } from "../config/socket.js";
class Orders {

    sendKOT = async (req, res) => {
        const { table_id, zone_id, items = [] } = req.body;
        const { id, res_id, role } = req.user;
        const permissions = req.permissions;
        if (!items || items.length === 0) {
            return returnRes(res, 400, {
                success: false,
                error: 'EMPTY_ORDER',
                message: 'The order is empty. Please add items to the cart before sending.'
            });
        }

        if (role != 'owner' && !permissions?.['can_manage_table']) {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to send KOT.'
            });
        }

        if (!table_id) {
            return returnRes(res, 400, {
                success: false,
                error: 'MISSING_TABLE_ID',
                message: 'Table ID is required to process this order.'
            });
        }
        const client = await db.connect();
        try {

            await client.query('BEGIN');
            let orderRes = await client.query(
                `SELECT id FROM orders WHERE table_id = $1 AND res_id = $2 AND status = 'running' LIMIT 1`,
                [table_id, res_id]
            );

            let order_id;

            if (orderRes.rows.length > 0) {
                order_id = orderRes.rows[0].id;
            } else {
                const orderResult = await client.query(
                    `INSERT INTO orders (res_id, staff_id, table_id) 
                 VALUES ($1, $2, $3) RETURNING id`,
                    [res_id, id, table_id]
                );
                order_id = orderResult.rows[0].id;

                await client.query(`UPDATE tables SET status = 'occupied' WHERE id = $1`, [table_id]);
                // socket.emit notify all connector that table occupied.
                const resEmployees = resEmpMap.get(res_id);

                // spam notify all emp.
                if (resEmployees) {
                    resEmployees.forEach((socketId) => {
                        io.to(socketId).emit('table_status_change', { zone_id, table_id, new_status: 'occupied' });

                    })
                }

            }

            const variantIds = items.map(item => item.activeVariation.id);

            const priceResult = await client.query(
                `SELECT id, price FROM item_prices WHERE id = ANY($1::BIGINT[])`,
                [variantIds]
            );

            let query = `INSERT INTO order_items(
                order_id,
                    item_varity_id,
                    quantity,
                    price,
                    special_instruction
            ) VALUES
            `;
            let count = 1;
            let values = [];
            let placeholders = [];

            for (let i = 0; i < items.length; i++) {
                const currItem = items[i];
                const variant_id = currItem?.activeVariation.id
                const realPriceData = priceResult.rows.find(p => p.id == variant_id);
                const realPrice = realPriceData ? realPriceData.price : 0;

                placeholders.push(`($${count++}, $${count++}, $${count++}, $${count++}, $${count++})`);

                values.push(
                    order_id,
                    variant_id,
                    currItem.quantity,
                    realPrice,
                    currItem.extraDetail
                );
            }

            query += placeholders.join(', ');

            const orderItemResult = await client.query(query, values);
            await client.query('COMMIT');
            return returnRes(res, 200, {
                success: true,
                error: false,
                message: 'KOT sent.'
            });

        } catch (err) {
            await client.query('ROLLBACK');
            console.log('Sending KOT error: ', err.message);
            return returnRes(res, 500, {
                message: 'Internal Server Error!',
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            });
        }
        finally {
            client.release();
        }
    }
    getOldOrders = async (req, res) => {
        const { table_id } = req.query;
        const permissions = req.permissions;
        const { res_id, id, role } = req.user;

        if (role != 'owner' && !permissions?.['can_manage_table']) {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to access Orders.'
            });
        }
        try {

            const ordersResult = await db.query(
                `SELECT 
                    oi.id as id,
                    oi.order_id AS order_id,
                    o.staff_id AS staff_id,
                    i.item_name AS item_name,
                    i.image AS image,
                    oi.price AS price,
                    pi.variant_name AS variant_name,
                    oi.quantity AS quantity,
                    oi.special_instruction,
                    oi.status AS item_status,
                    oi.created_at as created_at,
                    o.created_at AS occupied_since
                FROM orders AS o
                JOIN order_items AS oi
                ON o.id = oi.order_id
                JOIN item_prices AS pi
                ON oi.item_varity_id = pi.id
                JOIN menu_items AS i
                ON i.id = pi.item_id
                WHERE (o.status = 'running'
                    OR o.status = 'billed')
                    AND o.res_id =$1
                    AND o.table_id= $2
                ORDER BY oi.created_at DESC
                `,
                [res_id, table_id]
            );
            return returnRes(res, 200, {
                success: true,
                items_list: ordersResult?.rows
            });
        } catch (err) {
            console.log('Sending KOT error: ', err.message);
            return returnRes(res, 500, {
                message: 'Internal Server Error!',
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            });
        }
    }

    cancelOrder = async (req, res) => {
        const { order_item_id } = req.body;
        const { id, res_id, role } = req.user;
        const permissions = req.permissions;
        if (role != 'owner' && !permissions?.['can_manage_table'] && !permissions?.['view_live_orders']) {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to manage Orders.'
            });
        }
        try {
            const order_item_status = await db.query(
                `SELECT status
                FROM order_items
                WHERE id =$1`,
                [order_item_id]
            );
            if (order_item_status?.rows?.length == 0) {
                return returnRes(res, 404, {
                    error: 'ORDER_ITEM_NOT_FOUND',
                    message: "The requested order item does not exist or may have been removed.",
                    success: false
                });
            }
            const order_status = order_item_status.rows[0]?.status;
            if (order_status == 'settled') {
                return returnRes(res, 403, {
                    success: false,
                    error: 'ORDER_IN_PROGRESS',
                    message: 'The kitchen is already preparing this order. Please contact the kitchen lead for changes.'
                });
            }
            if (role == 'waiter' && order_status != 'running') {
                return returnRes(res, 403, {
                    success: false,
                    error: 'REQUEST_DENIED',
                    message: 'Kitchen working on this, now you can not cancel.'
                });
            }

            await db.query(
                `UPDATE order_items
                    SET status = 'cancelled',
                    updated_at = now()
                WHERE id = $1`,
                [order_item_id]
            );

            return returnRes(res, 200, {
                success: true,
                error: false,
                message: 'Order cancelled!'
            });
        } catch (err) {
            console.log('Canceling order error: ', err.message);
            return returnRes(res, 500, {
                message: 'Internal Server Error!',
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            });
        }
    }

    generateBill = async (req, res) => {
        const { table_id } = req.body;
        const { id, res_id, role } = req.user;
        const permissions = req.permissions;

        if (role != 'owner' && !permissions?.['can_generate_bill']) {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to generate bills.'
            });
        }

        if (!table_id) {
            return returnRes(res, 400, { success: false, message: 'Table ID is required' });
        }

        const client = await db.connect();

        try {

            await client.query('BEGIN');

            const orderQuery = await client.query(
                `SELECT 
                o.id AS order_id, 
                o.created_at, 
                z.hourly_charge, 
                r.gst_tax AS tax
            FROM orders AS o
            JOIN tables AS t ON o.table_id = t.id
            JOIN table_zone AS z ON t.zone_id = z.id
            JOIN restaurants AS r ON o.res_id = r.id
            WHERE o.table_id = $1 AND o.res_id = $2 AND (o.status = 'running' OR o.status ='billed' )  
            ORDER BY o.created_at DESC 
            LIMIT 1`,
                [table_id, res_id]
            );

            if (orderQuery.rows.length === 0) {
                await client.query('ROLLBACK');
                return returnRes(res, 404, {
                    success: false,
                    message: 'No running order found on this table.'
                });
            }

            const { order_id, created_at, hourly_charge, tax } = orderQuery.rows[0];
            const exists_check = await client.query(
                `SELECT
                    b.*,
                    json_agg(
                        json_build_object(
                            'id',oi.id, 
                            'quantity',oi.quantity, 
                            'price',oi.price, 
                            'special_instruction',oi.special_instruction,
                            'item_name',i.item_name, 
                            'variant_name',pi.variant_name
                        )
                    ) AS items
                FROM bills AS b
                JOIN orders AS o
                ON b.order_id = o.id
                JOIN order_items AS oi
                ON o.id = oi.order_id
                JOIN item_prices AS pi
                ON oi.item_varity_id = pi.id
                JOIN menu_items i 
                ON pi.item_id = i.id
                WHERE b.order_id = $1
                GROUP BY b.id
                `, [order_id]
            )
            if (exists_check.rows.length > 0) {
                const data = exists_check.rows[0];
                return returnRes(res, 200, {
                    success: true,
                    error: false,
                    message: 'Bill already generated for this order.',
                    bill_data: {
                        id: data?.id,
                        invoice_no: data?.invoice_no,
                        subtotal: data?.subtotal,
                        tax_amount: data?.tax_amount,
                        table_charges: data?.table_charges,
                        grand_total: data?.grand_total,
                        items: data?.items,
                        billed_at: data?.created_at
                    }
                })
            }
            const itemsQuery = await client.query(
                `SELECT 
                oi.id, oi.quantity, oi.price, oi.special_instruction,
                i.item_name, pi.variant_name
            FROM order_items oi
            JOIN item_prices pi ON oi.item_varity_id = pi.id
            JOIN menu_items i ON pi.item_id = i.id
            WHERE oi.order_id = $1 AND oi.status != 'cancelled' AND oi.status != 'rejected'`,
                [order_id]
            );

            const items = itemsQuery.rows;

            const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

            const occupiedSince = new Date(created_at).getTime();
            const now = Date.now();
            const diffInMinutes = Math.max(0, Math.floor((now - occupiedSince) / 60000));

            const safe_hourly_charge = parseFloat(hourly_charge) || 0;
            const table_charges = (safe_hourly_charge / 60) * diffInMinutes;

            const safe_tax = parseFloat(tax) || 0;
            const tax_amount = (subtotal * safe_tax) / 100;

            const grand_total = subtotal + table_charges + tax_amount;

            const insertBillQuery = await client.query(
                `INSERT INTO bills (
                table_id, res_id, order_id, invoice_no, created_by,
                subtotal, tax_amount, table_charges, grand_total
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING id`,
                [table_id, res_id, order_id, `TEMP-ORD-${order_id}`, id, subtotal, tax_amount, table_charges, grand_total]
            );

            const newBillId = insertBillQuery.rows[0].id;

            const invoice_no = `INV-${res_id}-${newBillId}`;
            await client.query(
                `UPDATE bills SET invoice_no = $1 WHERE id = $2`,
                [invoice_no, newBillId]
            );

            await client.query(
                `UPDATE orders SET status = 'billed' WHERE id = $1`,
                [order_id]
            );

            await client.query('COMMIT');

            return returnRes(res, 200, {
                success: true,
                message: 'Bill generated successfully.',
                bill_data: {
                    id: newBillId,
                    invoice_no,
                    subtotal: subtotal.toFixed(2),
                    tax_amount: tax_amount.toFixed(2),
                    table_charges: table_charges.toFixed(2),
                    grand_total: grand_total.toFixed(2),
                    items: items,
                    billed_at: new Date()
                }
            });

        } catch (err) {
            await client.query('ROLLBACK');
            console.log('Generating Bill Error: ', err.message);
            return returnRes(res, 500, {
                message: 'Internal Server Error!',
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            });
        } finally {
            client.release();
        }
    }
    confirmCashPayment = async (req, res) => {
        const { bill_id } = req.body;
        const { id, role, res_id } = req.user;
        const permissions = req.permissions;

        if (role != 'owner' && !permissions?.['can_generate_bill']) {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to accept payment.'
            });
        }

        if (!bill_id) {
            return returnRes(res, 400, { success: false, message: 'Bill ID is required.', error: 'REQUIRED_INFO_MISSING' });
        }
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            const bill_update_res = await client.query(
                `UPDATE bills 
                SET payment_status = 'paid',
                    created_by = $1,
                    payment_method='cash',
                    payment_time=now()
                WHERE id =$2
                RETURNING table_id, order_id`,
                [id, bill_id]
            );
            if (bill_update_res?.rows.length == 0) {
                return returnRes(res, 400, {
                    success: false,
                    error: 'BILL_NOT_FOUND',
                    message: "Bill ID didn't matched!"
                })
            }
            const table_id = bill_update_res?.rows[0]?.table_id
            await client.query(
                `UPDATE tables
                SET status = 'available'
                WHERE id = $1
                `, [table_id]
            )

            await client.query(
                `UPDATE orders 
                SET status = 'settled'
                WHERE id =$1`,
                [bill_update_res?.rows[0]?.order_id]
            );
            const table_detail =await client.query(
                `SELECT zone_id 
                FROM tables
                WHERE id = $1`,
                [table_id]
            )
            await client.query('COMMIT');


            const resEmployees = resEmpMap.get(res_id);

            // spam notify all emp.
            if (resEmployees) {
                resEmployees.forEach((socketId) => {
                    io.to(socketId).emit('table_status_change', { zone_id:table_detail?.rows?.[0]?.zone_id, table_id, new_status: 'available' });
                })
            }
            io.emit('', {})
            return returnRes(res, 200, {
                success: true,
                error: false,
                message: 'Bill marked as paid.'
            })
        } catch (err) {
            await client.query('ROLLBACK');
            console.log('Confirming Cash Payment Error: ', err);
            return returnRes(res, 500, {
                message: 'Internal Server Error!',
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            });
        }
        finally {
            client.release();
        }
    }

    getKOT = async (req, res) => {
        const { id, res_id, role } = req.user;
        const permissions = req.permissions;

        if (role != 'owner' && !permissions?.['view_live_orders']) {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to view live orders.'
            });
        }

        try {
            const result = await db.query(
                `SELECT
                    oi.id AS id,
                    oi.order_id AS order_id,
                    i.item_name as item_name,
                    pi.variant_name AS variant_name,
                    oi.quantity AS quantity,
                    oi.special_instruction AS instruction,
                    oi.status AS status,
                    o.table_id AS table_id,
                    t.table_name AS table_name,
                    z.zone_name AS zone_name,
                    oi.created_at AS ordered_at
                FROM order_items AS oi
                JOIN orders AS o
                ON oi.order_id = o.id
                JOIN item_prices AS pi
                ON oi.item_varity_id = pi.id
                JOIN menu_items AS i
                ON pi.item_id =i.id
                JOIN tables AS t
                ON o.table_id = t.id
                JOIN table_zone AS z
                ON t.zone_id = z.id
                WHERE o.res_id = $1 
                    AND oi.status != 'cancelled'
                ORDER BY oi.created_at DESC
                    `, [res_id]
            );


            return returnRes(res, 200, {
                success: true,
                error: false,
                message: 'Live orders fetched.',
                orders_list: result?.rows
            });
        } catch (err) {
            console.log('Viewing KOT Error: ', err);
            return returnRes(res, 500, {
                message: 'Internal Server Error!',
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            });
        }
    }
    updateOrderStatus = async (req, res) => {
        const { id, res_id, role } = req.user;
        const permissions = req.permissions;
        const { orderItemId, newStatus, reason, customReason } = req.body;
        if (role != 'owner' && !permissions?.['view_live_orders'] && !permissions?.['can_manage_table']) {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to manage orders.'
            });
        }
        // check for specific order they have permission
        if ((newStatus == 'preparing' || newStatus == 'ready' || newStatus == 'rejected') && !permissions?.['view_live_orders'] && role != 'owner') {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to perform this action.'
            });
        }
        if ((newStatus == 'cancelled' || newStatus == 'served') && !permissions?.['can_manage_table'] && role != 'owner') {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to prepair order'
            });
        }


        try {
            const orderCheck = await db.query(
                `SELECT 
                    oi.status
                FROM order_items AS oi
                JOIN orders AS o
                ON oi.order_id = o.id
                WHERE oi.id = $1
                    AND o.res_id =$2`,
                [orderItemId, res_id]
            );

            if (orderCheck.rows.length == 0) {
                return returnRes(res, 404, {
                    success: false,
                    error: 'ORDER_NOT_FOUND',
                    message: 'Order you want to update, not found!'
                });
            }
            const order_status = orderCheck?.rows[0].status;
            if (order_status == 'cancel' || order_status == 'rejected') {
                return returnRes(res, 400, {
                    success: false,
                    error: 'ORDER_CANCELLED_OR_REJECTED',
                    message: "Once cancelled or rejected can't be modify."
                });
            }
            if ((order_status == 'preparing' && (newStatus == 'ready' || newStatus == 'rejected')) ||
                (order_status == 'ready' && newStatus == 'served') ||
                (order_status == 'pending' && (newStatus == 'preparing' || newStatus == 'cancelled' || newStatus == 'rejected'))) {
                await db.query(
                    `UPDATE order_items
                SET status =$1,
                    updated_at = now()
                WHERE id = $2`,
                    [newStatus, orderItemId]
                );

                if (newStatus == 'ready') {
                    // notify waiter! with  sockets
                }
                if (newStatus == 'served') {
                    // change status from frontend for cheif view.
                }
                return returnRes(res, 200, {
                    message: 'Successfully updated order status',
                    success: true,
                    error: false
                });
            }
            else {
                return returnRes(res, 400, {
                    success: false,
                    error: '',
                    message: 'Action not allowed!'
                });
            }

        } catch (err) {
            console.log('Updating KOT Status Error: ', err);
            return returnRes(res, 500, {
                message: 'Internal Server Error!',
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            });
        }
    }

    getWaiterOrders = async (req, res) => {
        const { id, res_id, role } = req.user;
        const permissions = req.permissions;
        if (role != 'owner' && !permissions?.['can_manage_table']) {
            return returnRes(res, 403, {
                success: false,
                error: 'UNAUTHORIZED_ACTION',
                message: 'You do not have permission to manage orders.'
            });
        }
        try {
            const result = await db.query(
                `SELECT 
                    oi.id AS id,
                    oi.order_id,
                    t.table_name,
                    i.item_name,
                    pi.variant_name,
                    oi.quantity,
                    oi.status AS status,
                    o.table_id ,
                    z.zone_name AS zone_name,
                    oi.created_at AS ordered_at,
                    oi.updated_at AS updated_at
                FROM orders AS o
                JOIN order_items AS oi
                ON oi.order_id = o.id
                JOIN item_prices AS pi
                ON oi.item_varity_id = pi.id
                JOIN menu_items AS i
                ON pi.item_id =i.id
                JOIN tables AS t
                ON o.table_id = t.id
                JOIN table_zone AS z
                ON t.zone_id = z.id
                WHERE o.res_id =$2 
                    AND o.staff_id =$1
                ORDER BY oi.updated_at DESC`,
                [id, res_id]
            )

            return returnRes(res, 200, {
                success: true,
                error: false,
                message: 'Order fetched successfully.',
                orders_list: result?.rows || []
            });
        } catch (err) {
            console.log('Getting Orders List Error: ', err);
            return returnRes(res, 500, {
                message: 'Internal Server Error!',
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            });
        }
    }
}


export default new Orders();