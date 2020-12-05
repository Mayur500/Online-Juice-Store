const { default: Axios } = require("axios");
const order =require('../../../models/order');
const user=require('../../../models/user');
function orderController(){

return {

   index:async (req,res)=>{
  
   const orders= await  order.aggregate([
      {$match:{status:{$ne:'completed'}}},
      {$lookup:
       {
      from:"user", localField:"user_Id", foreignField:"_id",
       as:'user_details'
    }},{$sort:{createdAt:-1}}
]).exec();
res.render('admin/orders',{orders:orders});
   }
}

}
module.exports=orderController;











