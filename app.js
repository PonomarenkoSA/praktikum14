const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/users');
const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');
const notFoundRouter = require('./routes/notfound.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use(cookieParser());
app.post('/signin', login);
app.post('/signup', createUser);
app.use((req, res, next) => {
  req.user = {
    _id: '5f19aff03b367a0a484ec748',
  };
  next();
});
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use(/..+/, notFoundRouter);

app.listen(PORT);
