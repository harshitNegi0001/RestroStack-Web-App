import { getRoles } from "./getRoles.js";
import { getUserInfo } from "./getUserInfo.js";




export const getUserFullDetail = async (userId) => {
    
        const userInfo = await getUserInfo(userId);
        const roles = await getRoles(userId);
        const activeRole = (roles.length == 0) ? null : (roles.length == 1) ? roles[0].role_name : roles.find(role => role.id == userInfo.last_role_id)?.role_name;
        const permissions = (roles.length == 0) ? {} : (roles.length == 1) ? roles[0].permissions : roles.find(role => role.id == userInfo.last_role_id)?.permissions;

        return {
            success: true,
            error: false,
            isVerified: true,
            message: 'Login successful! \nWelcome back!',
            userInfo: userInfo,
            role: activeRole,
            rolesList: roles,
            permissions,
            redirectTo: 'role-options'
        };
    

}