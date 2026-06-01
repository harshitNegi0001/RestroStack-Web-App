import { returnRes } from "../utils/returnRes.js";
import db from '..//utils/db.js';

class Table {
    // controller function for creating table zone and editing table zone.
    createTableZone = async (req, res) => {
        const { res_id, role } = req.user;
        const permissions = req.permissions;
        const { type } = req.body;
        const client = await db.connect();

        try {
            // other input validation And varifications here----

            if (permissions?.['manage_restaurant_setup'] || role == 'owner') {
                await client.query('BEGIN');
                if (type == 'create') {
                    const { zone_name, hourly_charge = 0, tablesArray } = req.body;

                    const zoneNameCheck = await client.query(
                        `SELECT 
                            1
                        FROM table_zone
                        WHERE zone_name = $1
                            AND res_id = $2
                            AND is_active = TRUE`,
                        [zone_name, res_id]
                    );

                    if (zoneNameCheck.rowCount > 0) {
                        await client.query('ROLLBACK');
                        return returnRes(res, 409, {
                            success: false,
                            error: 'ZONE_ALREADY_EXISTS',
                            message: `A zone with the name '${zone_name}' already exists. Please choose a different name.`
                        });
                    }

                    const result = await client.query(
                        `INSERT INTO 
                    table_zone(
                        res_id,
                        zone_name,
                        hourly_charge
                    )
                    VALUES (
                        $1,$2,$3
                    )
                    RETURNING id`, [res_id, zone_name, hourly_charge || 0]
                    );

                    const zone_id = result.rows[0]?.id;

                    if (tablesArray?.length > 0) {

                        if (!zone_id) {
                            await client.query('ROLLBACK');
                            return returnRes(res, 500, {
                                success: false,
                                message: 'Failed to create table zone!',
                                error: 'FAILED_TO_CREATE_TABLE_ZONE'
                            });
                        }
                        await this.createTable({
                            res_id,
                            zone_id,
                            zone_name,
                            tablesArray
                        }, client);
                    }
                    await client.query('COMMIT');
                    return returnRes(res, 200, {
                        success: true,
                        error: false,
                        message: 'Table zone created successfully.',
                        zone_data: {
                            id: zone_id,
                            table_count: tablesArray.reduce((sum, curr) => sum + Number(curr.quantity), 0)
                        }
                    });
                }
                else if (type == 'edit') {
                    const { zone_name, hourly_charge = 0, zone_id } = req.body;
                    const zoneCheck = await client.query(
                        `SELECT
                            1
                        FROM table_zone
                        WHERE id =$1
                            AND res_id = $2
                            AND is_active = TRUE`,
                        [zone_id, res_id]
                    );
                    if (zoneCheck.rowCount == 0) {
                        await client.query('ROLLBACK');
                        return returnRes(res, 404, {
                            success: false,
                            error: 'ZONE_NOT_FOUND',
                            message: 'The specified zone was not found or has been removed.'
                        });
                    }

                    await client.query(
                        `UPDATE table_zone
                        SET 
                            zone_name=$1,
                            hourly_charge = $2
                        WHERE id = $3`,
                        [zone_name, hourly_charge || 0, zone_id]
                    );
                    await client.query('COMMIT');
                    return returnRes(res, 200, {
                        success: true,
                        error: false,
                        message: 'Zone updated.',
                        zone_data: {
                            id: zone_id,
                            zone_name: zone_name,
                            hourly_charge: hourly_charge
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
            await client.query('ROLLBACK');
            return returnRes(res, 500, { success: false, message: 'Internal Server Error!', error: 'INTERNAL_SERVER_ERROR' });
        }
        finally {
            client.release();
        }
    }
    // helper function for create or add tables under zone.
    createTable = async (data, client) => {
        const { res_id, zone_id, zone_name, tablesArray } = data;
        try {
            const existingTables = await client.query(
                `SELECT
                    table_name
                FROM tables
                WHERE zone_id = $1`,
                [zone_id]
            );

            const existingNames = new Set(existingTables.rows.map(t => t.table_name));

            let placeholders = [];
            let values = [];
            let paramIndex = 1;
            let counter = 1;
            for (const t of tablesArray) {
                const quantity = parseInt(t.quantity) || 0;
                const capacity = parseInt(t.capacity) || 4;
                for (let i = 0; i < quantity; i++) {

                    let tableName = `T-${counter}(${zone_name})`;

                    while (existingNames.has(tableName)) {
                        counter++;
                        tableName = `T-${counter} (${zone_name})`;
                    }
                    existingNames.add(tableName);
                    placeholders.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3})`);
                    values.push(res_id, zone_id, tableName, capacity);

                    paramIndex += 4;
                }
            }

            if (placeholders.length > 0) {
                const query = `
                    INSERT INTO tables (res_id, zone_id, table_name, capacity)
                    VALUES ${placeholders.join(', ')}
                    RETURNING id, table_name, capacity
                `;
                const result = await client.query(query, values);
                return result.rows;
            }
            return [];
        } catch (err) {
            console.log('create_table_error:', err);
            // client.query('ROLLBACK');
            throw err;
        }
    }

    // controller function for getting table zones under restaurant.
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
    removeZone = async (req, res) => {
        const { res_id, role } = req.user;
        const permissions = req.permissions;
        const { zone_id } = req.body;
        const client = await db.connect();
        try {
            if (permissions?.['manage_restaurant_setup'] || role == 'owner') {
                await client.query('BEGIN')
                const res_check = await client.query(
                    `SELECT 
                        res_id,
                        is_active
                    FROM table_zone
                    WHERE id= $1`,
                    [zone_id]
                );

                if (res_check.rowCount == 0 || !res_check.rows?.[0]?.is_active || res_check.rows?.[0]?.res_id != res_id) {
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
                    `, [zone_id]
                );

                await client.query(
                    `UPDATE tables
                    SET
                        is_active = FALSE
                    WHERE zone_id =$1`,
                    [zone_id]
                );

                await client.query('COMMIT');

                return returnRes(res, 200, {
                    success: true,
                    error: false,
                    message: 'Zone has been removed.'
                });

            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to view or manage the staff list.'
            });
        } catch (err) {
            client.query('ROLLBACK');
            console.log('Remove_table_zone_err: ', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
        finally {
            client.release();
        }
    }

    getTables = async (req, res) => {
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
                    COALESCE(
                        json_agg(
                            json_build_object(
                                'id',t.id,
                                'table_name',t.table_name,
                                'capacity',t.capacity,
                                'status',t.status,
                                'created_at',t.created_at,
                                'occupied_since',o.created_at,
                                'hourly_charge',z.hourly_charge
                            )ORDER BY t.id ASC
                        )FILTER (WHERE t.id IS NOT NULL),'[]'::json
                    ) AS tables_array
                FROM table_zone AS z
                LEFT JOIN tables AS t
                ON t.zone_id=z.id 
                    AND t.is_active = TRUE
                LEFT JOIN orders AS o
                    ON o.table_id = t.id
                    AND o.status = 'running'
                WHERE z.res_id = $1
                    AND z.is_active = TRUE
                GROUP BY z.id
                ORDER BY z.id DESC
                `, [res_id]
            );
            return returnRes(res, 200, {
                success: true,
                error: false,
                tableList: result.rows
            });
        } catch (err) {
            console.log('Get_tables_err: ', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
    }
}

export default new Table();