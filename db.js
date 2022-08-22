const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    database_url: process.env.process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    ssl: {
        rejectUnauthorized: false
      }
})

// const pool = new Pool({
//   user: "postgres",
//   password: "1999",
//   database: "nakama",
//   host: "localhost",
//   port: 5432
// })

module.exports = pool