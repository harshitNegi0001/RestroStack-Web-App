import { returnRes } from "../utils/returnRes.js";
import db from '../utils/db.js';
import { uploadImage } from "../utils/uploadImage.js";
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
    // controller function to add Item in Menu.
    addMenuItem = async (req, res) => {
        const { res_id, role } = req.user;
        const { cat_id, type } = req.body;
        const permissions = req.permissions;
        
        const client = await db.connect();
        try {
            if (role == 'owner' || permissions?.['manage_menu']) {
                // check that cat_id has same res_id for security perpose.
                await client.query('BEGIN');
                const menu_check = await client.query(
                    `SELECT 
                        is_active
                    FROM menu_categories
                    WHERE id = $1
                        AND res_id =$2`,
                    [cat_id, res_id]
                );

                if (menu_check.rows.length == 0) {
                    
                    await client.query('ROLLBACK');
                    return returnRes(res, 403, {
                        success: false,
                        error: 'ACCESS_DENIED',
                        message: 'You do not have permission to create or manage the Menu.'
                    });
                }
                if (!menu_check.rows?.[0]?.is_active) {
                    await client.query('ROLLBACK');
                    return returnRes(res, 404, {
                        success: false,
                        error: 'CATEGORY_NOT_FOUND',
                        message: ''
                    });
                }
                const { item_name, description, price_array, is_veg } = req.body;
                let imageUrl = req.body.image || null;
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
                if (type == 'create') {

                    const item = await client.query(
                        `INSERT INTO 
                        menu_items(
                            item_name,
                            cat_id,
                            description,
                            image,
                            is_veg
                        )
                        VALUES (
                            $1,$2,$3,$4,$5
                        )
                        RETURNING id`,
                        [item_name?.trim(), cat_id, description, imageUrl, is_veg]
                    );
                    const item_id = item.rows[0]?.id;
                    
                    const itemData = {
                        id:item_id,
                        item_name:item_name?.trim(),
                        image:imageUrl,
                        cat_id,
                        description,
                        is_veg,
                        price_array:[]
                    }
                    await client.query('COMMIT');

                    return returnRes(res,200,{
                        success:true,
                        error:false,
                        message:'Item Added Successfully',
                        itemData
                    })
                }
                else if (type == 'edit') {
                    // update query;
                }
            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to create or manage the Menu.'
            });

        } catch (err) {
            await client.query('ROLLBACK');
            console.log('Menu_Item creation error:', err);
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
    // controller function to get menu categories
    getMenuCatrgories = async (req, res) => {
        const { res_id } = req.user;
        try {
            const categories = await db.query(
                `SELECT
                    c.id,
                    c.category_name,
                    c.display_order,
                    (
                        SELECT 
                            COUNT(i.id)
                        FROM menu_items AS i
                        WHERE i.cat_id=c.id
                    )   AS item_count,
                    c.created_at
                FROM menu_categories AS c
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
    // controller function to get menu items according category
    getMenuItems = async (req, res) => {
        const { res_id } = req.user;
        const { cat_id } = req.query;


        try {
            const result = await db.query(
                `SELECT 
                    i.id AS id,
                    i.item_name,
                    i.description,
                    i.image,
                    i.is_veg,
                    i.is_active,
                    i.created_at,
                    COALESCE(
                        (
                            SELECT json_agg(
                                json_build_object(
                                    'id', p.id,
                                    'variant_name', p.variant_name,
                                    'price', p.price
                                )
                            )
                            FROM item_prices AS p
                            WHERE p.item_id = i.id
                        ), '[]'::json
                    ) AS price_array
                FROM menu_items AS i
                WHERE cat_id = $1`,
                [cat_id]
            );

            return returnRes(res, 200, {
                success: true,
                error: false,
                items: result.rows || []
            })
        } catch (err) {
            console.log('Get menu items error:', err);
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
                        AND id != $3`, [res_id, category_name, cat_id]
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
                if (categoryCheck.rows.length == 0) {
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