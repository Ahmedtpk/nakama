var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const bcrypt = require('bcrypt');
const { getAllUsers, getAllFamiles, getAllPosts , createUser, loginplz, createPost, deleteUser, getPostById } = require('./queries');
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
  getAllUsers(req, res)
  // try {
  //   getAllUsers(req, res)
  // } catch (error) {
  //   console.log(error)
  // }
})

app.get('/getFamiles', function(req, res) {
  try {
    getAllFamiles(req, res);
  } catch (error) {
    console.log(error)
  }
})

app.get('/getAllPosts', function(req, res) {
  try {
    getAllPosts(req, res);
  } catch (error) {
    console.log(error)
  }
})

// get a post by ID ------------------
app.get('/getpost/:postID/', async (req, res) =>  {
  console.log('it works')
  try {
    getPostById(req, res)
  } catch (error) {
    console.log(error)
  }
})

app.get('/deleteUser', function(req, res) {
  try {
    deleteUser(req, res);
  } catch (error) {
    console.log(error)
  }
})

// app.post('/login', function(req, res) {
//   console.log(req)
//   console.log(res)

// })

app.post('/createUserName', function (req, res) {  
  const username = req.body.username
  const password = req.body.password
  const hashedPassword = req.body.password
  createUser(username,  password, hashedPassword, req, res)
  
  // console.log(response);  
  res.end('user name and password sendt');  
})

app.post('/loginplz', async function (req, res) {  
  const username = req.body.username
  const password = req.body.password
  const hashedPassword = req.body.password
  try {
   await loginplz(username,  password, hashedPassword, req, res)
  } catch (error) {
    console.log(error)
  }  
})

// dett funker ikke

app.post('/createPost',  function (req, res) { 
  const userId = req.body.userId
  const familyId = req.body.familyId
  const title = req.body.title
  const description = req.body.description
  const meatinTime = req.body.meatinTime
  const postTime = req.body.postTime
  createPost(userId, familyId, title , description, meatinTime, postTime)
  res.end('post er lagt ut')
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
