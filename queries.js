// const API_URL = 'localhost:3000/users';
require("dotenv").config();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const { Client } = require('pg');

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});


client.connect();

const getAllUsers = (request, response) => {
  client.query(
    "SELECT * FROM users;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// const hashPassword = async(password) => {
//   const salt = await bcrypt.genSalt();
//   hashedPassword = await bcrypt.hash(password, salt);
//   return hashedPassword;
// }

// const createPassword = async (request, response) => {
//   console.log(request.body.username, request.body.password);
//   if(request.body.password !== request.body.password2){
//     return response.sendStatus(401)
//   }

//   const hashedPassword = await hashPassword(request.body.password);
//   console.log(hashedPassword)

//   client.query(
//     "SELECT password FROM users WHERE username = $1;", [request.body.username],
//     (error, results) => {
//       console.log(results.rows)
//       if(results.rows[0].password !== 'alfred'){
//         response.status(200).send('Password already exists');
//       } else {
//           client.query(
//             "UPDATE users SET password = $2 WHERE username = $1;", [request.body.username, hashedPassword],
//             (error, results) => {
//               if(error) {
//                 throw error;
//               }
//               response.status(200).send(`Password created: ${request.body.password} : ${hashedPassword}`);
//             }
//           )
//       }
//     }
//   )
// };

// async function checkPassword(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;

//  client.query("SELECT password FROM users WHERE username = $1;", [username], async (error, results) => {
//     if(error) {
//       throw error;
//     }
//     bcrypt.compare(password, results.rows[0].password, function(err, result) {
//       if(err){
//         throw err;
//       }
//       if(result){
//         const accessToken = jwt.sign({ name: username }, process.env.ACCESS_TOKEN_SECRET);
//         if(accessToken) {
//           res.status(200).send(result + accessToken)
//         }
//       }else res.send(result); 
//   })
//   })
// };

// function authenticateToken (req, res, next){
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if(token == null){
//     return res.sendStatus(404);
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if(err){
//       res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   })
// }

module.exports = { 
  getAllUsers
};