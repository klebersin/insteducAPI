const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes"));
app.use("/login", require("./routes/authentication"));
app.use("/student", require("./routes/student.js"));
app.use("/grade", require("./routes/grades"));
app.use("/register", require("./routes/register"));
app.use("/section", require("./routes/section"));

app.listen(4000, () => {
  console.log("Servidor en puerto 4000");
});
