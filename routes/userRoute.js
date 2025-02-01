const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.get('/user', userController.getUsers);
userRouter.get('/user/:id', userController.getUniqueUser);
userRouter.post('/user', userController.createUser);
userRouter.put('/user/:id', userController.updateUser);
userRouter.delete('/user/:id', userController.deleteUser);

module.exports = userRouter;
