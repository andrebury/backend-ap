const Usuario = require("../models/Usuario");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: ".env",
});

const router = express.Router();

router.post("/cadastro", async (req, res) => {
  const { email } = req.body;

  try {
    if (await Usuario.findOne({ email })) {
      return res.status(400).send({ error: "Usuario ja existe" });
    }

    const id_total = await Usuario.find().count();
    const data = req.body;
    data.usuario_id = id_total + 1;

    const usuario = await Usuario.create(data);

    usuario.senha = undefined;

    return res.status(200).send({ usuario });
  } catch (e) {
    return res.status(400).send({ erro: "Falha no registro" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email }).select("+ senha");

  if (!usuario) {
    return res.status(400).send({ error: "Usuario nao existe" });
  }
  if (!(await bcrypt.compare(senha, usuario.senha))) {
    return res.status(400).send({ erro: "senha invalida" });
  }
  usuario.senha = undefined;

  const token = jwt.sign({ id: usuario._id }, process.env.SECRET, {
    expiresIn: 86400,
  });

  res.send({ usuario, token }).status(200);
});

module.exports = (app) => app.use("/usuario/", router);
