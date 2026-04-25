import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import { defaultPermisson } from "../utils/defaultPermission.js";
import { uploadImage } from "../utils/uploadImage.js";
import { getUserFullDetail } from "../utils/getUserFullDetail.js";
import dotenv from 'dotenv';
import createToken from "../utils/createToken.js";

dotenv.config();

const isProduction = process.env.NODE_ENV == 'production';

class Restaurant {
    createNewRes = async (req, res) => {
        const { id } = req.user;
        const { res_name, full_location, address, phone_no, email, gstin, fssai_no, currency, res_type, tax_prec, opening_timeing } = req.body;
        const { city, state, country, latitude, longitude } = address;

        const client = await db.connect();
        try {
            await client.query('BEGIN');
            const result = await client.query(
                `INSERT INTO restaurants(
                    owner_id,
                    email,
                    res_name,
                    res_type,
                    contact_no,
                    full_address,
                    city,
                    state,
                    country,
                    latitude,
                    longitude,
                    gstin,
                    fssai_no,
                    gst_tax,
                    currency,
                    opening_timeing
                )
                VALUES(
                    $1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16
                )
                RETURNING id`,
                [id, email, res_name, res_type, phone_no, full_location, city, state, country, latitude, longitude, gstin, fssai_no, tax_prec, currency, opening_timeing]
            );

            const userPermissions = defaultPermisson['owner'];
            const resId = result.rows[0]?.id;
            const roleResult = await client.query(
                `INSERT INTO roles(
                    role_name,
                    res_id,
                    user_id,
                    permissions
                )
                VALUES(
                    $1,$2,$3,$4
                )
                RETURNING id`,
                ['owner', resId, id, userPermissions]
            );

            const role_id = roleResult.rows[0]?.id;

            await client.query(
                `UPDATE users
                SET
                    last_role_id=$1
                WHERE id = $2`,
                [role_id, id]
            )
            await client.query('COMMIT');

            const response = await getUserFullDetail(id, resId);
            const token = createToken({ id: response?.userInfo?.id, role: response.role, res_id: response.activeResId, email: response?.userInfo?.email });
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7
            });
            return returnRes(res, 201, {
                ...response,
                message: 'Restaurant created successfully!',
            });

        } catch (err) {
            console.log(err);
            await client.query('ROLLBACK');
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });
        }
        finally {
            client.release();
        }
    }

    getCurrRestaurant = async (req, res) => {
        const { id, role, res_id } = req.user;
        const permissions = req.permissions;
        // const {} = req.query;

        try {
            if (permissions?.['manage_restaurant_setup'] || role == 'owner') {
                const result = await db.query(
                    `SELECT 
                        id,
                        res_name,
                        res_logo,
                        email,
                        contact_no,
                        full_address,
                        json_build_object(
                            'city',city,
                            'state',state,
                            'country',country,
                            'latitude',latitude,
                            'longitude',longitude
                        ) AS address,
                        verified_email,
                        res_type,
                        res_status,
                        opening_timeing,
                        gstin,
                        fssai_no,
                        gst_tax,
                        currency,
                        updated_at,
                        created_at
                    FROM restaurants 
                    WHERE id=$1
                    `,
                    [res_id]
                );

                const resData = result.rows[0];

                return returnRes(res, 200, {
                    success: true,
                    error: false,
                    message: 'Restaurant data fetched successfully!',
                    resData
                });
            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to view or manage the staff list.'
            });
        } catch (err) {
            console.log(err);
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });
        }
    }

    // Controller function to edit restaurant details.
    editRestaurantDetails = async (req, res) => {
        const { id, role, res_id } = req.user;
        const permissions = req.permissions;
        const { type, res_name, email, contact_no, full_address } = req.body;

        try {
            if (permissions?.['manage_restaurant_setup'] || role == 'owner') {
                if (type == 'identity') {
                    let imageUrl = req.body.logo || null;
                    if (req.file) {
                        try {
                            imageUrl = await uploadImage(req);
                        } catch (uploadErr) {
                            console.log('Image upload error:', uploadErr);
                            return returnRes(res, 500, {
                                success: false,
                                error: 'UPLOAD_FAILED',
                                message: 'Failed to upload image to the server.'
                            });
                        }
                    }
                    const checkRestaurant = await db.query(
                        `SELECT
                            email,
                            verified_email
                        FROM restaurants
                        WHERE id =$1`,
                        [res_id]
                    );
                    const old_res_email = checkRestaurant?.rows[0]?.email;
                    const isVerified = checkRestaurant?.rows[0]?.verified_email;
                    let parsedAddress = {};
                    if (req.body.address) {
                        parsedAddress = typeof req.body.address === 'string' ? JSON.parse(req.body.address) : req.body.address;
                    }
                    const { city, state, country, latitude, longitude } = parsedAddress;

                    const updatedData = await db.query(
                        `UPDATE restaurants
                        SET 
                            res_name = $1,
                            email = $2,
                            res_logo = $3,
                            contact_no =$4,
                            full_address =$5,
                            city = $6,
                            state=$7,
                            country=$8,
                            latitude=$9,
                            longitude=$10,
                            updated_at=now(),
                            verified_email =
                                CASE 
                                    WHEN $12 THEN TRUE
                                    ELSE FALSE
                                END
                        WHERE id=$11
                        RETURNING
                            res_name,
                            res_logo,
                            email,
                            contact_no,
                            full_address,
                            json_build_object(
                                'city',city,
                                'state',state,
                                'country',country,
                                'latitude',latitude,
                                'longitude',longitude
                            ) AS address,
                            verified_email
                            `,
                        [res_name, email, imageUrl, contact_no, full_address, city, state, country, latitude, longitude, res_id,(old_res_email == email && isVerified)]
                    );

                    return returnRes(res, 200, {
                        success: true,
                        message: 'Restaurant details updated successfully!',
                        resData: updatedData.rows[0]
                    });
                }

                return returnRes(res, 400, {
                    success: false,
                    message: 'Invalid update type provided.'
                });
            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to view or manage the staff list.'
            });
        } catch (err) {
            console.log(err);
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });
        }
    }
}

export default new Restaurant();