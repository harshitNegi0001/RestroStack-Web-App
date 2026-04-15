import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import { defaultPermisson } from "../utils/defaultPermission.js";
import { getUserInfo } from "../utils/getUserInfo.js";
import { getRoles } from "../utils/getRoles.js";
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

            const userInfo = await getUserInfo(id);
            const roles = await getRoles(id);
            const activeRole = (roles.length == 0) ? null : (roles.length == 1) ? roles[0].role_name : roles.find(role => role.id == userInfo.last_role_id)?.role_name;
            const permissions = (roles.length == 0) ? {} : (roles.length == 1) ? roles[0].permissions : roles.find(role => role.id == userInfo.last_role_id)?.permissions;

            return returnRes(res, 201, {
                success: true,
                error: false,
                message: 'Restaurant created successfully!',
                userInfo: userInfo,
                role: activeRole,
                rolesList: roles,
                permissions,
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

    editRestaurantDetails = async (req, res) => {
        const { id, role, res_id } = req.user;
        const permissions = req.permissions;
        const { type, data } = req.query;

        try {
            if (permissions?.['manage_restaurant_setup'] || role == 'owner') {
                if (type == 'identity') {
                    const { res_name, email, contact_no, address, full_location, logo } = data;
                    const { city, state, country, latitude, longitude } = address;
                    const res_logo = logo||null;
                    await db.query(
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
                            longitude=$10
                        WHERE id=$11
                            `,
                        [res_name, email, logo, contact_no, full_location, city, state, country, latitude, longitude, res_id]
                    );
                }
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