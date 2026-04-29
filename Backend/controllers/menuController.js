import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
class Menu {

    // controller function to create menu category
    createMenuCategory = async (req, res) => {
        const { res_id, role } = req.user;
        const permissions = req.permissions;
        const { category_name } = req.body;
        try {
            if (role == 'owner' || permissions?.['manage_menu']) {
                const categoryCheck = await db.query(
                    `SELECT
                        category_name
                    FROM 
                        menu_categories
                    WHERE 
                        res_id = $1 AND
                        is_active = TRUE
                        AND LOWER(category_name) = LOWER($2)`, [res_id, category_name]
                );
                if (categoryCheck.rows.length === 0) {
                    const result = await db.query(
                        `INSERT INTO
                        menu_categories(
                            res_id,
                            category_name
                        ) 
                        VALUES ($1, $2)
                        RETURNING id`,
                        [res_id, category_name]
                    );
                    const category_id = result.rows[0]?.id;

                    return returnRes(res,200,{
                        success:true,
                        error:false,
                        message:'Menu category created successfully!',
                        category_id
                    });
                }
                return returnRes(res, 400, {
                    success: false,
                    error: 'CATEGORY_ALREADY_EXISTS',
                    message: 'A category with the same name already exists. \nPlease choose a different name.'
                });
            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to view or manage the staff list.'
            });
        } catch (err) {
            console.log('Menu_category creation error:', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
    }
    // controller function to get menu categories
    getMenuCatrgories = async (req, res) => {
        const {res_id} = req.user;
        try {
            const categories =await db.query(
                `SELECT
                    id,
                    category_name,
                    display_order,
                    created_at
                FROM menu_categories
                WHERE res_id =$1 
                    AND is_active =TRUE
                ORDER BY display_order ASC, created_at DESC`,
                [res_id]
            );
            return returnRes(res,200,{
                success:true,
                error:false,
                categories:categories.rows||[]
            });
        }
        catch (err) {
            console.log('Get menu categories error:', err);
        }
    }
}

export default new Menu();