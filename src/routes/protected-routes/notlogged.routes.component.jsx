import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const ProtectedRouteNotLogged = () => {

    const { currentUser } = useContext(UserContext);

    
    if (currentUser) {
        return <Outlet />
    } else {
        return <Navigate to='/signin' />
    }
};
export default ProtectedRouteNotLogged;