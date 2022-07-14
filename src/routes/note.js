const express = require("express");
const router = express.Router();
const connection = require("../database");

router.post("/", async (req, res) => {
  const { idregistronota, notas } = req.body;
  try {
    await Promise.all(
      notas.map((nota) => {
        connection.query(
          "INSERT INTO `nota` (`idregistronota`, `idcompetencia`, `nota`) VALUES (?, ?, ?);",
          [idregistronota, nota.idcompetencia, nota.nota],
          (err, rows, fields) => {
            if (err) {
              return res.status(500).send("No se agrego la nota!");
            }
          }
        );
      })
    );

    return res.status(200).send("Notas agregadas!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("No se agrego la nota!");
  }
});

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM curso", (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Algo salió mal!");
      }
      res.json(rows);
    });
  } catch (err) {
    return res.status(500).send("Algo salió mal!");
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombreCurso, descripcionCurso } = req.body;
  try {
    connection.query(
      "UPDATE `curso` SET `nombreCurso`=?, `descripcionCurso`=? WHERE idcurso =?",
      [nombreCurso, descripcionCurso, id],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).send("No se modifico el curso!");
        }
        return res.status(200).send("Seccion modificada!");
      }
    );
  } catch (err) {
    res.status(500).send("No se modifico la seccion!");
  }
});

module.exports = router;
