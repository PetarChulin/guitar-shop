import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminContext } from "../../contexts/admin.context";

const ProtectedRoutesAdmin = () => {

    const { isAdmin } = useContext(AdminContext);
    
    if (isAdmin) {
        return <Outlet />
    } else {
        return <Navigate to='/unauthorized' />
    }

   
};
export default ProtectedRoutesAdmin;