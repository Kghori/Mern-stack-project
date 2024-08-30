import { Navigate,Outlet } from "react-router-dom";

const Pvt_Cmp_Signup=()=>{

    const auth=localStorage.getItem('user');
return auth ? <Outlet/>:<Navigate to={"/signup"}/>;
}
export default Pvt_Cmp_Signup;