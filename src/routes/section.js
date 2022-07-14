const express = require("express");
const router = express.Router();
const connection = require("../database");

router.post("/", (req, res) => {
  const { idgrado, nombreSeccion } = req.body;
  try {
    connection.query(
      "INSERT INTO `seccion` (`idgrado`, `nombreSeccion`) VALUES (?, ?);",
      [idgrado, nombreSeccion],
      (err, rows, fields) => {
        if (err) {
          res.status(500).send("No se agrego la seccion!");
          console.log(err);
        }
        res.status(200).send("Seccion agregada!");
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego la seccion!");
  }
});

router.put("/:idseccion", (req, res) => {
    const { idseccion } = req.params;
    const { nombreSeccion } = req.body;
    try {
        connection.query(
            "UPDATE `seccion` SET `nombreSeccion`=? WHERE idseccion =?",
            [nombreSeccion, idseccion],
            (err, rows, fields) => {
                if (err) {
                    return res.status(500).send("No se modifico la seccion!");
                }
                return res.status(200).send("Seccion modificada!");
            }
        );
    } catch (err) {
        res.status(500).send("No se modifico la seccion!");
    }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    connection.query(
      "SELECT * FROM seccion WHERE idgrado = ?",
      [id],
      (err, rows, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).send("No se agrego la seccion!");
        }
        return res.json(rows);
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego la seccion!");
  }
});

module.exports = router;
