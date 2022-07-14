const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/", (req, res) => {
  try {
    connection.query(
      "SELECT * FROM asignacion INNER JOIN grado ON asignacion.idgrado = grado.idgrado INNER JOIN curso ON asignacion.idcurso = curso.idcurso INNER JOIN docente ON asignacion.iddocente = docente.iddocente INNER JOIN seccion ON asignacion.idseccion = seccion.idseccion",
      (err, rows, fields) => {
        if (err) {
          res.status(500).send("Algo salio mal");
        }
        res.json(rows);
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego la asignacion!");
  }
});

router.get("/staff/:id", (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      "SELECT * FROM asignacion INNER JOIN grado ON asignacion.idgrado = grado.idgrado INNER JOIN curso ON asignacion.idcurso = curso.idcurso INNER JOIN docente ON asignacion.iddocente = docente.iddocente INNER JOIN seccion ON asignacion.idseccion = seccion.idseccion WHERE asignacion.iddocente = ? ",
      [id],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
          res.status(501).send("Algo salio mal");
        }
        res.json(rows);
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego la asignacion!");
  }
});

router.post("/", (req, res) => {
  const { iddocente, idcurso, idgrado, idseccion } = req.body;
  try {
    connection.query(
      "INSERT INTO `asignacion` (`iddocente`, `idcurso`, `idgrado`, `idseccion`) VALUES (?, ?, ?, ?);",
      [iddocente, idcurso, idgrado, idseccion],
      (err, rows, fields) => {
        if (err) {
          return res.status(500).send("No se agrego la asignacion!!");
        }
        res.status(200).send("Asignacion agregada!");
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego la asignacion!");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM asignacion WHERE idasignacion = ?",
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
