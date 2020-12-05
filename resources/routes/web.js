const cartController = require("../../app/http/controllers/customers/cartController");
const authController = require("../../app/http/controllers/authController");
const homeController = require("../../app/http/controllers/homeController");
const checkinguser = require("../../app/http/middlewares/new");
const admincontroller=require('../../app/http/controllers/admin/orderController');
const adminauth = require("../../app/http/middlewares/admin");
function routing(app) {
  app.get("/", homeController().index);
  app.get("/cart", cartController().index);
  app.get("/register", checkinguser, authController().register);
  app.post("/register", authController().userRegister);
  app.get("/login", checkinguser, authController().login);
  app.post("/login", authController().postlogin);
  app.post("/logindata", authController().postlogin);
  app.post("/update-cart", cartController().update);
  app.get('/logout',authController().logout);

  app.get('/admin',adminauth,admincontroller().index);
}

module.exports = routing;
