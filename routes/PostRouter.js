var express = require('express');
const { 
  createPost, 
  getAllPost, 
  getPost
} = require('../controllers/PostController');
var router = express.Router();

//Router all post
router
  .route('/')
  .post(createPost)
  .get(getAllPost);

//Router single post
router
  .route('/:id')
  .get(getPost);



module.exports = router;
