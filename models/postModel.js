const prisma = require('../prisma/client');
const { get } = require('../routes/userRoute');

async function postPost(title, content, authorId) {
  const post = await prisma.posts.create({
    data: {
      title: title,
      content: content,
      authorId: authorId,
    },
  });
  return post;
}

async function getPosts() {
  const posts = await prisma.posts.findMany();

  return posts;
}

async function getUniquePostById(id) {
  const post = await prisma.posts.findUnique({
    where: {
      id: id,
    },
  });

  return post;
}

async function getPostsByAuthorId(authorId) {
  const post = await prisma.posts.findMany({
    where: {
      authorId: authorId,
    },
  });

  return post;
}

async function updatePost(id, title, content) {
  const post = await prisma.posts.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
    },
  });
  return post;
}

async function deletePost(id) {
  const post = await prisma.posts.delete({
    where: {
      id: id,
    },
  });
  return post;
}

module.exports = {
  postPost,
  getPosts,
  getUniquePostById,
  getPostsByAuthorId,
  updatePost,
  deletePost,
};
