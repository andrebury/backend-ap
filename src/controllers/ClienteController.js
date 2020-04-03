const Cliente = require('../models/Cliente')

module.exports = {
async indexbyid(req, res) {
        const {id} = req.params;
        
        try{
            const clientes = await Cliente.findById(id)

            return res.status(200).json(clientes)

        }catch(e){
            return res.status(400).send('Nao encontrado')
        }
    },

    async index(req, res) {
        
        try{
            const clientes = await Cliente.find()

            return res.status(200).json(clientes)

        }catch(e){
            return res.status(400).send('Nao encontrado')
        }
    },

    async store(req, res) {

        const { filename } = req.file;

        const { solicitantes, nome, ramo } = req.body;
        
        const id_total = await Cliente.find().count()

        const clientes = await Cliente.create({
            cliente_id: id_total + 1,
            foto: filename,
            nome: nome,
            solicitantes : solicitantes.split(',').map(solicitante => solicitante.trim()),
            ramo: ramo 
        })

        return res.status(200).json(clientes);
    }
}