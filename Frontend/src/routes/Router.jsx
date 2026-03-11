import { useRoutes } from "react-router-dom";


export default function Router({allRoutes}){
    const router = useRoutes([...allRoutes]);
    return router;
}