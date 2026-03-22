import MainLayout from "../../Pages/layout/MainLayout.jsx";
import { permissionBasedRoutes } from "./permissionRoutes.jsx";
import ProtectedRoute from "./protectedRoutes.jsx";


export const getAllRoutes = ()=>{
     permissionBasedRoutes.map((r)=>{
        r.element=<ProtectedRoute route={r}>{r.element}</ProtectedRoute>
     });
     return{
        path:'/',
        element:<MainLayout/>,
        children:permissionBasedRoutes
     }
}