import { getRoles } from "./getRoles.js";
import { getUserInfo } from "./getUserInfo.js";




export const getUserFullDetail = async (userId,res_id) => {
    const userInfo = await getUserInfo(userId);
    const roles = await getRoles(userId,res_id);
    const activeRoleData = roles.length > 0
        ? (roles.find(role => role.res_id ==res_id) || roles[0])
        : null;

    const activeRole = activeRoleData ? activeRoleData.role_name : null;
    const activeResId = activeRoleData? activeRoleData.res_id:null;
    const permissions = activeRoleData ? activeRoleData.permissions : {};

    return {
        success: true,
        error: false,
        isVerified: true,
        message: 'Login successful! \nWelcome back!',
        userInfo: userInfo,
        role: activeRole,
        rolesList: roles,
        permissions,
        activeResId,
        redirectTo: 'role-options'
    };


}