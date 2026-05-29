import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';

class Orders {

    sendKOT = async (req, res) => {
        const { table_id, items = [] } = req.body;
        const { id, res_id, role } = req.user;
        const permissions = req.permissions;
        if (!items || items.length === 0) {
            return returnRes(res, 400, {
                success: false,
                error: 'EMPTY_ORDER',
                message: 'No items in the cart to order.'
            });
        }

        if (role != 'owner' && !permissions?.['can_manage_table']) {
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to send KOT.'
            });
        }

        if (!table_id) {
            return returnRes(res, 400, {
                success: false,
                error: 'REQUIRED_FIELD_MISSING',
                message: 'Missing required field.'
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
}


export default new Orders();