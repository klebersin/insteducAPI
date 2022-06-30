const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM grado", (err, rows, fields) => {
      if (err) {
        res.status(500).send("Algo salio mal");
      }
      res.json(rows);
    });
  } catch (err) {
    res.status(500).send("No se agrego el grado!");
  }
});

router.post("/", (req, res) => {
  const { NombreGrado, Descripcion } = req.body;
  try {
    connection.query(
      "INSERT INTO `grado` (`nombreGrado`, `descripcionGrado`) VALUES (?, ?);",
      [NombreGrado, Descripcion],
      (err, rows, fields) => {
        if (err) {
          res.status(500).send("No se agrego el grado!");
        }
        res.status(200).send("Grado agregado!");
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego el grado!");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  connection.query(
    "DELETE FROM grado WHERE idgrado = ?",
    [id],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      }
      res.json(rows);
    }
  );
});

module.exports = router;
