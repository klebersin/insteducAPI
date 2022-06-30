const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/", (req, res) => {
  connection.query(
    "SELECT nombreGrado, fechaMatricula, nombreSeccion, nombres, ApePaterno, NroDocIdent  FROM matricula INNER JOIN grado ON matricula.idgrado = grado.idgrado INNER JOIN seccion ON matricula.idseccion = seccion.idseccion INNER JOIN estudiante ON matricula.idEstudiante = estudiante.idEstudiante;",
    (err, rows, fields) => {
      if (err) {
        res.status(500).send("Algo salio mal");
      }
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { idgrado, idseccion, idEstudiante, fechaMatricula } = req.body;
  try {
    connection.query(
      "INSERT INTO `matricula` (`idgrado`, `idseccion`, `idEstudiante`, `fechaMatricula`) VALUES (?, ?, ?, ?);",
      [idgrado, idseccion, idEstudiante, fechaMatricula],
      (err, rows, fields) => {
        if (err) {
          res.status(500).send("No se agrego la matricula!");
          console.log(err);
        }
        res.status(200).send("Matricula exitosa!");
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego la matricula!");
  }
});

module.exports = router;
