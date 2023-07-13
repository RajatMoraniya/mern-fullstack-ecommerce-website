import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../authSlice";


function Protected({children}) {
    const user = useSelector(selectLoggedInUserToken)

    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
}

export default Protected;