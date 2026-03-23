import { useEffect, useState } from "react";
import SelectRole from "./SelectRole";
import { useSelector } from "react-redux";
import RestaurantSetup from "./RestaurantSetup";
import EmployeeSetup from "./components/EmployeeSetup";
import { useNavigate } from "react-router-dom";


export default function NewUserSetup() {


    const [selectedRole, setSelectedRole] = useState('');
    const [activePage, setActivePage] = useState('role-select');

    const { userInfo,role } = useSelector(state => state.auth);
    const btnDisabled = !selectedRole;
    const navigate = useNavigate();

    useEffect(() => {
        if(!userInfo){
            navigate('/login');
            return;
        }
        
    }, [userInfo]);

    return (

        <div
            className={`w-dvw min-h-dvh flex justify-center  ${activePage == 'role-select' ? 'items-center' : ''} py-5 `}>
            {
                activePage == 'role-select' && <SelectRole selectedRole={selectedRole} setSelectedRole={setSelectedRole} setActivePage={setActivePage} />
            }
            {
                activePage == 'restaurant-setup' && <RestaurantSetup setActivePage={setActivePage} />
            }
            {
                activePage=='employee-setup' && <EmployeeSetup setActivePage={setActivePage} />
            }

        </div>
    )
}