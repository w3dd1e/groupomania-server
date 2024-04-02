const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/posts.ctrl');

//Route request to post controllers
router.get('/posts', auth, postCtrl.getAllPosts);
router.post('/posts', auth, postCtrl.createPost);
router.get('/posts/:id', auth, postCtrl.getOnePost);
router.put('/posts/:id', auth, postCtrl.updatePost);
router.delete('/posts/:id', auth, postCtrl.deletePost);

module.exports = router;
