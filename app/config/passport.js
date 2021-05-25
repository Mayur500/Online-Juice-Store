const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
function init(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email: email });
  
        if (!user) {
        
          return done(null, false, { message: "No user Found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user, { message: "Successful login" });
        } else {
          return done(null, false, { message: "Incorrect email or password" });
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((user_id, done) => {
    User.findOne({ _id: user_id }, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
