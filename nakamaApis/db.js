const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "1999",
    database: "nakama",
    host: "localhost",
    port: 5432
})

module.exports = pool