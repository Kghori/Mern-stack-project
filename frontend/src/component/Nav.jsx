
import {  Link, useNavigate } from 'react-router-dom';
import './compo.css'
function Nav() {
    const auth = localStorage.getItem('user');
    const Navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        Navigate("/signup");
    }

    return (

        <>
            {/* <div className='nav-container' style={{ textDecoration: 'none' }}>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li> <Link to="/add product">add product</Link></li>
                    <li>
                        <Link to="/manage product">manage product</Link>
                    </li>


                    <li>
                        <Link to="/profile">profile</Link>
                    </li>    {
                        // auth ?    <Link onClick={logout} to="/signup">logout</Link>: <Link to="/signup">Signup</Link>

                    }
                    {
                        auth ? <li> <Link onClick={logout} to="/signup">Logout</Link></li> : <>
                            <li><Link to="/signup">Signup</Link></li><li><Link to="/login" >Login</Link></li>
                        </>
                    }



                </ul>

            </div> */}

<div className='nav-container' style={{ textDecoration: 'none' }}>
    <img src="https://www.shutterstock.com/image-vector/creative-modern-abstract-ecommerce-logo-260nw-2134594631.jpg" className='logo' alt="" />
         {


                    auth ? <ul  className='nav-ul'>
                    <li><Link to="/">home</Link></li>
                    <li> <Link to="/add product">add product</Link></li>
                    <li>
                        <Link to="/manage product">manage product</Link>
                    </li>
                    <li>
                        <Link to="/profile">profile</Link>
                    </li>
                    <li><Link to="/products">Products</Link></li>
                    <li> <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
               </ul>
                   :
                   <ul className=' main-nav'>
                                <li><Link to="/signup">Signup</Link></li>
                                <li><Link to="/login" >Login</Link></li>
                    </ul>     }
            
                
            </div>


        </>
    );
}

export default Nav;
