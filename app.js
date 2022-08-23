var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {getAllUsers} = require('./db');
// const pool = process.env.DATABASE_URL

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
app.use('/users', usersRouter);


// const getAllUsers = (request, response) => {
//   pool.query("SELECT * FROM users;", (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).json(results.rows);
//     }
//   );
// };

// get alle users
app.get('/getUsers', async (req, res) =>  {
  getAllUsers(req, res)
  // try {
  //   const allUsers = await pool.query("SELECT * from users")
  //   res.send(allUsers)
  // } catch (error) {
  //   console.log(error)
  //   res.json(error)
  // }
})
// app.get('/console', async (req, res) => {
//   res.json('testing')
// })

// // get alle families
// app.get('/getfamilies', async (req, res) =>  {
//   try {
//     const allfamilies = await pool.query("SELECT * from family")
//     res.json(allfamilies)
//   } catch (error) {
//     console.log(error)
//   }
// })

// // get post
// app.get('/getpost/:userId/:familyId', async (req, res) =>  {
//   try {
//     const userId = req.params.userId
//     const familyId = req.params.familyId
//     // res.send("tagId is set to " + userId);
//     // console.log(userId)
//     const getPost = await pool.query("SELECT * from posts WHERE user_id = ($1) and family_id = ($2)", [userId, familyId])
//     res.json(getPost)
//   } catch (error) {
//     console.log(error)
//   }
// })


// app.get('/p/:tagId', function(req, res) {
//   res.send("tagId is set to " + req.params.tagId);
// });

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
