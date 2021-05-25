function adminauth(req, res, next) {

    // if (req.isAuthenticated() && req.user.email=='admin@gmail.com') {

      next();
    // } else {
    //   return res.redirect("/login");
    // }
  }
  
  module.exports = adminauth;
  
 