const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { serializeUser } = require("passport");

function initialize(passport) {
  const authenticateUsers = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, {
        message: "The email you entered cannot be identified.",
      });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "The password you entered was incorrect.",
        });
      }
    } catch (error) {
      console.log(error);
      return done(error);
    }
  };
  passport.use(
    new LocalStrategy({ usernameField: "email" }, authenticateUsers)
  );
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
