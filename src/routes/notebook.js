const express = require("express");
const router = express.Router();
const connection = require("../database");

router.post("/", (req, res) => {
  const { idcurso, idEstudiante, idperiodo } = req.body;
  try {
    connection.query(
      "INSERT INTO `registronota` (`idcurso`, `idEstudiante`, `idperiodo`) VALUES (?, ?, ?);",
      [idcurso, idEstudiante, idperiodo],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).send("No se agrego el registro!");
        }
        connection.query(
          "SELECT * FROM registronota WHERE idregistronota = ?",
          [rows.insertId],
          (err, rows, fields) => {
            if (err) {
              console.log(err);
              return res.status(500).send("No se agrego el registro!");
            }
            return res.status(200).send(rows[0]);
          }
        );
      }
    );
  } catch (err) {
    return res.status(500).send("No se agrego el registro!");
  }
});

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM registronota", (err, rows, fields) => {
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

router.get("/student/:id", (req, res) => {
  const { id } = req.params;
  try {
    connection.query(
      "SELECT * FROM registronota INNER JOIN nota ON registronota.idregistronota = nota.idregistronota INNER JOIN curso ON registronota.idcurso = curso.idcurso INNER JOIN competencia ON nota.idcompetencia = competencia.idcompetencia WHERE idEstudiante = ?",
      [id],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Algo salió mal!");
        }
        res.json(rows);
      }
    );
  } catch (err) {
    return res.status(500).send("Algo salió mal!");
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombreCurso, descripcionCurso } = req.body;
  try {
    connection.query(
      "UPDATE `registronota` SET `nombreCurso`=?, `descripcionCurso`=? WHERE idcurso =?",
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
