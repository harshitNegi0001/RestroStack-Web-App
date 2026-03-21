import { sidebarNavs } from "./SidebarNavs"


export const getSidebarNavs = (role, permissions = {}) => {
    return sidebarNavs.map((section) => {
        const filteredOptions = section.options.filter(o =>
            role == 'owner' || permissions[o.permission]
        )
        if (filteredOptions.length == 0) {
            return null
        }
        return {
            ...section,
            options:filteredOptions
        }
    }).filter(Boolean);
}