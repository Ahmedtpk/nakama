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
// const client = new Client({
//   user: "postgres",
//   password: "1999",
//   database: "nakama",
//   host: "localhost",
//   port: 5432
// })

// client.connect();

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

const getAllFamiles = (request, response) => {
  client.query(
    "SELECT * FROM family;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getAllPosts = (request, response) => {
  client.query(
    "SELECT * FROM posts;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (username, password, hashedPassword, req, res) => {
  client.query(
    "INSERT INTO users (userName, password, hashedPasword ) VALUES ($1, $2, $3);", [username, password, hashedPassword],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200);
    }
  );
};

const loginplz = (username, password, hashedPassword, req, res) => {
  console.log(username)

    client.query(
    "SELECT * FROM users;",
    (error, results) => {
      if (error) {
        throw error;
      }
      results.rows.forEach(element => {
        if (element.username == username) {
          if (element.password == password){
            res.end(['riktig password, du er nå looget inn med ' + element.id])
          } else res.end('feil password')
        }
      });
      // console.log(results.rows)
    }
  );

};
const createPost = (userId, family_id, title, description, meatinTime, postTime) => {
  client.query("INSERT INTO posts (user_id, family_id, title, description, meating_time, post_time) VALUES ($1, $2, $3, $4, $5, $6);", [ userId, family_id, title, description, meatinTime, postTime],
   (error, results) => {
    if (error) {
      throw error
    } else return
  })
}

const validateUserLogin = (noe) => {
  // check if pasword and user name exist
  console.log(noe)
  // client.query(
  //   "SELECT * FROM users;",
  //   (error, results) => {
  //     if (error) {
  //       throw error;
  //     }
  //     results.rows.forEach(element => {
  //       if (element.username === username) {
  //         if (element.password === pasword){
  //           response.send('riktig password')
  //         }
  //       } else (response.send('wrong username or password'))
  //     });
  //     // console.log(results.rows)
  //   }
  // );
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
  getAllUsers,
  getAllFamiles,
  createUser,
  validateUserLogin,
  loginplz,
  createPost,
  getAllPosts
};