const db = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    let { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    await db.user.create({
      username,
      password,
    });

    res.status(201).json({
      success: true,
      data: "Created done!",
    });
  },
  login: async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error(err.message);
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { id: user.id, username: user.username };

          const token = jwt.sign({ user: body }, "abab", { expiresIn: 10 });

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },
};
