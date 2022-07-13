const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connection = require("../database");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/", cors(), (req, res) => {
  const { user, password } = req.body;

  if (user && password) {
    connection.query(
      "SELECT * FROM docente WHERE usuario = ?",
      [user],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
        }
        if (rows.length > 0) {
          if (rows[0].contraseña === password) {
            const docenteUser = {
              ...rows[0],
              contraseña: undefined,
              rol: "docente",
            };
            const token = jwt.sign(
              {
                id: rows[0].iddocente,
                nombre: rows[0].nombres,
                apellido: rows[0].apePaterno,
                celular: rows[0].celular,
                correo: rows[0].correo,
                rol: "docente",
              },
              "secret"
            );
            return res.json({ token, usuario: docenteUser });
          }
        }
      }
    );
    connection.query(
      "SELECT * FROM administrador WHERE usuario = ?",
      [user],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
        }
        if (rows.length > 0) {
          if (rows[0].contraseña === password) {
            const adminUser = {
              ...rows[0],
              contraseña: undefined,
              rol: "administrador",
            };
            const token = jwt.sign(
              {
                ...adminUser,
              },
              "secret"
            );
            return res.json({ token, usuario: adminUser });
          }
        }
      }
    );
    res.status(401).send("Usuario o contraseña incorrectos");
  } else {
    res.json({
      message: "Error",
    });
  }
});

module.exports = router;
