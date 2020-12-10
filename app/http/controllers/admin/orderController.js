const { default: Axios } = require("axios");
const orders = require("../../../models/order");
const users = require("../../../models/user");
function orderController() {
  return {
      
    index: async (req, res) => {
      const allorders = await orders.aggregate([
          { $match: {status:{$ne:"completed"}}},
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "details",
            },
          }
        ]).exec();
  // console.log(allorders[0].details);
       if(req.method=='POST'){
        return res.json({ orders: allorders });
       }

      res.render("admin/orders", { orders: allorders });
    },
  };
}
module.exports = orderController;
