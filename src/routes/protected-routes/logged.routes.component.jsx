import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRouteLoggedUser = () => {

    const { currentUser } = useContext(UserContext);

    if (currentUser){
        return <Navigate to='/' />;
    } else {
        return <Outlet />;
    }
};
export default ProtectedRouteLoggedUser