const mysql = require("mysql");

const connection = mysql.createConnection({
  hst: "localhost",
  user: "root",
  password: "1234",
  database: "insteduc",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB is connected");
  }
});

module.exports = connection;
