import { useEffect, useState } from "react";

import {  Link } from 'react-router-dom';

import './compo.css'
function  Product_List(){
const [data,setdata]=useState([]);
useEffect(()=>{
    getproduct_data();
},[])

// const Navigate=useNavigate();
const getproduct_data=async()=>{

    let result = await fetch('http://localhost:4000/getProduct',{
        headers:{
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
        result=await result.json();
        setdata(result);
        // console.log(result);
    }
   console.warn(data);  
   
    
const delete_product=async(id)=>{
console.log(id);
let  result = await  fetch(`http://localhost:4000/delete-product/${id}`,{
    method:"delete",
    headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
}

});
result=await result.json();
if(result){
    // alert("record deleted sucessfully");    
    window.location.reload()
}

}



const searchHandle =async(event)=>{
    console.log(event.target.value);
    let key = event.target.value;
    
    if(key){
        let result= await fetch (`http://localhost:4000/search_pro/${key}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        
        });
    result = await result.json();
        setdata(result);
        if(result){
            setdata(result);
        }

    }
    else{
        getproduct_data();
    }
}

    return(<>
    <div className="product-list">
    <h1>product list </h1>
    <input type="text" onChange={searchHandle} placeholder="Search Product" name="" id="" />
        <ul >
            <li>no</li>
            <li>name</li>
            <li>price</li>
            <li>category</li>
            <li>company name</li>
            <li>Delete</li>
            <li>Update</li>
        </ul>
        {
           data.length>0 ?data.map((item,index)=>
                <>                
                <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>${item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li><button onClick={()=>delete_product(item._id)}>Delete</button></li>
                    <li><Link to={"/update_data/"+item._id}>Update</Link></li>
                </ul>
                </>
):<h1>No data Found</h1>
        }
    </div>
       


    </>)
}
export default Product_List;