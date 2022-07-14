const express = require("express");
const router = express.Router();
const connection = require("../database");

router.post("/", (req, res) => {
  const {
    nombres,
    apePaterno,
    apeMaterno,
    celular,
    correo,
    sexo,
    usuario,
    contraseña,
    direccion,
    rol,
  } = req.body;
  try {
    connection.query(
      "INSERT INTO `docente` (`nombres`, `apePaterno`, `apeMaterno`, `celular`, `correo`, `sexo`, `usuario`, `contraseña`, `direccion`, `rol`) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?);",
      [
        nombres,
        apePaterno,
        apeMaterno,
        celular,
        correo,
        sexo,
        usuario,
        contraseña,
        direccion,
        rol,
      ],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).send("No se agrego el docente!");
        }
        return res.status(200).send("Docente agregado!");
      }
    );
  } catch (err) {
    return res.status(500).send("No se agrego el docente!");
  }
});

router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM docente", (err, rows, fields) => {
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
  try {
    const { id } = req.params;
    const {
      nombres,
      apePaterno,
      apeMaterno,
      celular,
      correo,
      sexo,
      direccion,
      usuario,
      contraseña,
      rol,
    } = req.body;
    connection.query(
      "UPDATE `docente` SET `nombres`= ?, `apePaterno`= ?, `apeMaterno`= ?, `celular`= ?, `correo`= ?, `sexo`= ?,`usuario`= ?, `contraseña`= ?, `direccion`= ?, `rol`= ? WHERE iddocente = ?",
      [
        nombres,
        apePaterno,
        apeMaterno,
        celular,
        correo,
        sexo,
        usuario,
        contraseña,
        direccion,
        rol,
        id,
      ],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).send("No se actualizo el docente!");
        }
        return res.status(200).send("Docente actualizado!");
      }
    );
  } catch (err) {
    return res.status(500).send("Algo salió mal!");
  }
});

module.exports = router;
