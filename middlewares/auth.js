const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../models");
const bcrypt = require("bcrypt");

//Create a passport middleware to handle user registration
// passport.use('signup', new localStrategy({
//   usernameField : 'username',
//   passwordField : 'password'
// }, async (username, password, done) => {
//     try {
//       //Save the information provided by the user to the the database
//       const user = await UserModel.create({ email, password });
//       //Send the user information to the next middleware
//       return done(null, user);
//     } catch (error) {
//       done(error);
//     }
// }));

//Create a passport middleware to handle User login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await db.user.findOne({ where: { username } });
        if (!user) {
          return done({ message: "User not found" }, false);
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
          return done({ message: "Wrong Password" }, false);
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
