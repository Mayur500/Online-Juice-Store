const order =require('../../models/order');
const moment=require('moment');
function orderController(){

return {

     location: async(req,res)=>{
     const phone = req.body.phone;
     const address =req.body.address;
     
  if(!phone  || !address){
      req.flash('error' , 'All fields necessary');
      return res.redirect('/cart');
  } 
  try{
  await order.create({
   UserID:req.user._id,
   items :req.session.cart,
   phone:phone,
   address: address
  });
  delete req.session.cart;
}
catch(err){
    req.flash('error','Something went wrong');
    return res.redirect('/cart');
}

},
index:  async(req,res)=>{

const allorder= await Order.find({UserID:req.user._id}).sort({'createdAt':-1});
res.render('customers/orders.ejs',{order:allorder, moment:moment}); 
}

}
}
module.exports=orderController;