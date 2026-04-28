import db from './db.js';

export const getRoles = async (userId) => {
    try {
        const roles = await db.query(
        `SELECT 
                rl.id,
                rl.role_name,
                rl.permissions,
                rl.res_id,
                json_build_object(
                    'id',r.id,
                    'res_name',r.res_name,
                    'res_logo',r.res_logo,
                    'full_address',r.full_address,
                    'res_status',r.res_status,
                    'currency',r.currency
                ) as res_data

                FROM roles AS rl
                JOIN restaurants AS r
                ON r.id = rl.res_id
                WHERE rl.is_active = TRUE
                    AND rl.user_id = $1
                    AND r.res_status = 'active'
                `,
        [userId]
    );
    const rolesList = roles.rows;

    return rolesList;
    } catch (err) {
        throw err;
    }
    
}