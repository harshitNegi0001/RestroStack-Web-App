import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import bcrypt from 'bcrypt';
import { getUserInfo } from "../utils/getUserInfo.js";

class Auth {
    registerUser = async (req, res) => {
        let { email, name, pass } = req.body;
        email = email.trim();
        name = name.trim();
        pass = pass.trim();

        try {
            const emailCheck = await db.query(
                `SELECT 1
                FROM users
                WHERE email = $1`,
                [email]
            );

            if (emailCheck.rows.length > 0) {
                return returnRes(res, 409, {
                    error: 'Email already exists',
                    message: 'An account with this email already exists. Please use a different email or log in.'
                });
            }

            const hashedPass = await bcrypt.hash(pass, 10);

            const user = await db.query(
                `INSERT INTO users
                (
                    email,
                    name,
                    hashed_pass
                )
                VALUES
                (
                    $1,$2,$3
                )
                RETURNING id
                `,
                [email, name, hashedPass]
            );

            const userInfo = await getUserInfo(res,user.rows[0].id);

            return returnRes(res,200, { success: true, error: false, message: 'Account created and email verification otp sent' ,userInfo:userInfo});


        } catch (err) {
            return returnRes(res, 500, { success: false, error: true, message: 'Internal Server Error!',error:'Internal eerver error!' });
        }
    }
}

export default new Auth();