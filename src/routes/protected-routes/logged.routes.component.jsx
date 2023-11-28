import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Navigate, Outlet } from "react-router-dom";
import Home from "../home/home.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";



const ProtectedRouteLoggedUser = () => {

    const { currentUser } = useContext(UserContext);
    if (currentUser){
        return <Navigate to='/' />;
    } else {
        return <Outlet />;
    }
};
export default ProtectedRouteLoggedUser