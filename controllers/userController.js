const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const lengthErr = 'must be between 1 and 20 characters.';
const emailERR = 'must be a valid email(example: name@gmail.com)';
const emptyERR = 'must not be empty';
const validateUser = [
  body('username')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Firstname ${lengthErr}`),
  body('email')
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyERR}`)
    .isEmail()
    .withMessage(`Email ${emailERR}`)
    .custom(async (value) => {
      console.log('Checking email:', value); // Log the email being checked
      const existingUser = await userModel.getUniqueUserByEmail(value);
      console.log('Existing User:', existingUser); // Log the result from the query
      if (existingUser) {
        console.log('User exists!');
        throw new Error('A user already exists with this e-mail address');
      }
      return true;
    }),
  body('password')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`password ${lengthErr}`),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('password do not match');
    }
    return true;
  }),
];

async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const users = await userModel.postUser(username, email, hashedPassword);
  res.json({ users: users, message: 'User Created' });
}

async function createAuthor(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const users = await userModel.postUser(username, email, hashedPassword, role);
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
  validateUser,
  createUser,
  createAuthor,
  getUsers,
  getUniqueUserById,
  updateUser,
  deleteUser,
};
