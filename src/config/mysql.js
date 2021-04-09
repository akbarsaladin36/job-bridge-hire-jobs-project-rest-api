const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tiketinaja'
})

connection.connect((error) => {
  if (error) throw error
  console.log("You're now Connected...")
})

module.exports = connection
