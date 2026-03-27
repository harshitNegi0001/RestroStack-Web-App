import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import crypto from 'crypto';
import { createStaffInvitationMain } from "../utils/inviteStaffMail.js";
import { sendEmail } from "../config/sendMail.js";
import { defaultPermisson } from "../utils/defaultPermission.js";
import { getUserFullDetail } from "../utils/getUserFullDetail.js";


class Staff {
    generateInviteToken = async (req, res) => {
        const { id, role } = req.user;
        const { role_name, res_id, email } = req.body;

        try {
            // verification that user hold permission in given res_id;
            const result = await db.query(
                `SELECT
                    rl.permissions,
                    r.res_name
                FROM roles AS rl
                JOIN restaurants AS r
                ON r.id=rl.res_id
                WHERE user_id = $1
                    AND res_id=$2
                    AND is_active =TRUE`,
                [id, res_id]
            );
            if (result.rows.length > 0) {
                const permissions = result.rows[0].permissions;
                const restaurant_name = result.rows[0].res_name;
                if (role == 'owner' || permissions?.['can_manage_staff']) {

                    const token = crypto.randomBytes(32).toString('hex');
                    const timestamp = Date.now();
                    const modifiedToken = `RES${res_id}-${timestamp}-${token}`;
                    const expiresAt = new Date();
                    expiresAt.setHours(expiresAt.getHours() + 24);
                    await db.query(
                        `INSERT INTO tokens
                    (
                        token,
                        res_id,
                        role_name,
                        expires_at
                    )
                    VALUES(
                        $1,$2,$3,$4
                    )`,
                        [modifiedToken, res_id, role_name, expiresAt]
                    );
                    // send an email.
                    const user = await db.query(
                        `SELECT 
                            name
                        FROM users
                        WHERE id=$1`,
                        [id]
                    );
                    const sender_name = user.rows[0].name;
                    const mail = createStaffInvitationMain({ token: modifiedToken, owner_name: sender_name, restaurant_name, role_name });
                    await sendEmail(email, `Invitation to join ${restaurant_name} as ${role_name}.`, mail);

                    return returnRes(res, 200, {
                        success: true,
                        message: 'Invite token created successfully.'
                    });
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
            console.log(err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Only owners are authorized to access this resource.'
            });
        }
    }

    inviteTokenCheck = async (req, res) => {
        const { id } = req.user;
        const { token, req_type = 'view' } = req.body;
        const client = await db.connect();

        try {
            await client.query('BEGIN');
            const tokenResult = await client.query(
                `SELECT 
                    t.status,
                    t.res_id,
                    t.role_name,
                    t.expires_at,
                    r.res_name
                FROM tokens AS t
                JOIN restaurants AS r
                ON r.id=t.res_id
                WHERE t.token =$1
                FOR UPDATE
                `,
                [token]
            );
            const tokenExists = tokenResult.rows.length > 0;
            if (tokenExists) {
                const tokenData = tokenResult.rows[0];
                const currentTime = new Date();
                if (tokenData.status != 'pending') {
                    await client.query(
                        `DELETE FROM tokens 
                        WHERE token =$1`,
                        [token]
                    );
                    await client.query('COMMIT');
                    return returnRes(res, 410, {
                        success: false,
                        error: tokenData.status == 'expired' ? 'TOKEN_EXPIRED' : 'TOKEN_USED',
                        message: tokenData.status == 'expired' ?
                            'This invitation has expired. \nPlease ask the owner for a new link.'
                            : 'This invitation has been used. \nPlease ask the owner for a new link.'
                    });
                }
                if (new Date(tokenData.expires_at) < currentTime) {
                    await client.query(
                        `UPDATE tokens
                            SET status = 'expired'
                        WHERE token=$1`,
                        [token]
                    );
                    await client.query('COMMIT');
                    return returnRes(res, 410, {
                        success: false,
                        error: 'TOKEN_EXPIRED',
                        message: 'This invitation has expired. \nPlease ask the owner for a new link.'
                    });
                }

                if (req_type == 'join') {
                    const permissions = defaultPermisson[tokenData.role_name];
                    const roleInsertResult = await client.query(
                        `INSERT INTO roles
                        (
                            role_name,
                            res_id,
                            user_id,
                            permissions
                        )
                        VALUES(
                            $1,$2,$3,$4
                        )
                        ON CONFLICT (user_id,res_id)
                        DO UPDATE
                        SET 
                            role_name = EXCLUDED.role_name, 
                            permissions = EXCLUDED.permissions, 
                            is_active = TRUE 
                        RETURNING id `,
                        [tokenData.role_name, tokenData.res_id, id, permissions]
                    )
                    const roleId = roleInsertResult.rows[0]?.id;
                    await client.query(
                        `UPDATE users
                            SET last_role_id=$1
                        WHERE id =$2`,
                        [roleId, id]
                    );
                    await client.query(
                        `UPDATE tokens
                            SET status = 'used'
                        WHERE token=$1`,
                        [token]
                    );
                    await client.query('COMMIT');

                    const response = await getUserFullDetail(id);
                    return returnRes(res, 200, response);
                }
                else {
                    await client.query('COMMIT');
                    return returnRes(res, 200, {
                        success: true,

                        res_name: tokenData.res_name,
                        role_name: tokenData.role_name,
                        expires_at: tokenData.expires_at

                    });
                }
            }
            await client.query('ROLLBACK');
            return returnRes(res, 404, {
                success: false,
                error: 'INVALID_TOKEN',
                message: 'This invitation link is invalid or has been removed.'
            });
        } catch (err) {
            await client.query('ROLLBACK');
            console.log(err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
        finally {
            client.release();
        }
    }


}

export default new Staff();