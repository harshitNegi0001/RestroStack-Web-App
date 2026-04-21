import { returnRes } from "../utils/returnRes.js";
import db from '..//utils/db.js';

class Table {

    createTableZone = async (req, res) => {
        const { id, res_id, role } = req.user;
        const permissions = req.permissions;
        const { zone_name, hourly_prize = 0, tablesArray } = req.body;

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
                        $1,$2,43
                    )
                    RETURNING id`, [res_id, zone_name, hourly_prize]
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

    // helper function for create or add tables under zone.
    createTable = async(data)=>{
        
    }
}

export default new Table();