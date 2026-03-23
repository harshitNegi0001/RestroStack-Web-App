export const defaultPermisson = {
    'owner': {
        "view_dashboard": true,
        "view_live_orders": true,
        "manage_restaurant_setup": true,
        "can_manage_table": true,
        "view_inventory": true,
        "can_manage_staff": true,
        "can_post_jobs": true,
        "view_billings": true,
        "buy_subscription": true,
        "manage_settings": true
    },
    'manager': {
        "view_dashboard": true,
        "view_live_orders": true,
        "manage_restaurant_setup": false,
        "can_manage_table": true,
        "view_inventory": true,
        "can_manage_staff": true,
        "can_post_jobs": true,
        "view_billings": true,
        "buy_subscription": false,
        "manage_settings": false
    },
    'chef': {
        "view_dashboard": false,
        "view_live_orders": true,
        "manage_restaurant_setup": false,
        "can_manage_table": false,
        "view_inventory": true,
        "can_manage_staff": false,
        "can_post_jobs": false,
        "view_billings": false,
        "buy_subscription": false,
        "manage_settings": false
    },
    'waiter': {
        "view_dashboard": false,
        "view_live_orders": true,
        "manage_restaurant_setup": false,
        "can_manage_table": true,
        "view_inventory": false,
        "can_manage_staff": false,
        "can_post_jobs": false,
        "view_billings": false,
        "buy_subscription": false,
        "manage_settings": false
    }
}