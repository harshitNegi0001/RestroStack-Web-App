import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';

dotenv.config();

export const tokenOpener = async (req, res, next) => {
    if (!req.cookies || !req.cookies.authToken) {
        return returnRes(res, 401, {
            success: false,
            message: 'Authentication required.',
            error: 'UNAUTHORIZED'
        });
    }
    else {
        const token = req.cookies.authToken;
        const token_secret = process.env.JWT_SECRET;
        try {
            const decodedToken = jwt.verify(token, token_secret);
            const { id, role, email, res_id } = decodedToken;

            const userResult = await db.query(
                `SELECT
                    acc_status
                FROM users
                WHERE
                    id=$1`,
                [id]
            );

            if (userResult.rows.length == 0) {
                return returnRes(res, 404, {
                    success: false,
                    message: 'User account not found.',
                    error: 'USER_NOT_FOUND'
                });
            }
            const user = userResult.rows[0];
            if (user.acc_status!='active') {
                return returnRes(res, 403, {
                success: true,
                message: `Your account is ${user.acc_status}. Please contact support.`,
                error: 'ACCOUNT_RESTRICTED'
            });
            }

            req.user={
                id,
                role,
                res_id,
                email
            }
            next();
        } catch (error) {

            const message = error.name === 'TokenExpiredError' 
            ? 'Your session has expired. Please log in again.' 
            : 'Invalid session. Please log in again.';
            return returnRes(res, 401, {
                success: false,
                message: message,
                error: 'INVALID_OR_EXPIRED_TOKEN'
            })
        }
    }
}
