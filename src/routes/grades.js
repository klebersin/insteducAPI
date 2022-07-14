const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM grado", (err, rows, fields) => {
      if (err) {
        return res.status(500).send("Algo salio mal");
      }
      return res.json(rows);
    });
  } catch (err) {
    res.status(500).send("No se agrego el grado!");
  }
});

router.post("/", (req, res) => {
  const { nombreGrado, descripcionGrado } = req.body;
  try {
    connection.query(
      "INSERT INTO `grado` (`nombreGrado`, `descripcionGrado`) VALUES (?, ?);",
      [nombreGrado, descripcionGrado],
      (err, rows, fields) => {
        if (err) {
          return res.status(500).send("No se agrego el grado!");
        }
        return res.status(200).send("Grado agregado!");
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego el grado!");
  }
});
router.put("/:idgrado", (req, res) => {
  const { idgrado } = req.params;
  const { nombreGrado, descripcionGrado } = req.body;
  try {
    connection.query(
        "UPDATE `grado` SET `nombreGrado`=?, `descripcionGrado`=? WHERE idgrado =?",
        [nombreGrado, descripcionGrado, idgrado],
        (err, rows, fields) => {
          if (err) {
            return res.status(500).send("No se agrego el grado!");
          }
          return res.status(200).send("Grado agregado!");
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
