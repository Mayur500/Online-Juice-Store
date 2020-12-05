const passport = require("passport");
const User = require("../../models/user.js");
const bcrypt = require("bcrypt");

function authController() {
  return {
    login: (req, res) => {
      res.render("auth/login");
    },
    postlogin: (req, res, next) => {
      const email = req.body.email;
      const password = req.body.password;
      if(!email || !password) {
        req.flash("error", "All Fields are required");
        return res.redirect("/login");
      }
      passport.authenticate("local", (error, user, msg) => {
        if (error) {
          req.flash("error", msg.message);
          return next(err);
        }

        if (!user) {
          req.flash("error", msg.message);
          return res.redirect("/login");
        }
        req.login(user, (err) => {
          if (err) {
            req.flash("error", msg.message);
            return next(err);
          }
          return res.redirect("/");
        });
      })(req, res, next);
    },
    register: (req, res) => {
      res.render("auth/register");
    },
    userRegister: async (req, res) => {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      if (!name || !email || !password) {
        req.flash("error", "All Fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }
      const result = await User.exists({ email: email });
      if (result) {
        req.flash("error", "Email already used");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      try {
        const hashedPass = await bcrypt.hash(password, 10);
        await User.create({
          name: name,
          email: email,
          password: hashedPass,
        });
        return res.redirect("/");
      } catch (err) {
        req.flash("error", "Something went wrong");
        return res.redirect("/register");
      }
    },
    logout: (req, res) => {
      req.logout();
      req.flash("logout","Successfully logged out");
       res.redirect("/login");
    },
  };
}
module.exports = authController;

