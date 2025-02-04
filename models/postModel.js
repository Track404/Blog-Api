const prisma = require('../prisma/client');

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
  const posts = await prisma.posts.findMany({
    include: {
      Comments: true, // Include the related comments
    },
  });

  return posts;
}

async function getUniquePostById(id) {
  const post = await prisma.posts.findUnique({
    where: {
      id: id,
    },
    include: {
      Comments: true, // Include the related comments
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

async function updatePost(id, title, content, published) {
  const post = await prisma.posts.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
  return post;
}

async function deletePost(id) {
  const post = await prisma.posts.delete({
    where: {
      id: id,
    },
    include: {
      Comments: true,
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
