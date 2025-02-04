const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/logincontroller');
userRouter.post('/login', loginController.loginUser);
userRouter.post('/login/author', loginController.loginAuthor);
userRouter.get('/secure', loginController.secureUser, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

userRouter.get('/user', userController.getUsers);
userRouter.get('/user/:id', userController.getUniqueUserById);
userRouter.post(
  '/user',
  userController.validateUser,
  userController.createUser
);
userRouter.put('/user/:id', userController.updateUser);
userRouter.delete('/user/:id', userController.deleteUser);

userRouter.post('/author', userController.createAuthor);
module.exports = userRouter;
