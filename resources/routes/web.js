const cartController = require("../../app/http/controllers/customers/cartController");
const authController = require("../../app/http/controllers/authController");
const orderController = require("../../app/http/controllers/orderController");
const homeController = require("../../app/http/controllers/homeController");
const checkinguser = require("../../app/http/middlewares/new");
const admincontroller = require("../../app/http/controllers/admin/orderController");
const adminauth = require("../../app/http/middlewares/admin");
const statusController= require('../../app/http/controllers/admin/statusController');
const { Cookie } = require("express-session");
const bodyParser = require("body-parser");
function routing(app) {
  app.get("/", homeController().index);
  app.get("/cart", cartController().index);
  app.get("/register", checkinguser, authController().register);
  app.post("/register", authController().userRegister);
  app.get("/login", checkinguser, authController().login);
  app.post("/login", authController().postlogin);
  app.post("/logindata", authController().postlogin);
  app.post("/update-cart", cartController().update);
  app.get("/logout", authController().logout);
  app.post("/cart", orderController().location);
  app.get("/customer/orders", orderController().index);
  app.get("/customer/orders/:id", orderController().show);
  app.get("/admin/orders", adminauth, admincontroller().index);
  app.post("/admin/orders", adminauth, admincontroller().index);
  app.post("/admin/orders/status", adminauth, statusController().update);
};

module.exports = routing;
