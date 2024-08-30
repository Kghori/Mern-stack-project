
import Add_Product from './component/add_product';
import Manage_Product from './component/Manage_Product';
import Logout from './component/logout';
import Nav from './component/Nav';
import Footer from './component/footer';
import Signup from './component/signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './component/profile';
import Pvt_Cmp_Signup from './component/pvt_cmp_signup';
import Login from './component/login';
import Product_List from './component/product_list';
import Up_Product from './component/up_product';


function App() {
  
  return (
    <>
    <BrowserRouter>
      <div>
 <Nav/>
        <Routes>
           <Route element={<Pvt_Cmp_Signup/>}>
           <Route path="/"/>
          <Route path="/add product" element={<Add_Product />} />
          <Route path="/manage product" element={<Manage_Product />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Product_List />} />
          <Route path="/update_data/:id" element={<Up_Product />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

    
              
        </Routes>
      </div>
    </BrowserRouter>
 
    <Footer/>
    </>
  );
}

export default App;
