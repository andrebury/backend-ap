const Tarefa = require('../models/Tarefa')
const Projeto = require('../models/Projeto')
const Usuario = require('../models/Usuario')

const ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
    async index(req, res) {
        const {projeto,titulo, solicitante, desenvolvedor, funcional, status, prioridade} = req.body;
        
        const busca = {
            'titulo': titulo,
            'solicitante': solicitante,
            'desenvolvedor': new ObjectId(desenvolvedor),
            'status' : ['Desenho','Aguardando GMUD','Desenvolvimento','Homologando'],
            'prioridade': prioridade,
            'projeto' :  new ObjectId(projeto),
            'funcional' : funcional
        }
        
        if(req.body.titulo == undefined){delete busca.titulo}
        if(req.body.solicitante == undefined){delete busca.solicitante}
        if(req.body.desenvolvedor == undefined){delete busca.desenvolvedor}
        if(req.body.prioridade == undefined){delete busca.prioridade}
        if(req.body.projeto == undefined){delete busca.projeto}
        if(req.body.funcional == undefined){delete busca.funcional}
        console.log(busca)

        
        try{
            const tarefas = await Tarefa.find(busca)
                .populate('desenvolvedor')
                .populate('projeto')
                    .exec()
                    
            return res.status(200).json(tarefas)
        }
        catch(e){
            console.log(e)
            return res.status(400).json({'mesagem': 'Não encontrado'})
        }
        

        
    },


    async indextotal(req, res) {
        const {projeto,titulo, solicitante, desenvolvedor, funcional, status, prioridade} = req.body;
        
        const busca = {
            'titulo': titulo,
            'solicitante': solicitante,
            'desenvolvedor': new ObjectId(desenvolvedor),
            'status': status,
            'prioridade': prioridade,
            'projeto' :  new ObjectId(projeto),
            'funcional' : funcional
        }
        
        if(req.body.titulo == undefined){delete busca.titulo}
        if(req.body.solicitante == undefined){delete busca.solicitante}
        if(req.body.desenvolvedor == undefined){delete busca.desenvolvedor}
        if(req.body.status == undefined){delete busca.status}
        if(req.body.prioridade == undefined){delete busca.prioridade}
        if(req.body.projeto == undefined){delete busca.projeto}
        if(req.body.funcional == undefined){delete busca.funcional}
        console.log(busca)

        
        try{
            const tarefas = await Tarefa.find(busca)
                .populate('desenvolvedor')
                .populate('projeto')
                    .exec()
                    
            return res.status(200).json(tarefas)
        }
        catch(e){
            console.log(e)
            return res.status(400).json({'mesagem': 'Não encontrado'})
        }
        

        
    },
    
    async indexbyid(req, res) {
        const {id} = req.params;
        
        try{
            const tarefas = await Tarefa.findById(id)
                .populate('projeto')
                .populate('desenvolvedor')
                .exec();

            return res.status(200).json(tarefas)

        }catch(e){
            return res.status(400).send('Nao encontrado')
        }
    },

    async store(req, res) {
        const { titulo,projeto, solicitante,desenvolvedor,inicio,fim,
        status,prazo,horas,descricao,prioridade ,observacoes} = req.body;
        const id_total = await Tarefa.find().count()
        console.log('obs ' + observacoes)

        const tarefas = await Tarefa.create({
            'tarefa_id': id_total + 1,
            'titulo': titulo,
            'projeto' : projeto,
            'solicitante': solicitante,
            'desenvolvedor': desenvolvedor,
            'inicio': inicio,
            'fim': fim,
            'status': status,
            'prazo': prazo,
            'horas': horas,
            'descricao': descricao,
            'prioridade': prioridade,  
            'observacoes' : observacoes
        })


        return res.status(200).json(tarefas);
    },

    async update(req, res) {
        const { _id, titulo,projeto, solicitante,desenvolvedor,inicio,fim,
        status,prazo,horas,descricao,prioridade,observacoes } = req.body;

        console.log('id ' + _id + 'obs ' + observacoes)
        const tarefas = await Tarefa.updateOne({ _id : _id },{
            'titulo': titulo,
            'projeto' : projeto,
            'solicitante': solicitante,
            'desenvolvedor': desenvolvedor,
            'inicio': inicio,
            'fim': fim,
            'status': status,
            'prazo': prazo,
            'horas': horas,
            'descricao': descricao,
            'prioridade': prioridade,
            'observacoes': observacoes
        })


        return res.status(200).json(tarefas);
    }
}