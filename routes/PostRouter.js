var express = require('express');
const { 
  createPost, 
  getAllPost, 
  getPost
} = require('../controllers/PostController');
var router = express.Router();

//Router all post
router
  .route('/post')
  .post(createPost)
  .get(getAllPost);

//Router single post
router
  .route('/post/:id')
  .get(getPost);



module.exports = router;
