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

                    return returnRes(res, 200, {
                        success: true,
                        error: false,
                        message: 'Menu category created successfully!',
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
                message: 'You do not have permission to create or manage the Menu.'
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
        const { res_id } = req.user;
        try {
            const categories = await db.query(
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
            return returnRes(res, 200, {
                success: true,
                error: false,
                categories: categories.rows || []
            });
        }
        catch (err) {
            console.log('Get menu categories error:', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
    }

    // controller function to edit catagory
    editCategoryName = async (req, res) => {
        const { role, res_id } = req.user;
        const { cat_id, category_name } = req.body;
        const permissions = req.permissions;

        try {
            if (role == 'owner' || permissions?.['manage_menu']) {
                const categoryCheck = await db.query(
                    `SELECT 
                        is_active
                    FROM menu_categories
                    WHERE id = $1
                        AND res_id = $2`,
                    [cat_id, res_id]
                );

                if (categoryCheck.rows.length == 0 || !categoryCheck.rows[0]?.is_active) {
                    return returnRes(res, 404, {
                        success: false,
                        error: 'CATEGORY_NOT_FOUND_OR_DELETED',
                        message: "Category doesn't exists or has been removed."
                    });
                }
                const catNameCheck = await db.query(
                    `SELECT
                        category_name
                    FROM 
                        menu_categories
                    WHERE 
                        res_id = $1 AND
                        is_active = TRUE
                        AND LOWER(category_name) = LOWER($2)
                        AND id != $3`, [res_id, category_name,cat_id]
                );
                if (catNameCheck.rows.length != 0) {
                    return returnRes(res, 400, {
                        success: false,
                        error: 'CATEGORY_ALREADY_EXISTS',
                        message: 'A category with the same name already exists. \nPlease choose a different name.'
                    });
                }
                await db.query(
                    `UPDATE menu_categories 
                    SET
                        category_name = $1
                    WHERE id = $2`,
                    [category_name, cat_id]
                );

                return returnRes(res, 200, {
                    success: true,
                    error: false,
                    message: 'Category updated',
                });
            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to create or manage the Menu.'
            });
        } catch (err) {
            console.log('Edit Menu Category error:', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
    }

    // controller function to soft delete menu category
    removeCategory = async (req, res) => {
        const { role, res_id } = req.user;
        const { cat_id } = req.body;
        const permissions = req.permissions;
        try {
            if (role == 'owner' || permissions?.['manage_menu']) {
                
                const categoryCheck = await db.query(
                    `SELECT 
                        1
                    FROM menu_categories
                    WHERE id = $1
                        AND res_id = $2
                        AND is_active = TRUE`,
                    [cat_id, res_id]
                );
                if (categoryCheck.rows.length == 0 ) {
                    return returnRes(res, 404, {
                        success: false,
                        error: 'CATEGORY_NOT_FOUND_OR_DELETED',
                        message: "Category doesn't exists or has been removed."
                    });
                }

                await db.query(
                    `UPDATE menu_categories 
                    SET
                        is_active = FALSE
                    WHERE id = $1`,
                    [cat_id]
                );

                return returnRes(res, 200, {
                    success: true,
                    error: false,
                    message: 'Category has been deleted.',
                });
            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to create or manage the Menu.'
            });
        } catch (err) {
            console.log('Remove Menu Category error:', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }

    }
}

export default new Menu();