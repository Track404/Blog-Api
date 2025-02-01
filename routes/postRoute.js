const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');

postRouter.get('/posts', postController.getPosts);
postRouter.get('/posts/:id', postController.getUniquePostById);
postRouter.get('/user/:id/posts', postController.getPostsByAuthorId);
postRouter.post('/posts', postController.createPost);
postRouter.put('/posts/:id', postController.updatePost);
postRouter.delete('/posts/:id', postController.deletePost);

module.exports = postRouter;
