import db from '../utils/db.js';
import { returnRes } from '../utils/returnRes.js';


export const permissionInjector = async (req, res, next) => {
    const { id, role, res_id } = req.user;
    if (!id || !role || !res_id) {
        return returnRes(res, 403, {
            success: false,
            error: 'ROLE_NOT_FOUND',
            message: 'You do not have permission to access this resource.'
        });
    }
    try {
        const result = await db.query(
            `SELECT
                permissions
            FROM roles
            WHERE user_id = $1
                AND res_id=$2
                AND is_active =TRUE`,
            [id, res_id]
        );
        if (result.rows.length > 0) {
            const permissions = result.rows[0].permissions;
            req.permissions = permissions;
            next();
        }
        else {
            return returnRes(res, 403, {
                success: false,
                error: 'ROLE_NOT_FOUND',
                message: 'You do not have permission to access this resource.'
            });
        }
    } catch (err) {
        return returnRes(res, 500, {
            success: false,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'An error occurred while verifying your permissions.'
        });
    }
}