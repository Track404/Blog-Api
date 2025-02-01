const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const users = await userModel.postUser(username, email, hashedPassword);

  res.json({ users: users, message: 'User Created' });
}

async function getUsers(req, res) {
  const users = await userModel.getUsers();

  res.json({ users: users, message: 'Get All Users' });
}

async function getUniqueUserById(req, res) {
  const user = await userModel.getUniqueUserById(Number(req.params.id));

  res.json({ users: user, message: `Get unique user ${req.params.id}` });
}

async function updateUser(req, res) {
  const { username, email } = req.body;
  const user = await userModel.updateUser(
    Number(req.params.id),
    username,
    email
  );

  res.json({ users: user, message: `Update user ${req.params.id}` });
}

async function deleteUser(req, res) {
  const user = await userModel.deleteUser(Number(req.params.id));

  res.json({ users: user, message: `Delete user ${req.params.id}` });
}

module.exports = {
  createUser,
  getUsers,
  getUniqueUserById,
  updateUser,
  deleteUser,
};
