 const order = require("../../models/order");
 const User = require("../../models/user");
  const moment = require("moment");
 function orderController() {
  return {
    location: async (req, res) => {
      const phone = req.body.Phone;
      const address = req.body.Address;

       if (!phone || !address) {
        req.flash("error", "All fields necessary");
        return res.redirect("/cart");
      }
       try {
         // console.log(req.user._id,req.session.cart,phone,address);
       let result= await order.create({
           userId: req.user._id,
           items: req.session.cart,
           phone: phone,
           address: address,
        });
       
        const allorders = await order.aggregate([
          { $match: {_id:result._id}},
          {
            $lookup: {
              from: "users",
              localField:"userId",
              foreignField: "_id",
              as: "details",
            },
          }
        ]).exec();
  
         delete req.session.cart;
         req.flash("success", "Order Placed");
         res.header(
          "Cache-Control",
          "no-store"
        );
        //  console.log(allorders);
        const eventEmitter= req.app.get('eventEmitter');
        eventEmitter.emit('orderPlaced',allorders[0]);

        return res.redirect("/customer/orders");
      } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong");
        return res.redirect("/cart");
      }
    },
    index: async (req, res) => {
      res.header(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
      );
      const allorder = await order
        .find({ userId: req.user._id })
        .sort({ createdAt: -1 });

      res.render("customers/orders.ejs", { orders: allorder, moment: moment });
    },
    show:async (req,res)=>{
      const orders = await order.findById(req.params.id);
    // console.log(orders);
      if(req.user._id.toString()===orders.userId.toString()){
res.render('customers/singleOrder',{order:orders});
      }
      else{
        return res.redirect("/");
      }
    }
  };
}
module.exports = orderController;
