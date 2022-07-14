const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const connection = require("../database");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/", (req, res) => {
  const { user, password } = req.body;
  if (user && password) {
    connection.query(
      "SELECT * FROM docente WHERE usuario = ?",
      [user],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Something went wrong" });
        }
        if (rows.length > 0) {
          if (rows[0].contraseña !== password) {
            return res.status(401).json({ message: "Password incorrect" });
          }

          const staffUser = {
            ...rows[0],
          };
          const token = jwt.sign(
            {
              ...staffUser,
            },
            "secret"
          );
          return res.status(200).json({ token, usuario: staffUser });
        } else {
          return res.status(401).json({ message: "Usuario no encontrado" });
        }
      }
    );
  }
});

module.exports = router;
