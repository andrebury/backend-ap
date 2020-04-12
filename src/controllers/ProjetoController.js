const Projeto = require("../models/Projeto");
const express = require("express");
const authMiddleware = require("../midllewares/auth");

const router = express.Router();

router.use(authMiddleware);

router.post("/cadastro", async (req, res) => {
  const {
    cliente,
    titulo,
    descricao,
    solicitante_cliente,
    pm,
    funcional,
    prazo,
    inicio,
    fim,
    status_projeto,
    horas,
    prioridade,
    observacoes,
  } = req.body;

  const id_total = await Projeto.find().count();

  const projetos = await Projeto.create({
    projeto_id: id_total + 1,
    cliente: cliente,
    titulo: titulo,
    descricao: descricao,
    solicitante_cliente: solicitante_cliente,
    pm: pm,
    funcional: funcional,
    prazo: prazo,
    inicio: inicio,
    fim: fim,
    status_projeto: status_projeto,
    horas: horas,
    prioridade: prioridade,
    observacoes: observacoes,
  });

  return res.status(200).json(projetos, { user: req.usuarioID });
});

router.post("/update", async (req, res) => {
  const {
    _id,
    cliente,
    titulo,
    descricao,
    solicitante_cliente,
    pm,
    funcional,
    prazo,
    inicio,
    fim,
    status_projeto,
    horas,
    prioridade,
    observacoes,
  } = req.body;

  const projetos = await Projeto.updateOne(
    { _id: _id },
    {
      cliente: cliente,
      titulo: titulo,
      descricao: descricao,
      solicitante_cliente: solicitante_cliente,
      pm: pm,
      funcional: funcional,
      prazo: prazo,
      inicio: inicio,
      fim: fim,
      status_projeto: status_projeto,
      horas: horas,
      prioridade: prioridade,
      observacoes: observacoes,
    }
  )
    .populate("cliente")
    .populate("funcional", "nome")
    .populate("pm", "nome")
    .exec();

  return res.status(200).json(projetos, { user: req.usuarioID });
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
    status_projeto: [
      "Aprovado",
      "Desenho",
      "Desenvolvimento",
      "Testes",
      "Homologação",
      "Pós Implantação",
    ],
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

router.get("/:id", async (req, res) => {
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

    return res.status(200).json(projetos, { user: req.usuarioID });
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

  return res.status(200).json(projetos, { user: req.usuarioID });
});

module.exports = (app) => app.use("/projeto", router);
