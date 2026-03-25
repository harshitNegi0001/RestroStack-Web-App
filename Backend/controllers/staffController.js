import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import crypto from 'crypto';
import { createStaffInvitationMain } from "../utils/inviteStaffMail.js";
import { sendEmail } from "../config/sendMail.js";


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
                    const user =await db.query(
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
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Only owners are authorized to access this resource.'
            });
        }
    }



}

export default new Staff();