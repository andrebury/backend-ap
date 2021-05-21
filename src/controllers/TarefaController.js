const Tarefa = require("../models/Tarefa");
const express = require("express");
const authMiddleware = require("../midllewares/auth");
const ObjectId = require("mongoose").Types.ObjectId;
const Projeto = require("../models/Projeto");
const Usuario = require("../models/Usuario");

const router = express.Router();
router.use(authMiddleware);

function normalizeBody(body){

  if (body.pm == "") {
    body.pm = null;
  }
  if (body.funcional == "") {
    body.funcional = null;
  } 
  if (body.solicitante == "") {
    body.solicitante = null;
  } 
  return body
}

router.post("/cadastro", async (req, res) => {
  // const {
  //   titulo,
  //   projeto,
  //   solicitante,
  //   desenvolvedor,
  //   inicio,
  //   fim,
  //   status,
  //   prazo,
  //   horas,
  //   descricao,
  //   prioridade,
  //   observacoes,
  // } = req.body;

  const id_total = await Tarefa.find().count();
  //console.log("obs " + observacoes);

  req.body.tarefa_id = id_total + 1;
  const tarefas = await Tarefa.create(normalizeBody(req.body))
  // const tarefas = await Tarefa.create({
  //   tarefa_id: id_total + 1,
  //   titulo: titulo,
  //   projeto: projeto,
  //   solicitante: solicitante,
  //   desenvolvedor: desenvolvedor,
  //   inicio: inicio,
  //   fim: fim,
  //   status: status,
  //   prazo: prazo,
  //   horas: horas,
  //   descricao: descricao,
  //   prioridade: prioridade,
  //   observacoes: observacoes,
  // });

  return res.status(200).json({ tarefas, user: req.usuarioID });
});

router.post("/update", async (req, res) => {
  const {
    _id,
    titulo,
    projeto,
    solicitante,
    desenvolvedor,
    inicio,
    fim,
    status,
    prazo,
    horas,
    descricao,
    prioridade,
    observacoes,
  } = req.body;

  const tarefas = await Tarefa.updateOne(
    { _id: _id },
    {
      titulo: titulo,
      projeto: projeto,
      solicitante: solicitante == "" ? null : solicitante,
      desenvolvedor: desenvolvedor,
      inicio: inicio,
      fim: fim,
      status: status,
      prazo: prazo,
      horas: horas,
      descricao: descricao,
      prioridade: prioridade,
      observacoes: observacoes,
    }
  );

  return res.status(200).json({ tarefas, user: req.usuarioID });
});

router.post("/info", async (req, res) => {
  const {
    projeto,
    titulo,
    solicitante,
    desenvolvedor,
    funcional,
    status,
    prioridade,
  } = req.body;

  const busca = {
    titulo: titulo,
    solicitante: new ObjectId(solicitante),
    desenvolvedor: new ObjectId(desenvolvedor),
    status: status,
    prioridade: prioridade,
    projeto: new ObjectId(projeto),
    funcional: funcional,
  };

  if (req.body.titulo == undefined) {
    delete busca.titulo;
  }
  if (req.body.solicitante == undefined) {
    delete busca.solicitante;
  }
  if (req.body.desenvolvedor == undefined) {
    delete busca.desenvolvedor;
  }
  if (req.body.prioridade == undefined) {
    delete busca.prioridade;
  }
  if (req.body.projeto == undefined) {
    delete busca.projeto;
  }
  if (req.body.funcional == undefined) {
    delete busca.funcional;
  }
  if (req.body.status == undefined) {
    delete busca.status;
  }
  console.log(busca);

  try {
    const tarefas = await Tarefa.find(busca)
      .populate("projeto", "titulo")
      .populate("desenvolvedor", "nome")
      .populate("solicitante", "nome")
      .exec();

    return res.status(200).json({ tarefas, user: req.usuarioID });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ mesagem: "Não encontrado" });
  }
});

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tarefas = await Tarefa.findById(id)
      .populate("projeto", "titulo")
      .populate("desenvolvedor", "nome")
      .populate("solicitante", "nome")
      .exec();
    console.log(id);

    return res.status(200).json({ tarefas, user: req.usuarioID });
  } catch (e) {
    return res.status(400).send("Nao encontrado");
  }
});

router.get("/total", async (req, res) => {
  const {
    projeto,
    titulo,
    solicitante,
    desenvolvedor,
    funcional,
    status,
    prioridade,
  } = req.body;

  const busca = {
    titulo: titulo,
    solicitante: new ObjectId(solicitante),
    desenvolvedor: new ObjectId(desenvolvedor),
    status: status,
    prioridade: prioridade,
    projeto: new ObjectId(projeto),
    funcional: funcional,
  };

  if (req.body.titulo == undefined) {
    delete busca.titulo;
  }
  if (req.body.solicitante == undefined) {
    delete busca.solicitante;
  }
  if (req.body.desenvolvedor == undefined) {
    delete busca.desenvolvedor;
  }
  if (req.body.status == undefined) {
    delete busca.status;
  }
  if (req.body.prioridade == undefined) {
    delete busca.prioridade;
  }
  if (req.body.projeto == undefined) {
    delete busca.projeto;
  }
  if (req.body.funcional == undefined) {
    delete busca.funcional;
  }
  console.log(busca);

  try {
    const tarefas = await Tarefa.find(busca)
      .populate("projeto", "titulo")
      .populate("desenvolvedor", "nome")
      .populate("solicitante", "nome")
      .exec();

    return res.status(200).json({ tarefas, user: req.usuarioID });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ mesagem: "Não encontrado" });
  }
});

module.exports = (app) => app.use("/tarefa", router);
