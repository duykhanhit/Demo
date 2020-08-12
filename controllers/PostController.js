const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  //@desc     create a Post
  //@router   /api/post
  createPost: async (req, res, next) => {
    try {
      const { name, summary, token } = req.query;

      if (!token) {
        return next(new Error(`Không có token.`, 401));
      }

      try {
        const decoded = jwt.verify(token, "abab");

        req.user = await db.user.findByPk(decoded.user.id);
        
        const post = await db.post.findOne({
          where: {
            name: name,
          },
        });

        if (post) {
          res.status(401).json({
            success: false,
            data: "Đã tồn tại.",
          });

          return;
        }

        const newPost = await db.post.create({
          name,
          summary,
        });

        res.status(201).json({
          success: true,
          data: newPost,
        });
      } catch (err) {
        console.log(err);
        return next(new Error(`Bạn không có quyền truy cập.`, 401));
      }
    } catch (err) {
      res.status(401).json({
        success: false,
        error: err.message,
      });
    }
  },

  //@desc     get all posts
  //@router   /api/post
  getAllPost: async (req, res, next) => {
    try {
      const { token } = req.query;
      if (!token) {
        return next(new Error(`Không có token.`, 401));
      }

      try {
        const decoded = jwt.verify(token, "abab");

        req.user = await db.user.findByPk(decoded.user.id);
        const post = await db.post.findAndCountAll();

        res.status(200).json({
          success: true,
          data: post,
        });
      } catch (err) {
        console.log(err);
        return next(new Error(`Bạn không có quyền truy cập.`, 401));
      }
    } catch (err) {
      res.status(401).json({
        success: false,
        error: err.message,
      });
    }
  },

  //@desc     get single post
  //@router   /api/post/:id
  getPost: async (req, res) => {
    try {
      const post = await db.post.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!post) {
        res.status(404).json({
          success: false,
          error: `Cannot find post with id ${req.params.id}`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: post,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        error: err.message,
      });
    }
  },
};
