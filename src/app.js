const express = require("express");
const mysql = require("mysql");
const cors = require('cors')

const app = express();

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));
const connection = mysql.createConnection({
    hst: "localhost",
    user: "root",
    password: "1234",
    database: "insteduc"
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(require('./routes'));
app.use('/login', require('./routes/authentication'));

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected to database")
})

app.listen(4000, ()=> {
    console.log("Servidor en puerto 4000")
})