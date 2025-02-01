const commentModel = require('../models/commentModel');

async function createComment(req, res) {
  // add a authorId by payload when user auth with jwt is code
  const { content, authorId, postsId } = req.body;
  const comment = await commentModel.postComment(
    content,
    Number(authorId),
    Number(postsId)
  );

  res.json({ comment: comment, message: 'Comment Created' });
}

async function getComments(req, res) {
  const comments = await commentModel.getComments();

  res.json({ comments: comments, message: 'Get All Comments' });
}

async function getUniqueCommentById(req, res) {
  const comment = await commentModel.getUniqueCommentById(
    Number(req.params.id)
  );

  res.json({
    comment: comment,
    message: `Get unique comment ${req.params.id}`,
  });
}

async function getCommentsByAuthorId(req, res) {
  const comments = await commentModel.getCommentsByAuthorId(
    Number(req.params.id)
  );

  res.json({
    comments: comments,
    message: `Get all comments of user ${req.params.id}`,
  });
}

async function getCommentsByPostsId(req, res) {
  const comments = await commentModel.getCommentsByPostsId(
    Number(req.params.id)
  );

  res.json({
    comments: comments,
    message: `Get all comments of post ${req.params.id}`,
  });
}

async function updateComment(req, res) {
  const { content } = req.body;
  const comment = await commentModel.updateComment(
    Number(req.params.id),
    content
  );

  res.json({ comment: comment, message: `Update Comment ${req.params.id}` });
}

async function deleteComment(req, res) {
  await commentModel.deleteComment(Number(req.params.id));

  res.json({ message: `Delete Comment ${req.params.id}` });
}

module.exports = {
  createComment,
  getComments,
  getUniqueCommentById,
  getCommentsByAuthorId,
  getCommentsByPostsId,
  updateComment,
  deleteComment,
};
