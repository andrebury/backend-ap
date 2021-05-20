const Projeto = require("../models/Projeto");
const express = require("express");
const authMiddleware = require("../midllewares/auth");

const router = express.Router();

router.use(authMiddleware);

function normalizeBody(body){

  if (body.pm == "") {
    body.pm = null;
  }
  if (body.funcional == "") {
    body.funcional = null;
  } 
  return body
}

router.post("/cadastro", async (req, res) => {
  const id_total = (await Projeto.find().countDocuments()) + 1;

  req.body.projeto_id = id_total + 1;
  delete req.body._id;
  const projetos = await Projeto.create(normalizeBody(req.body));

  return res.send({ projetos, user: req.usuarioID });
});

router.post("/update", async (req, res) => {
  const projetos = await Projeto.updateOne({ _id: req.body._id }, req.body)
    .populate("cliente")
    .populate("funcional", "nome")
    .populate("pm", "nome")
    .exec();

  return res.status(200).json({ projetos, user: req.usuarioID });
});

router.get("/info", async (req, res) => {
  const {
    titulo,
    solicitante_cliente,
    pm,
    funcional,
    prioridade,
    projeto_id,
  } = req.query;

  const busca = {
    titulo: titulo,
    solicitante_cliente: solicitante_cliente,
    pm: pm,
    funcional: funcional,
    prioridade: prioridade,
    projeto_id: projeto_id,
    status_projeto: status_projeto,
  };

  if (req.query.titulo == undefined) {
    delete busca.titulo;
  }
  if (req.query.solicitante_cliente == undefined) {
    delete busca.solicitante_cliente;
  }
  if (req.query.pm == undefined) {
    delete busca.pm;
  }
  if (req.query.funcional == undefined) {
    delete busca.funcional;
  }
  if (req.query.prioridade == undefined) {
    delete busca.prioridade;
  }
  if (req.query.projeto_id == undefined) {
    delete busca.projeto_id;
  }

  const projetos = await Projeto.find(busca)
    .populate("cliente")
    .populate("funcional", "nome")
    .populate("pm", "nome")
    .exec();

  return res.status(200).json({ projetos, user: req.usuarioID });
});

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  let projetos;
  try {
    if (id.length < 10) {
      projetos = await Projeto.find({ projeto_id: id })
        .populate("cliente")
        .populate("funcional", "nome")
        .populate("pm", "nome")
        .exec();
    } else {
      projetos = await Projeto.findById(id)
        .populate("cliente")
        .populate("funcional", "nome")
        .populate("pm", "nome")
        .exec();
    }

    return res.status(200).json({ projetos, user: req.usuarioID });
  } catch (e) {
    return res.status(400).send("Nao encontrado");
  }
});

router.get("/total", async (req, res) => {
  const {
    titulo,
    solicitante_cliente,
    pm,
    funcional,
    status_projeto,
    prioridade,
    projeto_id,
  } = req.query;

  const busca = {
    titulo: titulo,
    solicitante_cliente: solicitante_cliente,
    pm: pm,
    funcional: funcional,
    status_projeto: status_projeto,
    prioridade: prioridade,
    projeto_id: projeto_id,
  };

  if (req.query.titulo == undefined) {
    delete busca.titulo;
  }
  if (req.query.solicitante_cliente == undefined) {
    delete busca.solicitante_cliente;
  }
  if (req.query.pm == undefined) {
    delete busca.pm;
  }
  if (req.query.funcional == undefined) {
    delete busca.funcional;
  }
  if (req.query.status_projeto == undefined) {
    delete busca.status_projeto;
  }
  if (req.query.prioridade == undefined) {
    delete busca.prioridade;
  }
  if (req.query.projeto_id == undefined) {
    delete busca.projeto_id;
  }

  const projetos = await Projeto.find(busca)
    .populate("cliente")
    .populate("funcional", "nome")
    .populate("pm", "nome")
    .exec();

  return res.status(200).json({ projetos, user: req.usuarioID });
});

module.exports = (app) => app.use("/projeto", router);
