const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then(() => res.send({
        name,
        about,
        avatar,
        email,
      }))
      .catch((err) => res.status(400).send({ error: err.message }));
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.getOneUser = (req, res) => {
  try {
    User.findById(req.params.userId).orFail(new Error(`Пользователь c id: ${req.params.userId} не найден`))
      .then((user) => res.send({ data: user }))
      .catch((err) => res.status(500).send({ error: err.message }));
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'f20109237f18715dfde3b12696c753568eee175cdb71d317271b0cb8fa0376e8', { expiresIn: '7d' });
      res
        .cookie('jwtCookie', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
