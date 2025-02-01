const { Router } = require('express');
const commentRouter = Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/comments', commentController.getComments);
commentRouter.get('/comments/:id', commentController.getUniqueCommentById);
commentRouter.get(
  '/user/:id/comments',
  commentController.getCommentsByAuthorId
);
commentRouter.get(
  '/posts/:id/comments',
  commentController.getCommentsByPostsId
);
commentRouter.post('/comments', commentController.createComment);
commentRouter.put('/comments/:id', commentController.updateComment);
commentRouter.delete('/comments/:id', commentController.deleteComment);

module.exports = commentRouter;
