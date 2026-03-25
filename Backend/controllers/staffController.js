import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import crypto from 'crypto';


class Staff {
    generateInviteToken = async (req, res) => {
        const { id, role } = req.user;
        const { role_name, res_id } = req.body;

        try {
            // verification that user hold permission in given res_id;
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

                if (role == 'owner' || permissions?.['can_manage_staff']) {

                    const token = crypto.randomBytes(32).toString('hex');
                    const timestamp = Date.now();
                    const modifiedToken = `RES${res_id}-${timestamp}-${token}`;
                    await db.query(
                        `INSERT INTO tokens
                    (
                        token,
                        res_id,
                        role_name
                    )
                    VALUES(
                        $1,$2,$3
                    )`,
                        [modifiedToken, res_id, role_name]
                    );

                    return returnRes(res,200,{
                        
                    })
                }
                else {
                    return returnRes(res, 403, {
                        error: 'ACCESS_DENIED',
                        message: 'Only owners are authorized to access this resource.'
                    });
                }
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
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Only owners are authorized to access this resource.'
            });
        }
    }



}

export default new Staff();