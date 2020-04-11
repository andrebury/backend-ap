const Cliente = require("../models/Cliente");

module.exports = {
  async indexbyid(req, res) {
    const { id } = req.params;

    try {
      const clientes = await Cliente.findById(id);

      return res.status(200).json({ clientes, user: req.usuarioID });
    } catch (e) {
      return res.status(400).send("Nao encontrado");
    }
  },

  async index(req, res) {
    try {
      const clientes = await Cliente.find();

      return res.status(200).json({ clientes, user: req.usuarioID });
    } catch (e) {
      return res.status(400).send("Nao encontrado");
    }
  },

  async store(req, res) {
    const { solicitantes, nome, ramo } = req.body;

    const id_total = await Cliente.find().countDocuments();
    console.log(id_total);
    const clientes = await Cliente.create({
      cliente_id: id_total + 1,
      nome: nome,
      solicitantes: solicitantes
        .split(",")
        .map((solicitante) => solicitante.trim()),
      ramo: ramo,
    });

    return res.status(200).json({ clientes, user: req.usuarioID });
  },

  async update(req, res) {
    const { _id, cliente_id, solicitantes, nome, ramo } = req.body;

    const cliente = await Cliente.updateOne(
      { _id: _id },
      {
        cliente_id: cliente_id,
        nome: nome,
        solicitantes: solicitantes
          .split(",")
          .map((solicitante) => solicitante.trim()),
        ramo: ramo,
      }
    );

    return res.status(200).json({ cliente, user: req.usuarioID });
  },
};
