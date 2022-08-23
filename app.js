var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const bcrypt = require('bcrypt');
const { getAllUsers } = require('./queries');
// const { posts } = require('./dummydata');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var thobiasRouter = require('./routes/thobias');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/thobias', thobiasRouter);
app.use('/users', usersRouter);
app.use(cors());

app.get('/haha', function (req, res) {
  res.send('Det funka, gitt')
})

// const hashIt = async(password) => {
//   const salt = await bcrypt.genSalt();
//   hashedPassword = await bcrypt.hash(password, salt);
//   return hashedPassword;
// }

// app.get('/tokentest', authenticateToken, (req, res) => {
//   let personalPosts = posts.filter(user => user.user === req.user.name)
//   res.send(personalPosts);
// })

// app.post('/login', async function(req, res) {
//   checkPassword(req, res);
// })

app.get('/getAllUsers', function(req, res) {
  getAllUsers(req, res);
})

// app.post('/createPassword', function(req, res) {
//   createPassword(req, res);
// })





// app.post('/body', function (req, res) {
//   console.log(req.body)
//   if(req.body.reverse){
//     res.send(`Haha, bakvendt: ${req.body.data.split("").reverse().join("")}`)
//   } else {
//     res.send(`Dette er bodyen din: ${req.body.data}`)
//   }
// })
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

require("dotenv").config();

module.exports = app;
