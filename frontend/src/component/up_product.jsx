import{ useEffect,useState } from 'react';
import './compo.css';
import { useParams } from 'react-router-dom';

function Up_Product(){

    
    const [name,setname]=useState();
    const [price,setprice]=useState();
    const [category,setcategory]=useState();
    const   [company,setcom_name]=useState();

    const params=useParams();
    useEffect(()=>{

        console.log(params);
        get_product_data();
    },[]);
    const get_product_data=async()=>{
            let result  = await fetch(`http://localhost:4000/upproduct/${params.id}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
           
            });
            result = await result.json();
            console.log(result);
            setname(result.name);
            setprice(result.price);
            setcategory(result.category);
            setcom_name(result.company);
    }
    const handleSubmit=async()=>{
        console.log({name,price,company,category});
        let result= await fetch(`http://localhost:4000/update/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,price,company,category}),
            headers:{
                'Content-Type':"application/json",
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            
            }
        })
        result = await result.json();
        console.log(result);
    } 
    return(<>update product
    <div className='container-prod'>
    <div className='prod-sub'>
        <h1>Add Product</h1>
        <input type="text" name="name" placeholder=" Product Name" id="" onChange={(e)=>{setname(e.target.value)}} value={name} />
         <input type="text" name="price" placeholder='Price' id="" value={price}  onChange={(e)=>{setprice(e.target.value)}}/>
        <input type="text" name="category" placeholder="category" id="" value={category} onChange={(e)=>setcategory(e.target.value)}/>
        <input type="text" name="company_name" placeholder="Company Name" id="" value={company} onChange={(e)=>setcom_name(e.target.value)}/>
        <input type="submit" name="submit" onClick={handleSubmit} value="Update"  />
    </div>
</div></>)
}

export default Up_Product;