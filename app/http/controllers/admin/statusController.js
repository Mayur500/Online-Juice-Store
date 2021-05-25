const Order = require('../../../models/order');
function statusController(){

    return {

     update: (req,res)=>{
    //  console.log(req.body.status);
        Order.updateOne({_id:req.body.orderId},
      { $set: {status:req.body.status}},
      (err,data)=>{
          if(err){
              console.log('facing some errors admin status');
            return res.redirect('/admin/orders');
          }
          const eventEmitter= req.app.get('eventEmitter');
          eventEmitter.emit('orderUpdated',{id:req.body.orderId,status:req.body.status});
      return  res.redirect('/admin/orders');

      })
}
    }
}

module.exports=statusController;