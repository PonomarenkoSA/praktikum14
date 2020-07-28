const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');
const notFoundRouter = require('./routes/notfound.js');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use(/..+/, notFoundRouter);

app.listen(PORT);
