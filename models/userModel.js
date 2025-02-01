const prisma = require('../prisma/client');

async function postUser(username, email, password) {
  const user = await prisma.users.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
  return user;
}

async function getUsers() {
  const users = await prisma.users.findMany();

  return users;
}

async function getUniqueUserById(id) {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  return user;
}

async function getUniqueUserByEmail(email) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

async function updateUser(id, username, email) {
  const user = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      username: username,
      email: email,
    },
  });
  return user;
}

async function deleteUser(id) {
  const user = await prisma.users.delete({
    where: {
      id: id,
    },
  });
  return user;
}

module.exports = {
  postUser,
  getUsers,
  getUniqueUserById,
  getUniqueUserByEmail,
  updateUser,
  deleteUser,
};
