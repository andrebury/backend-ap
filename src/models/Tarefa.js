const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TarefaSchema = new Schema({
  tarefa_id: {
    type: Number,
  },
  titulo: {
    type: String,
  },  
  projeto: {        
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Projeto',
  },
  
  solicitante: {
    type: String,
  },
  desenvolvedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
    inicio: {
      type: String,
  },
    fim: {
      type: String,
  },
    status: {
    type: String,
    default: 'Aberta'
  },
  prazo: {
    type: String,
  },
    horas: {
    type: Number,
    default: 0
  },
    descricao: {
    type: String,
  },
    prioridade: {
    type: String,
    default: 'Média'
  },
    observacoes: {
    type: String,
    default: 'Normal'
}
});



module.exports = mongoose.model('Tarefa', TarefaSchema);

// CREATE TABLE tarefas
// (
// 	tarefa_id int NOT NULL AUTO_INCREMENT,
// 	projeto INT(6) NULL,
// 	solicitante VARCHAR(50) NULL,
// 	desenvolvedor INT(6) NULL, 
// 	inicio TIMESTAMP NULL,
// 	fim TIMESTAMP NULL,
// 	status VARCHAR(30) NULL, 
// 	prazo TIMESTAMP NULL,
// 	horas INT NULL,
// 	descricao LONGTEXT NULL, 
// 	titulo VARCHAR(50) NULL,
// 	prioridade VARCHAR(30) NULL,
// 	PRIMARY KEY (tarefa_id)
// );