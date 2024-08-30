const mongoose=require('mongoose');
const product_schema=new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    company:String,
    userid:String
});
module.exports = mongoose.model("products",product_schema);