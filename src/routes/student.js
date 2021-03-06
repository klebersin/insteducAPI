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

router.get("/section/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM matricula INNER JOIN estudiante ON matricula.idEstudiante = estudiante.idEstudiante  WHERE matricula.idseccion = ? ",
    [id],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
      }
      res.json(rows);
    }
  );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM estudiante WHERE NroDocIdent = ?",
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
    nombres,
    ApePaterno,
    ApeMaterno,
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
    "INSERT INTO `estudiante` (`nombres`, `ApePaterno`, `ApeMaterno`, `Celular`, `Correo`, `Direccion`, `Sexo`, `Departamento`, `Distrito`, `TipoDocumento`, `NroDocIdent`, `DniPadre`, `nombrePadre`, `apellidosPadre`, `CeluPadre`, `DniMadre`, `nombreMadre`, `apellidosMadre`, `CeluMadre`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    insertQuery,
    [
      nombres,
      ApePaterno,
      ApeMaterno,
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
      res.json(rows);
    }
  );
});
router.put("/:idEstudiante", (req, res) => {
  const { idEstudiante } = req.params;

  const {
    nombres,
    ApePaterno,
    ApeMaterno,
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
    "UPDATE `estudiante` SET `nombres`= ?,  `ApePaterno`= ?,  `ApeMaterno`= ?,  `Celular`= ?,  `Correo`= ?,  `Direccion`= ?,  `Sexo`= ?,  `Departamento`= ?,  `Distrito`= ?,  `TipoDocumento`= ?,  `NroDocIdent`= ?,  `DniPadre`= ?,  `nombrePadre`= ?,  `apellidosPadre`= ?,  `CeluPadre`= ?,  `DniMadre`= ?,  `nombreMadre`= ?,  `apellidosMadre`= ?,  `CeluMadre`= ? WHERE idEstudiante = ?";

  connection.query(
    insertQuery,
    [
      nombres,
      ApePaterno,
      ApeMaterno,
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
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM estudiante WHERE idEstudiante = ?",
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
