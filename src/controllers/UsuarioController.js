const Usuario = require("../models/Usuario");

module.exports = {
  async store(req, res) {
    const { nome, funcao, email, senha, habilidades, foto, date } = req.body;
    const id_total = await Usuario.find().count();

    const usuario = await Usuario.create({
      usuario_id: id_total + 1,
      nome: nome,
      funcao: funcao,
      email: email,
      senha: senha,
      habilidades: habilidades,
      foto: foto,
      date: date,
    });

    return res.status(200).json(usuario);
  },

  async index(req, res) {
    const { nome, funcao, email, senha } = req.body;

    const busca = {
      nome: nome,
      funcao: funcao,
      email: email,
      senha: senha,
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
    if (req.body.senha == undefined) {
      delete busca.senha;
    }

    await Usuario.find(busca, "nome _id funcao email", function (err, usr) {
      if (err) return res.statur(404);
      console.log(usr);
      return res.status(200).json(usr);
    });
  },

  async indexbyid(req, res) {
    const { id } = req.params;

    try {
      const usuarios = await Usuario.findById(id, { senha: 0 }).exec();

      return res.status(200).json(usuarios);
    } catch (e) {
      return res.status(400).send("Nao encontrado");
    }
  },
};
