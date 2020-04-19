const Usuario = require("../models/Usuario");
const express = require("express");

const router = express.Router();

const authMiddleware = require("../midllewares/auth");
router.use(authMiddleware);

router.post("/info", async (req, res) => {
  const { nome, funcao, email } = req.body;

  const busca = {
    nome: nome,
    funcao: funcao,
    email: email,
  };

  if (req.body.nome == undefined) {
    delete busca.nome;
  }
  if (req.body.funcao == undefined) {
    delete busca.funcao;
  }
  if (req.body.email == undefined) {
    delete busca.email;
  }

  await Usuario.find(busca, function (err, usr) {
    if (err) return res.statur(404);

    return res.status(200).json({ usr, user: req.usuarioID });
  });
});

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuarios = await Usuario.findById(id).exec();

    return res.status(200).json({ usuarios, userid: req.usuarioID });
  } catch (e) {
    return res.status(400).send("Nao encontrado");
  }
});

module.exports = (app) => app.use("/userinfo", router);
