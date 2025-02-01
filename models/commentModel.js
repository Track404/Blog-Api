const prisma = require('../prisma/client');

async function postComment(content, authorId, postsId) {
  const comment = await prisma.comments.create({
    data: {
      content: content,
      authorId: authorId,
      postsId: postsId,
    },
  });
  return comment;
}

async function getComments() {
  const comments = await prisma.comments.findMany();

  return comments;
}

async function getUniqueCommentById(id) {
  const comment = await prisma.comments.findUnique({
    where: {
      id: id,
    },
  });

  return comment;
}

async function getCommentsByAuthorId(authorId) {
  const comment = await prisma.comments.findMany({
    where: {
      authorId: authorId,
    },
  });

  return comment;
}

async function getCommentsByPostsId(postsId) {
  const comment = await prisma.comments.findMany({
    where: {
      postsId: postsId,
    },
  });

  return comment;
}

async function updateComment(id, content) {
  const comment = await prisma.comments.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  });
  return comment;
}

async function deleteComment(id) {
  const comment = await prisma.comments.delete({
    where: {
      id: id,
    },
  });
  return comment;
}

module.exports = {
  postComment,
  getComments,
  getUniqueCommentById,
  getCommentsByAuthorId,
  getCommentsByPostsId,
  updateComment,
  deleteComment,
};
