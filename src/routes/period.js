const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM periodo", (err, rows, fields) => {
      if (err) {
        return res.status(500).send("Algo salio mal");
      }
      return res.json(rows);
    });
  } catch (err) {
    res.status(500).send("No se agrego el periodo!");
  }
});

router.post("/", (req, res) => {
  const { nombre, descripcion, anio } = req.body;
  try {
    connection.query(
      "INSERT INTO `periodo` (`nombre`, `descripcion`, `anio`) VALUES (?, ?, ?);",
      [nombre, descripcion, anio],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).send("No se agrego el periodo!");
        }
        res.status(200).send("periodo agregado!");
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego el periodo!");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  connection.query(
    "DELETE FROM periodo WHERE idperiodo = ?",
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
