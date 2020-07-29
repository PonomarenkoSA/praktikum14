const usersRouter = require('express').Router();
const { getAllUsers, getOneUser } = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getOneUser);

module.exports = usersRouter;
