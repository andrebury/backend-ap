const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: ".env",
});

module.exports = {
  async store(req, res) {
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
  },

  async index(req, res) {
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
  },

  async indexbyid(req, res) {
    const { id } = req.params;

    try {
      const usuarios = await Usuario.findById(id).exec();

      return res.status(200).json({ usuarios, userid: req.usuarioID });
    } catch (e) {
      return res.status(400).send("Nao encontrado");
    }
  },

  async authUser(req, res) {
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
  },
};
