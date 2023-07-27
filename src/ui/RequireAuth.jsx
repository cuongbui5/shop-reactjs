import {useAuth} from "../hook/useAuth.js";
import {Navigate, Outlet, useLocation} from "react-router-dom";


export const RequireAuth=({allowedRoles})=>{
    const {auth}=useAuth();
    const location=useLocation();
    return (
        auth?.roles?.find(role=>allowedRoles?.includes(role))
            ? <Outlet/>
            : auth?.username
                ? <Navigate to="/forbidden" state={{from:location}} replace={true}/>
                : <Navigate to="/login" state={{from:location}} replace={true}/>
    )
}

