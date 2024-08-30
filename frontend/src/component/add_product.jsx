import { useState } from 'react';
import './compo.css';

function Add_Product(){
    const [name,setname]=useState();
    const [price,setprice]=useState();
    const [category,setcategory]=useState();
    const   [company,setcom_name]=useState();
    const [error,seterror]  = useState(false);
    const handleSubmit= async()=>{
        if(!name || !price || !category || !company ){
            seterror(true);
            return false;
        }
            
    const userid=JSON.parse(localStorage.getItem("user"))._id;

            console.log(name,price,category,company,userid);



            let result=await fetch('http://localhost:4000/product',{
                method:"post",
                body:JSON.stringify({name,price,category,company,userid}),
                headers:{
                    'Content-Type':'application/json',
                    'authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            console.log(result);

           }
return(<>

    

<div className='container-prod'>
    <div className='prod-sub'>
        <h1>Add Product</h1>
        <input type="text" name="name" placeholder=" Product Name" id="" onChange={(e)=>setname(e.target.value)} />
        {error && !name &&<span className='invalid-input'>Enter valid Name</span>}
        <input type="text" name="price" placeholder='Price' id="" onChange={(e)=>setprice(e.target.value)}/>
        {error && !price &&<span className='invalid-input'>Enter valid Price</span>}
        <input type="text" name="category" placeholder="category" id="" onChange={(e)=>setcategory(e.target.value)}/>
        {error && !category &&<span className='invalid-input'>Enter valid Category</span>}
        <input type="text" name="company_name" placeholder="Company Name" id="" onChange={(e)=>setcom_name(e.target.value)}/>
        {error && !company &&<span className='invalid-input'>Enter valid Company Name</span>}
        <input type="submit" name="submit" onClick={handleSubmit} value="submit" />
    </div>
</div>
</>)
}
export default Add_Product;