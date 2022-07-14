const express = require("express");
const router = express.Router();
const connection = require("../database");

router.post("/", (req, res) => {
  const { idcurso, descripcion } = req.body;
  try {
    connection.query(
      "INSERT INTO `competencia` (`idcurso`, `descripcion`) VALUES (?, ?);",
      [idcurso, descripcion],
      (err, rows, fields) => {
        if (err) {
          console.error(err);
          return res.status(500).send("No se agrego la competencia!");
        }
        return res.status(200).send("competencia agregada!");
      }
    );
  } catch (err) {
    res.status(500).send("No se agrego la competencia!");
  }
});

router.get("/course/:idcurso", (req, res) => {
  const { idcurso } = req.params;
  try {
    connection.query(
      "SELECT * FROM competencia WHERE idcurso=?",
      [idcurso],
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
  const { descripcion } = req.body;
  try {
    connection.query(
      "UPDATE `competencia` SET `descripcion`=? WHERE idcompetencia =?",
      [descripcion, id],
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
module.exports = router;
