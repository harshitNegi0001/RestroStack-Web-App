import { returnRes } from "../utils/returnRes.js";
import db from '..//utils/db.js';

class Table {

    createTableZone = async (req, res) => {
        const { res_id, role } = req.user;
        const permissions = req.permissions;
        const { type } = req.body;

        try {
            // other input validation And varifications here----

            if (permissions?.['manage_restaurant_setup'] || role == 'owner') {
                if (type == 'create') {
                    const { zone_name, hourly_charge = 0, tablesArray } = req.body;

                    const result = await db.query(
                        `INSERT INTO 
                    table_zone(
                        res_id,
                        zone_name,
                        hourly_charge
                    )
                    VALUES (
                        $1,$2,$3
                    )
                    RETURNING id`, [res_id, zone_name, hourly_charge]
                    );

                    const zone_id = result.rows[0]?.id;
                    if (tablesArray?.length > 0) {

                        if (!zone_id) {
                            return returnRes(res, 500, {
                                success: false,
                                message: 'Failed to create table zone!',
                                error: 'FAILED_TO_CREATE_TABLE_ZONE'
                            });
                        }

                        tablesArray.map(async (t) => {
                            await this.createTable(t, zone_id);
                        });
                    }

                    return returnRes(res, 200, {
                        success: true,
                        error:false,
                        message: 'Table zone created successfully.',
                        zone_data: {
                            id:zone_id
                        }
                    });
                }
                else if (type == 'edit') {
                    const { zone_name, hourly_charge = 0, zone_id } = req.body;

                    await db.query(
                        `UPDATE table_zone
                        SET 
                            zone_name=$1,
                            hourly_charge = $2
                        WHERE id = $3`,
                        [zone_name, hourly_charge, zone_id]
                    );
                    
                    return returnRes(res,200,{
                        success:true,
                        error:false,
                        message:'Zone updated.',
                        zone_data:{
                            id:zone_id,
                            zone_name:zone_name,
                            hourly_charge:hourly_charge
                        }
                    })
                }
                else {
                    return returnRes(res, 404, {
                        success: false,
                        error: 'OPERATION_TYPE_NOT_FOUND',
                        message: 'Operation type not specified or not availible to perform.'
                    });
                }

            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to view or manage the staff list.'
            });
        } catch (err) {
            console.log('Creating_Table_Error', err);
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });
        }
    }
    getTableZones = async (req, res) => {
        const { res_id } = req.user;

        try {
            if (!res_id) {
                return returnRes(res, 404, {
                    success: false,
                    error: 'RESTAURANT_NOT_FOUND',
                    message: 'Restaurant id not found,\nPlease join a restaurant.'
                });
            }
            const result = await db.query(
                `SELECT 
                    z.id,
                    z.zone_name,
                    z.hourly_charge,
                    (
                        SELECT COUNT(t.id)
                        FROM tables AS t
                        WHERE t.zone_id = z.id
                            AND t.is_active = TRUE
                    ) AS table_count
                FROM table_zone AS z
                WHERE z.res_id = $1
                    AND z.is_active = TRUE
                GROUP BY z.id
                ORDER BY z.id DESC
                `, [res_id]
            );
            return returnRes(res, 200, {
                success: true,
                error: false,
                table_zones: result.rows
            });

        } catch (err) {
            console.log('Get_table_zone_err: ', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
    }

    // controller function for deleting table zone.
    removeZone = async(req,res)=>{
        const {res_id,role} = req.user;
        const permissions = req.permissions;
        const {zone_id} =req.body;
        const client =await db.connect();
        try {
            if (permissions?.['manage_restaurant_setup'] || role == 'owner') {
                await client.query('BEGIN')
                const res_check =await client.query(
                    `SELECT 
                        res_id,
                        is_active
                    FROM table_zone
                    WHERE id= $1`,
                    [zone_id]
                );

                if(res_check.rowCount==0||!res_check.rows?.[0]?.is_active||res_check.rows?.[0]?.res_id!=res_id){
                    await client.query('ROLLBACK');
                    return returnRes(res, 404, {
                        success: false,
                        error: 'ZONE_NOT_FOUND_OR_INVALID',
                        message: 'The selected table zone does not exist, is inactive, or belongs to another restaurant.'
                    });
                }

                await client.query(
                    `UPDATE table_zone
                    SET 
                        is_active=FALSE
                    WHERE id=$1
                    `,[zone_id]
                );

                await client.query(
                    `UPDATE tables
                    SET
                        is_active = FALSE
                    WHERE zone_id =$1`,
                    [zone_id]
                );

                await client.query('COMMIT');

                return returnRes(res,200,{
                    success:true,
                    error:false,
                    message:'Zone has been removed.'
                });
                
            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to view or manage the staff list.'
            });
        } catch (err) {
            client.query('ROLLBACK');
            console.log('Get_table_zone_err: ', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
        finally{
            client.release();
        }
    }
    // helper function for create or add tables under zone.
    createTable = async (data) => {

    }
}

export default new Table();