import { returnRes } from "../utils/returnRes.js";
import db from '..//utils/db.js';

class Table {

    createTableZone = async (req, res) => {
        const { res_id, role } = req.user;
        const permissions = req.permissions;
        const { zone_name, hourly_charge = 0, tablesArray } = req.body;

        try {
            // other input verification here----

            if (permissions?.['manage_restaurant_setup'] || role == 'owner') {
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

                    tablesArray.map(async(t)=>{
                        await this.createTable(t,zone_id);
                    });
                }

                return returnRes(res,200,{
                    success:true,
                    message:'Table zone created successfully.',
                    zone_id:zone_id
                });
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
    getTableZones =async(req,res)=>{
        const {res_id} = req.user;

        try {
            if(!res_id){
                return returnRes(res,404,{
                    success:false,
                    error:'RESTAURANT_NOT_FOUND',
                    message:'Restaurant id not found,\nPlease join a restaurant.'
                });
            }
            const result =await db.query(
                `SELECT 
                    z.id,
                    z.zone_name,
                    z.hourly_charge,
                    (
                        SELECT COUNT(t.id)
                        FROM tables AS t
                        WHERE t.zone_id = z.id

                    ) AS table_count
                FROM table_zone AS z
                WHERE z.res_id = $1
                    AND z.is_active = TRUE
                GROUP BY z.id
                `,[res_id]
            );
            return returnRes(res,200,{
                success:true,
                error:false,
                table_zones : result.rows
            });

        } catch (err) {
            console.log('Get_table_zone_err: ',err);
            return returnRes(res,500,{
                success:false,
                error:'INTERNAL_SERVER_ERROR',
                message:'Internal Server Error!'
            });
        }
    }
    // helper function for create or add tables under zone.
    createTable = async(data)=>{
        
    }
}

export default new Table();