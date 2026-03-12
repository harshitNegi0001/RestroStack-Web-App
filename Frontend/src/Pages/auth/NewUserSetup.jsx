import { useEffect, useState } from "react";
import SelectRole from "./SelectRole";
import { useSelector } from "react-redux";
import RestaurantSetup from "./RestaurantSetup";


export default function NewUserSetup() {


    const [selectedRole, setSelectedRole] = useState('');
    const [activePage, setActivePage] = useState('');

    const { userInfo } = useSelector(state => state.auth);
    const btnDisabled = !selectedRole;


    useEffect(() => {
        if (userInfo?.role && userInfo?.role == 'owner') {
            setActivePage('restaurant-setup');
        }
        else {
            setActivePage('role-select');
        }

    }, [userInfo])
    return (

        <div
            className={`w-dvw min-h-dvh flex justify-center  ${activePage == 'role-select' ? 'items-center' : ''} py-5 `}>
            {
                activePage == 'role-select' && <SelectRole selectedRole={selectedRole} setSelectedRole={setSelectedRole} setActivePage={setActivePage} />
            }
            {
                activePage == 'restaurant-setup' && <RestaurantSetup setActivePage={setActivePage} />
            }


        </div>
    )
}