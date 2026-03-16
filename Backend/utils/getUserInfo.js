
import db from './db.js';
import { returnRes } from './returnRes.js';

export const getUserInfo = async (res, userId) => {
    try {
        const result = await db.query(
            `SELECT 
                id,
                email,
                name,
                role,
                verified_email,
                is_active,
                created_at
            FROM users 
            WHERE id =$1
            `,
            [userId]
        );

        return result.rows[0];
    } catch (err) {
        return returnRes(res, 500, { success: false, error: true, message: 'Internal Server Error!' });
    }
}