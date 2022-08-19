const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    ssl: {
        rejectUnauthorized: false
      }
})

module.exports = pool