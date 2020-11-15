function cartController() {
  return {
    index: (req, res) => {
      res.render("customers/cart");
    },
    update: (req, res) => {
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;
      let bodyid = req.body._id;
     // console.log(bodyid);
      if (!cart.items[bodyid]) {
        cart.items[bodyid] = {
          items: req.body,
          qty: 1,
        };
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      } else {
        cart.items[bodyid].qty = i = cart.items[bodyid].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }
      let totalQty = req.session.cart.totalQty;
      res.send(`${totalQty}`);
     // console.log(req.session.cart.items);
    },
  };
}
module.exports = cartController;
