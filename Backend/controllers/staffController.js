import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import crypto from 'crypto';
import { createStaffInvitationMain } from "../utils/inviteStaffMail.js";
import { sendEmail } from "../config/sendMail.js";
import { defaultPermisson } from "../utils/defaultPermission.js";
import { getUserFullDetail } from "../utils/getUserFullDetail.js";
import createToken from "../utils/createToken.js";
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV == 'production';

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
                        expires_at,
                        sent_to
                    )
                    VALUES(
                        $1,$2,$3,$4,$5
                    )`,
                        [modifiedToken, res_id, role_name, expiresAt,email]
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
                        message: 'You do not have permission to create or manage the Menu.'
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
                    await client.query('COMMIT');
                    return returnRes(res, 410, {
                        success: false,
                        error: tokenData.status == 'expired' ? 'TOKEN_EXPIRED' : (tokenData.status == 'accepted') ? 'TOKEN_USED' : 'TOKEN_DECLINED',
                        message: tokenData.status == 'expired' ?
                            'This invitation has expired. \nPlease ask the owner for a new link.'
                            : (tokenData.status == 'accepted') ? 'This invitation has been used. \nPlease ask the owner for a new link.' :
                                "You've been declined to join. No further action is needed."
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
                    const existingRoleCheck = await client.query(
                        `SELECT 
                            role_name
                        FROM roles
                        WHERE user_id=$1
                            AND res_id=$2`,
                        [id, tokenData.res_id]
                    );

                    if (existingRoleCheck.rows.length > 0 && existingRoleCheck.rows[0].role_name == 'owner') {
                        await client.query('ROLLBACK');
                        return returnRes(res, 400, {
                            success: false,
                            error: 'ALREADY_OWNER',
                            message: 'You are the owner of this restaurant. You cannot join your own restaurant as staff.'
                        });
                    }
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
                            SET status = 'accepted'
                        WHERE token=$1`,
                        [token]
                    );
                    await client.query('COMMIT');

                    const response = await getUserFullDetail(id);
                    const authToken = createToken({ id: response?.userInfo?.id, role: response?.role, res_id: response?.activeResId, email: response?.userInfo?.email });
                    res.cookie('authToken', authToken, {
                        httpOnly: true,
                        secure: isProduction,
                        sameSite: isProduction ? 'none' : 'lax',
                        maxAge: 1000 * 60 * 60 * 24 * 7
                    });
                    return returnRes(res, 200, response);
                }
                else if (req_type == 'decline') {
                    await client.query(
                        `UPDATE tokens
                            SET status = 'declined'
                        WHERE token=$1`,
                        [token]
                    );
                    await client.query('COMMIT');
                    return returnRes(res, 200, {
                        success: true,
                        error: false,
                        message: 'Invitation declined.'
                    });
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

    // controller function to get invitaion history
    getInviteHistory = async (req, res) => {
        const { res_id, role } = req.user;
        const permissions = req.permissions;

        try {
            if (role !== 'owner' && !permissions?.['can_manage_staff']) {
                return returnRes(res, 403, {
                    success: false,
                    error: 'ACCESS_DENIED',
                    message: 'You do not have permission to create or manage the Menu.'
                });
            }
            
            const result = await db.query(
                `SELECT
                    id,
                    status,
                    role_name,
                    sent_to,
                    created_at,
                    expires_at
                FROM  tokens
                WHERE res_id = $1
                ORDER BY id DESC`,
                [res_id]
            );

            return returnRes(res,200,{
                success:true,
                error:false,
                inviteList:result.rows
            });

        } catch (err) {
            console.log('getting token history error: ',err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
    }

    // Controller function to get stafflist of restaraunts
    getStaffList = async (req, res) => {
        const { id, role, res_id } = req.user;
        const permissions = req.permissions;
        const {emp_query='',emp_role='all'} = req.query;
        try {
            if (permissions?.can_manage_staff || role == 'owner') {

                const result = await db.query(
                    `SELECT 
                        rl.id,
                        rl.role_name,
                        rl.res_id,
                        rl.user_id,
                        json_build_object(
                            'id',u.id,
                            'name',u.name,
                            'image',u.image,
                            'email',u.email
                        ) AS user_data,
                        rl.permissions,
                        rl.created_at

                    FROM roles AS rl
                    JOIN users AS u
                    ON rl.user_id = u.id

                    WHERE rl.res_id = $1
                        AND rl.user_id != $2
                        AND rl.role_name !='owner'
                        AND rl.is_active=TRUE
                        AND (u.name ILIKE ($3::TEXT || '%') 
                            OR (u.email ILIKE ($3::TEXT||'%')))
                        AND (rl.role_name=$4 OR $4='all')
                    `,
                    [res_id, id,emp_query,emp_role]
                );
                const staff_list = result.rows;
                return returnRes(res, 200, {
                    success: true,
                    staff_list: staff_list,
                    message: staff_list.length === 0 ? 'No staff members found.' : 'Staff list fetched successfully.'
                });
            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to view or manage the staff list.'
            });

        } catch (err) {
            console.error('Staff list error:', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
    }

}

export default new Staff();