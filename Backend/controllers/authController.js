import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import bcrypt from 'bcrypt';
import { getUserInfo } from "../utils/getUserInfo.js";
import createToken from "../utils/createToken.js";
import dotenv from 'dotenv';
import { createOtpMail } from "../utils/otpMail.js";
import { sendEmail } from "../config/sendMail.js";

dotenv.config();

const isProduction = process.env.NODE_ENV == 'production';
class Auth {
    // controller function for register new user.
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

            const userInfo = await getUserInfo(res, user.rows[0].id);

            const token = createToken({ id: userInfo, role: userInfo.role, email: userInfo.email });

            res.cookie('authToken', token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            await this.generateOtp(res,email,'Verify email','Please use the following code to verify your email address.');



            return returnRes(res, 200, { success: true, error: false, message: 'Account created and email verification otp sent', userInfo: userInfo });


        } catch (err) {
            return returnRes(res, 500, { success: false, error: true, message: 'Internal Server Error!', error: 'Internal server error!' });
        }
    }
    // helper function to generate and send otp
    generateOtp = async (res, email,subject,cstmMsg) => {
        try {

            const emailCheck = await db.query(
                `SELECT 1 FROM users
                WHERE email = $1`,
                [email]
            );
            const isExistEmail = emailCheck.rows.length > 0;

            if (isExistEmail) {
                const otp_rate_check = await db.query(
                    `SELECT 
                        count,
                        last_sent_at
                        
                    FROM rate_limit_count
                    WHERE identifier =$1
                        AND identifier_type='email'
                        AND action_type = 'otp'
                        AND window_start :: DATE = CURRENT_DATE
                    `,
                    [email]
                );

                if (otp_rate_check.rows.length > 0) {
                    if (otp_rate_check.rows[0].count >= 10) {
                        return returnRes(res, 429, { success: false, error: true, message: 'You’ve reached today’s OTP request limit. Please try again tomorrow.', error: 'Too Many Requests' });
                    }
                    const lastSentAt = new Date(otp_rate_check.rows[0].last_sent_at);
                    const currentTime = new Date();
                    const timeDiff = currentTime - lastSentAt;
                    const threeMinutes = 3 * 60 * 1000;
                    if (timeDiff < threeMinutes) {
                        const remainingSecs = Math.ceil((threeMinutes - timeDiff) / 1000);
                        return returnRes(res, 429, { success: false, error: true, message: `Please wait ${remainingSecs} seconds before requesting a new OTP.`, error: 'Too Many Requests' });
                    }
                }

                const otp = Math.floor(100000 + Math.random() * 900000);
                const otp_hash = await bcrypt.hash(String(otp), 10);

                const message = createOtpMail(otp,subject,cstmMsg);
                await sendEmail(email,subject,message);

            }
            else {
                return returnRes(res, 404, { success: false, error: true, message: 'No user found with this email.', error: 'User Not Found' });

            }
        } catch (err) {
            return returnRes(res, 500, { success: false, error: true, message: 'Internal Server Error!', error: 'Internal Server Error!' });

        }
    }
}

export default new Auth();