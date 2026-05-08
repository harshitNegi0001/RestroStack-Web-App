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
                let parsedPriceArray = [];
                if (price_array) {
                    parsedPriceArray = (typeof price_array == 'string') ? JSON.parse(price_array) : price_array;
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
                    await this.handlePriceArray('create', parsedPriceArray, item_id, client);
                    const itemData = {
                        id: item_id,
                        item_name: item_name?.trim(),
                        image: imageUrl,
                        cat_id,
                        description,
                        is_veg,
                        price_array: parsedPriceArray || []
                    }
                    await client.query('COMMIT');

                    return returnRes(res, 200, {
                        success: true,
                        error: false,
                        message: 'Item Added Successfully',
                        itemData
                    })
                }
                else if (type == 'edit') {
                    const item_id = req.body?.item_id;
                    await client.query(
                        `UPDATE menu_items
                        SET item_name=$1,
                            cat_id=$2,
                            description=$3,
                            image=$4,
                            is_veg=$5
                        WHERE id =$6`,
                        [item_name?.trim(), cat_id, description, imageUrl, is_veg, item_id]
                    );
                    await this.handlePriceArray('edit', parsedPriceArray, item_id, client);
                    const itemData = {
                        id: item_id,
                        item_name: item_name?.trim(),
                        image: imageUrl,
                        cat_id,
                        description,
                        is_veg,
                        price_array: parsedPriceArray || []
                    }
                    await client.query('COMMIT');

                    return returnRes(res, 200, {
                        success: true,
                        error: false,
                        message: 'Updated Successfully',
                        itemData
                    })
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
    // helper function to add/edit variant and their price
    handlePriceArray = async (type = 'create', priceArray = [], item_id, client) => {


        if (type === 'create') {
            // CREATE MODE: Seedha insert karo. 
            // Frontend ne jo temporary id (1, 2, 3) bheji hai, hum use ignore karenge.
            for (let variant of priceArray) {
                await client.query(
                    `INSERT INTO item_prices (item_id, variant_name, price) 
                     VALUES ($1, $2, $3)`,
                    [item_id, variant.variant_name, variant.price]
                );
            }
        }
        else if (type === 'edit') {
            // EDIT MODE: Yahan magic hoga (Sync logic)

            // Step 1: Database me is item ke paas currently kaun kaun si IDs hain?
            const dbResult = await client.query(
                `SELECT id FROM item_prices WHERE item_id = $1`,
                [item_id]
            );
            // Ise string array me convert kar lete hain easy comparison ke liye: ['101', '102']
            const existingDbIds = dbResult.rows.map(row => row.id.toString());

            // Step 2: Frontend se array me kaun kaun si IDs aayi hain?
            const incomingFrontendIds = priceArray.map(v => v.id.toString());

            // Step 3: Delete the removed rows
            // Jo IDs database me toh hain, par frontend wale array me NAHI hain, matlab user ne unhe delete kar diya hai.
            const idsToDelete = existingDbIds.filter(id => !incomingFrontendIds.includes(id));

            if (idsToDelete.length > 0) {
                // ANY($1::int[]) use karke ek hi query me saare delete ho jayenge
                await client.query(
                    `DELETE FROM item_prices WHERE id = ANY($1::int[]) AND item_id = $2`,
                    [idsToDelete, item_id]
                );
            }

            // Step 4: Update existing OR Insert new rows
            for (let variant of priceArray) {
                const variaty_name = variant.variant_name;
                const price = variant.price;
                if (!variaty_name || !price) {
                    continue;
                }
                if (existingDbIds.includes(variant.id.toString())) {
                    // Agar frontend ki ID database ki existing ID se match karti hai -> UPDATE
                    await client.query(
                        `UPDATE item_prices 
                         SET variant_name = $1, price = $2 
                         WHERE id = $3 AND item_id = $4`,
                        [variant.variant_name, variant.price, variant.id, item_id]
                    );
                } else {
                    // Agar ID match NAHI karti -> Iska matlab user ne 'Add New Variant' click kiya hai
                    // aur React ne ek temporary ID (jaise 4, 5) bheji hai. Use ignore karke naya INSERT karo.
                    await client.query(
                        `INSERT INTO item_prices (item_id, variant_name, price) 
                         VALUES ($1, $2, $3)`,
                        [item_id, variaty_name, price]
                    );
                }
            }
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
                            AND i.is_active=TRUE
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
                    i.cat_id,
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
                WHERE i.cat_id = $1
                    AND i.is_active = TRUE`,
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

    // controller function to soft delete menu item
    removeMenuItem = async (req, res) => {
        const { role, res_id } = req.user;
        const { item_id,cat_id } = req.body;
        const permissions = req.permissions;

        try {
            if (role == 'owner' || permissions?.['manage_menu']) {
                const categoryCheck = await db.query(
                    `SELECT 
                        1
                    FROM menu_categories AS c
                    JOIN menu_items AS i
                    ON i.cat_id=c.id
                    WHERE c.id = $1
                        AND c.res_id = $2
                        AND c.is_active = TRUE
                        AND i.id=$3
                        AND i.is_active=TRUE`,
                    [cat_id, res_id,item_id]
                );
                if (categoryCheck.rows.length == 0) {
                    return returnRes(res, 404, {
                        success: false,
                        error: 'CATEGORY_NOT_FOUND_OR_DELETED',
                        message: "Category doesn't exists or has been removed."
                    });
                }
                await db.query(
                    `UPDATE menu_items 
                    SET
                        is_active = FALSE
                    WHERE id = $1`,
                    [item_id]
                );
                return returnRes(res, 200, {
                    success: true,
                    error: false,
                    message: 'Item has been deleted.',
                });

            }
            return returnRes(res, 403, {
                success: false,
                error: 'ACCESS_DENIED',
                message: 'You do not have permission to create or manage the Menu.'
            });
        } catch (err) {
            console.log('Remove Menu Item error:', err);
            return returnRes(res, 500, {
                success: false,
                error: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error!'
            });
        }
    }
}


export default new Menu();