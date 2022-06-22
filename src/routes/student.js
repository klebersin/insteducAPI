const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM estudiante", (err, rows, fields) => {
    if (err) {
      console.log(err);
    }

    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  console.log("here");
  const { id } = req.params;
  connection.query(
    "SELECT * FROM estudiante WHERE idEstudiante = ?",
    [id],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      }
      res.json(rows[0]);
    }
  );
});

router.post("/", (req, res) => {
  const {
    idEstudiante,
    nombres,
    ApePaterno,
    ApeMaterno,
    FechaNac,
    Celular,
    Correo,
    Direccion,
    Sexo,
    Departamento,
    Distrito,
    TipoDocumento,
    NroDocIdent,
    DniPadre,
    nombrePadre,
    apellidosPadre,
    CeluPadre,
    DniMadre,
    nombreMadre,
    apellidosMadre,
    CeluMadre,
  } = req.body;
  const insertQuery =
    "INSERT INTO `estudiante` (`idEstudiante`, `nombres`, `ApePaterno`, `ApeMaterno`, `FechaNac`, `Celular`, `Correo`, `Direccion`, `Sexo`, `Departamento`, `Distrito`, `TipoDocumento`, `NroDocIdent`, `DniPadre`, `nombrePadre`, `apellidosPadre`, `CeluPadre`, `DniMadre`, `nombreMadre`, `apellidosMadre`, `CeluMadre`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    insertQuery,
    [
      idEstudiante,
      nombres,
      ApePaterno,
      ApeMaterno,
      FechaNac,
      Celular,
      Correo,
      Direccion,
      Sexo,
      Departamento,
      Distrito,
      TipoDocumento,
      NroDocIdent,
      DniPadre,
      nombrePadre,
      apellidosPadre,
      CeluPadre,
      DniMadre,
      nombreMadre,
      apellidosMadre,
      CeluMadre,
    ],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      }
      res.json(rows[0]);
    }
  );
});
router.put("/", (req, res) => {
  const {
    idEstudiante,
    nombres,
    ApePaterno,
    ApeMaterno,
    FechaNac,
    Celular,
    Correo,
    Direccion,
    Sexo,
    Departamento,
    Distrito,
    TipoDocumento,
    NroDocIdent,
    DniPadre,
    nombrePadre,
    apellidosPadre,
    CeluPadre,
    DniMadre,
    nombreMadre,
    apellidosMadre,
    CeluMadre,
  } = req.body;
  const insertQuery =
    "UPDATE `estudiante` SET `nombres` = ?, `ApePaterno` = ?, `ApeMaterno` = ?, `FechaNac` = ?, `Celular` = ?, `Correo` = ?, `Direccion` = ?, `Sexo` = ?, `Departamento` = ?, `Distrito` = ?, `TipoDocumento` = ?, `NroDocIdent` = ?, `DniPadre` = ?, `nombrePadre` = ?, `apellidosPadre` = ?, `CeluPadre` = ?, `DniMadre` = ?, `nombreMadre` = ?, `apellidosMadre` = ?, `CeluMadre` = ? WHERE idEstudiante = ?";
  connection.query(
    insertQuery,
    [
      nombres,
      ApePaterno,
      ApeMaterno,
      FechaNac,
      Celular,
      Correo,
      Direccion,
      Sexo,
      Departamento,
      Distrito,
      TipoDocumento,
      NroDocIdent,
      DniPadre,
      nombrePadre,
      apellidosPadre,
      CeluPadre,
      DniMadre,
      nombreMadre,
      apellidosMadre,
      CeluMadre,
      idEstudiante,
    ],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      }
      res.json(rows[0]);
    }
  );
});
router.delete("/", (req, res) => {
  const { idEstudiante } = req.body;
  connection.query(
    "DELETE FROM estudiante WHERE idEstudiante = ?",
    [idEstudiante],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      }
      res.json(rows);
    }
  );
});

module.exports = router;
