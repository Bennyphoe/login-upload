const mysql = require('mysql2')
const dbConfig = require('../config').db

const pool = mysql.createPool(dbConfig).promise()


export default pool