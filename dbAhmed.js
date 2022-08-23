// // const { Pool } = require('pg');
// require("dotenv").config();

// // const pool = new Pool({
// //     user: process.env.USER,
// //     password: process.env.PASSWORD,
// //     database: process.env.DATABASE,
// //     // database_url: process.env.process.env.DATABASE,
// //     host: process.env.HOST,
// //     port: process.env.PORT,
// //     ssl: {
// //         rejectUnauthorized: false
// //       }
// // })



// const { Client } = require('pg');
// const client = new Client({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   host: process.env.HOST,
//   port: process.env.PORT,
//   ssl: {
//       rejectUnauthorized: false
//     }

// });
// // const client = new Client({
// //   user: "postgres",
// //   password: "1999",
// //   database: "nakama",
// //   host: "localhost",
// //   port: 5432
// // })

// client.connect();



// const getAllUsers = (request, response) => {
//   client.query("SELECT * FROM users;", (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).json(results.rows);
//     }
//   );
// };

// module.exports = {getAllUsers}

// // module.exports = pool