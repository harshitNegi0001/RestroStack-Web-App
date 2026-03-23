
import db from './db.js';

export const getUserInfo = async ( userId) => {
    try {
        const result = await db.query(
            `SELECT 
                id,
                email,
                image,
                name,
                verified_email,
                acc_status,
                is_onboarded,
                last_role_id,
                created_at
            FROM users 
            WHERE id =$1
            `,
            [userId]
        );

        return result.rows[0];
    } catch (err) {
        throw err
    }
}