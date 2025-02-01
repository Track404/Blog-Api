const postModel = require('../models/postModel');

async function createPost(req, res) {
  // add a authorId by payload when user auth with jwt is code
  const { title, content, authorId } = req.body;
  const post = await postModel.postPost(title, content, Number(authorId));

  res.json({ post: post, message: 'Post Created' });
}

async function getPosts(req, res) {
  const posts = await postModel.getPosts();

  res.json({ posts: posts, message: 'Get All Posts' });
}

async function getUniquePostById(req, res) {
  const post = await postModel.getUniquePostById(Number(req.params.id));

  res.json({ post: post, message: `Get unique post ${req.params.id}` });
}

async function getPostsByAuthorId(req, res) {
  const posts = await postModel.getPostsByAuthorId(Number(req.params.id));

  res.json({ posts: posts, message: `Get all posts of user ${req.params.id}` });
}

async function updatePost(req, res) {
  const { title, content } = req.body;
  const post = await postModel.updatePost(
    Number(req.params.id),
    title,
    content
  );

  res.json({ post: post, message: `Update Post ${req.params.id}` });
}

async function deletePost(req, res) {
  await postModel.deletePost(Number(req.params.id));

  res.json({ message: `Delete post ${req.params.id}` });
}

module.exports = {
  createPost,
  getPosts,
  getUniquePostById,
  updatePost,
  deletePost,
};

module.exports = {
  createPost,
  getPosts,
  getUniquePostById,
  getPostsByAuthorId,
  updatePost,
  deletePost,
};
