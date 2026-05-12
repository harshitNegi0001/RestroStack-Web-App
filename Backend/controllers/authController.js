import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import bcrypt from 'bcrypt';
import { getUserInfo } from "../utils/getUserInfo.js";
import createToken from "../utils/createToken.js";
import dotenv from 'dotenv';
import { createOtpMail } from "../utils/otpMail.js";
import { sendEmail } from "../config/sendMail.js";
import { getRoles } from "../utils/getRoles.js";
import { getUserFullDetail } from "../utils/getUserFullDetail.js";

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
                `SELECT 
                email,
                verified_email
                FROM users
                WHERE email = $1`,
                [email]
            );
            const isExists = emailCheck.rows.length > 0;
            const isVerified = isExists ? emailCheck.rows[0].verified_email : false;
            if (isExists && isVerified) {
                return returnRes(res, 409, {
                    error: 'Email already exists',
                    message: 'An account with this email already exists. Please use a different email or log in.'
                });
            }

            const hashedPass = await bcrypt.hash(pass, 10);
            let user;
            if (isExists && !isVerified) {
                // update hashpass
                user = await db.query(
                    `UPDATE users
                    SET name =$1,
                        hashed_pass =$2,
                        created_at =now()
                    WHERE email =$3
                    RETURNING id`,
                    [name, hashedPass, email]
                )
            }
            else {
                user = await db.query(
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
            }


            const userInfo = await getUserInfo(user.rows[0].id);

            await this.generateOtp(email, 'Verify Email', 'Please use the following code to verify your email address.');

            return returnRes(res, 201, { success: true, error: false, message: 'Account created and email verification otp sent', userInfo: userInfo });


        } catch (err) {
            if (err.status) {
                return returnRes(res, err.status, { message: err.message, error: err.error });
            }
            console.log(err);
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });
        }
    }
    // helper function to generate and send otp
    generateOtp = async (email, subject, cstmMsg) => {


        const emailCheck = await db.query(
            `SELECT 1 FROM users
                WHERE email = $1`,
            [email]
        );
        const res_email_check = await db.query(
            `SELECT id
                FROM restaurants
                WHERE email =$1
                `, [email]
        );
        const isExistEmail = emailCheck.rows.length > 0 || res_email_check.rows.length > 0;

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
                    throw { status: 429, message: 'You’ve reached today’s OTP request limit. Please try again tomorrow.', error: 'TOO_MANY_REQUESTS' }
                }
                const lastSentAt = new Date(otp_rate_check.rows[0].last_sent_at);
                const currentTime = new Date();
                const timeDiff = currentTime - lastSentAt;
                const threeMinutes = 3 * 60 * 1000;
                if (timeDiff < threeMinutes) {
                    const remainingSecs = Math.ceil((threeMinutes - timeDiff) / 1000);
                    throw { status: 429, message: `Please wait ${remainingSecs} seconds before requesting a new OTP.`, error: 'TOO_MANY_REQUESTS' }
                }
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            const otp_hash = await bcrypt.hash(String(otp), 10);

            const message = createOtpMail(otp, subject, cstmMsg);
            await sendEmail(email, subject, message);


            await db.query(
                `INSERT INTO 
                    rate_limit_count
                    (
                        identifier,
                        identifier_type,
                        action_type,
                        count,
                        window_start,
                        last_sent_at
                    )
                    VALUES(
                        $1,'email','otp',1,now(),now()
                    )
                    ON CONFLICT (identifier,action_type)
                    DO
                        UPDATE 
                        SET 
                            count =
                                CASE 
                                    WHEN rate_limit_count.window_start::DATE=CURRENT_DATE
                                    THEN rate_limit_count.count + 1
                                    ELSE 1
                                END,
                            window_start =
                                CASE
                                    WHEN rate_limit_count.window_start::DATE=CURRENT_DATE
                                    THEN rate_limit_count.window_start
                                    ELSE  now()
                                END,
                            last_sent_at = now()`,
                [email]
            );
            const otp_type = (subject == 'Verify Email') ? 'verification' : (subject == 'Verify Restaurant Email') ? 'res_email_verification' : 'reset_pass'
            await db.query(
                `INSERT INTO 
                    otp_table(
                        identifier,
                        identifier_type,
                        hashed_otp,
                        otp_type
                    )
                    VALUES(
                        $1,'email',$2,$3
                    )
                    ON CONFLICT (identifier,otp_type)
                        DO
                            UPDATE 
                            SET
                                hashed_otp=EXCLUDED.hashed_otp,
                                status='pending',
                                expires_at = now()+INTERVAL '10 minutes',
                                created_at = now(),
                                attempts_count=0
                    `,
                [email, otp_hash, otp_type]
            );
            return;
        }
        else {
            throw { status: 404, message: 'No user found with this email.', error: 'USER_NOT_FOUND' }
        }

    }

    // controller function to verify otp
    verifyOtp = async (req, res) => {
        let { email, otp, otp_type = 'verification', res_id } = req.body;
        email = email.trim();
        otp = otp.trim();
        otp_type = otp_type.trim();
        try {
            const otp_check = await db.query(
                `SELECT * 
                FROM otp_table
                WHERE identifier=$1
                    AND identifier_type='email'
                    AND otp_type=$2
                    `,
                [email, otp_type]
            );
            const user_check = await db.query(
                `SELECT id
                FROM users
                WHERE email=$1
                `, [email]
            );
            const res_email_check = await db.query(
                `SELECT id
                FROM restaurants
                WHERE email =$1
                `, [email]
            );
            const isExistEmail = user_check.rows.length > 0 || res_email_check.rows.length > 0;
            if (!isExistEmail) {
                return returnRes(res, 404, { success: false, message: 'No user found with this email.', error: 'USER_NOT_FOUND' });
            }
            const otp_data = otp_check.rows?.[0];

            if (otp_check.rows.length == 0 || otp_data?.status == 'expired' || otp_data?.status == 'verified' || otp_data?.status == 'failed') {
                return returnRes(res, 400, { success: false, message: 'The OTP has either expired or was never requested.\nPlease trigger a new verification email.', error: 'INVALID_OR_EXPIRED_OTP' });
            }
            const expiresAt = new Date(otp_data.expires_at);
            const currentTime = new Date();
            if (expiresAt <= currentTime) {
                await db.query(
                    `UPDATE otp_table
                    SET 
                        status='expired'
                    WHERE identifier=$1
                        AND identifier_type='email'
                        AND otp_type=$2 `,
                    [email, otp_type]
                );
                return returnRes(res, 400, { success: false, message: 'The OTP has either expired or was never requested.\nPlease trigger a new verification email.', error: 'INVALID_OR_EXPIRED_OTP' });
            }

            const is_correct = await bcrypt.compare(otp, otp_data.hashed_otp);
            if (is_correct) {

                await db.query(
                    `UPDATE otp_table
                    SET 
                        status='verified'
                    WHERE identifier=$1
                        AND identifier_type='email'
                        AND otp_type=$2 `,
                    [email, otp_type]
                );
                const userId = user_check?.rows[0]?.id;
                if (otp_type == 'verification') {
                    await db.query(
                        `UPDATE users
                    SET 
                        verified_email=TRUE
                    WHERE id=$1`,
                        [userId]
                    );

                    const userInfo = await getUserInfo(userId);
                    const roles = await getRoles(userId);
                    const activeRole = (roles.length == 0) ? null : (roles.length == 1) ? roles[0].role_name : roles.find(role => role.id == userInfo.last_role_id)?.role_name;
                    const activeResId = (roles.length == 0) ? null : (roles.length == 1) ? roles[0].res_id : roles.find(role => role.id == userInfo.last_role_id)?.res_id;
                    const permissions = (roles.length == 0) ? {} : (roles.length == 1) ? roles[0].permissions : roles.find(role => role.id == userInfo.last_role_id)?.permissions;

                    const token = createToken({ id: userInfo.id, role: activeRole, res_id: activeResId, email: userInfo.email });

                    res.cookie('authToken', token, {
                        httpOnly: true,
                        secure: isProduction,
                        sameSite: isProduction ? 'none' : 'lax',
                        maxAge: 1000 * 60 * 60 * 24 * 7
                    });
                }
                else if (otp_type == 'res_email_verification') {
                    await db.query(
                        `UPDATE restaurants
                        SET 
                            verified_email = TRUE
                            WHERE  email = $1 AND id=$2`,
                        [email, res_id]
                    );
                }

                return returnRes(res, 200, { success: true, error: false, isVerified: true, message: 'Email verification successful. Your account is now active.' });

            }
            else {
                await db.query(
                    `UPDATE otp_table
                    SET attempts_count = attempts_count+1
                    WHERE identifier=$1
                        AND identifier_type='email'
                        AND otp_type=$2`,
                    [email, otp_type]
                );
                if (otp_data.attempts_count + 1 >= 5) {
                    await db.query(
                        `UPDATE otp_table
                    SET 
                        status='failed'
                    WHERE identifier=$1
                        AND identifier_type='email'
                        AND otp_type=$2 `,
                        [email, otp_type]
                    );
                    return returnRes(res, 429, { success: false, message: 'Verification failed too many times. For security reasons, this OTP is now invalid. \nPlease request a new one.', error: 'TOO_MANY_ATTEMPTS' });
                }
                return returnRes(res, 401, { success: false, message: 'The OTP entered is incorrect.\nPlease check the code and try again.', error: 'INVALID_OTP' });
            }

        } catch (err) {
            console.log(err);
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });
        }
    }

    // Controller function to ask for otp
    resendOtp = async (req, res) => {
        let { email, otp_type = "verification" } = req.body;
        email = email.trim();
        otp_type = otp_type.trim();


        try {
            const subject = otp_type == 'verification' ? 'Verify Email' : (otp_type == 'res_email_verification') ? 'Verify Restaurant Email' : 'Reset your password'
            const cstm_msg = otp_type == 'verification' || otp_type == 'res_email_verification' ? 'Please use the following code to verify your email address.' : 'Please use the following code to verify your email address and reset password'
            await this.generateOtp(email, subject, cstm_msg);
            return returnRes(res, 200, { success: true, error: false, message: 'Verification otp sent.' });

        } catch (err) {
            if (err.status) {
                return returnRes(res, err.status, { message: err.message, error: err.error });
            }
            console.log(err);
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });

        }
    }

    // controller function to login user
    loginUser = async (req, res) => {
        let { email, pass } = req.body;
        email = email.trim();
        pass = pass.trim();

        try {
            const user = await db.query(
                `SELECT 
                    id,
                    email,
                    hashed_pass,
                    verified_email
                FROM users
                WHERE email = $1`,
                [email]
            );
            if (user.rows.length == 0) {
                return returnRes(res, 401, {
                    success: false,
                    message: 'Invalid email or password. Please check your credentials and try again.',
                    error: 'UNAUTHORIZED_ACCESS'
                });
            }
            const user_data = user.rows[0];
            const isMatched = await bcrypt.compare(pass, user_data.hashed_pass);

            if (isMatched) {
                const verified_email = user_data.verified_email;
                const userInfo = await getUserInfo(user_data.id);
                if (verified_email) {
                    const roles = await getRoles(user_data.id);
                    const activeRole = (roles.length == 0) ? null : (roles.length == 1) ? roles[0].role_name : roles.find(role => role.id == userInfo.last_role_id)?.role_name;
                    const activeResId = (roles.length == 0) ? null : (roles.length == 1) ? roles[0].res_id : roles.find(role => role.id == userInfo.last_role_id)?.res_id;
                    const permissions = (roles.length == 0) ? {} : (roles.length == 1) ? roles[0].permissions : roles.find(role => role.id == userInfo.last_role_id)?.permissions;

                    const token = createToken({ id: userInfo.id, role: activeRole, res_id: activeResId, email: userInfo.email });
                    res.cookie('authToken', token, {
                        httpOnly: true,
                        secure: isProduction,
                        sameSite: isProduction ? 'none' : 'lax',
                        maxAge: 1000 * 60 * 60 * 24 * 7
                    });
                    if (roles.length == 0) {

                        return returnRes(res, 200, {
                            success: true,
                            error: false,
                            isVerified: true,
                            message: 'Login successful! \nWelcome back!',
                            userInfo: userInfo,
                            rolesList: roles,
                            activeResId,
                            permissions,
                            role: activeRole,
                            redirectTo: (userInfo.is_onboarded) ? 'setup-user' : 'job-portal'
                        });
                    }

                    return returnRes(res, 200, {
                        success: true,
                        error: false,
                        isVerified: true,
                        message: 'Login successful! \nWelcome back!',
                        userInfo: userInfo,
                        role: activeRole,
                        rolesList: roles,
                        permissions,
                        redirectTo: 'dashboard'
                    });

                }
                else {
                    return returnRes(res, 200, { success: true, error: false, isVerified: false, message: 'Your email address is not verified. \nPlease verify your email to access the dashboard.', userInfo: userInfo });
                }
            }

            return returnRes(res, 401, {
                success: false,
                message: 'Invalid email or password. Please check your credentials and try again.',
                error: 'UNAUTHORIZED_ACCESS'
            });
        } catch (err) {
            console.log(err)
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });

        }
    }

    // controller function to logout user
    logout = async (req, res) => {

        res.cookie('authToken', null, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 0
        });
        return returnRes(res, 200, {
            success: true,
            error: false,
            message: 'Loged out successfully.'
        })
    }

    // controller function to get intial information for client
    getMe = async (req, res) => {

        const { id, res_id } = req.user;
        try {
            const response = await getUserFullDetail(id, res_id);
            return returnRes(res, 200, response);
        } catch (err) {
            console.log('get me error:', err);
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });
        }
    }

    changeActiveRole = async (req, res) => {
        const { id } = req.user;
        const { newRoleId } = req.body;

        try {
            const roleCheck = await db.query(
                `SELECT 
                    user_id,
                    is_active,
                    res_id
                FROM roles
                WHERE id=$1
                `,
                [newRoleId]
            );

            if (roleCheck.rows.length == 0) {
                return returnRes(res, 404, {
                    success: false,
                    error: 'ROLE_NOT_FOUND',
                    message: 'The selected role does not exist.'
                });
            }

            const userId = roleCheck.rows[0].user_id;
            const isActive = roleCheck.rows[0].is_active;
            const res_id = roleCheck.rows[0].res_id;
            if (userId != id) {
                return returnRes(res, 403, {
                    success: false,
                    error: 'UNAUTHORIZED_ROLE',
                    message: 'You do not have permission to access this restaurant or role.'
                });
            }

            if (!isActive) {
                return returnRes(res, 403, {
                    success: false,
                    error: 'INACTIVE_ROLE',
                    message: 'Your access to this role has been suspended or deactivated.'
                });
            }

            await db.query(
                `UPDATE users
                SET last_role_id =$1
                WHERE  id= $2`,
                [newRoleId, id]
            );

            const response = await getUserFullDetail(id, res_id);

            const token = createToken({ id: response?.userInfo?.id, role: response.role, res_id: response.activeResId, email: response?.userInfo?.email });
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7
            });
            return returnRes(res, 200, response);
        } catch (err) {
            console.error("CHANGE_ROLE_ERROR:", err);
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });
        }
    }
}

export default new Auth();