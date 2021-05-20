const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const ProjetoSchema = new Schema({
  projeto_id: {
    type: Number,
  },
  cliente: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    default: null 
  },
  titulo: {
    type: String,
  },
    descricao: {
    type: String,
  },
    pm: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      default: null 
    },
    funcional: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      default: null 
    },
    prazo: {
    type: String,
  },
    inicio: {
    type: String,
  },
    fim: {
    type: String,
  },
    status_projeto: {
    type: String,
    default: 'Pré Aprovação'
  },
   horas: {
    type: Number,
  },
    prioridade: {
    type: String,
  },
    observacoes: {
    type: String,
  }
});



module.exports = mongoose.model('Projeto', ProjetoSchema);



// CREATE TABLE projetos
// (
// 	project_id int NOT NULL AUTO_INCREMENT,
// 	cliente INT NULL,
// 	titulo VARCHAR(50) NULL,
// 	descricao LONGTEXT NULL,
// 	solicitante_cliente VARCHAR(50) NULL,
// 	pm INT(6) NULL,
// 	funcional INT(6) NULL,
// 	prazo TIMESTAMP,
// 	inicio TIMESTAMP,
// 	fim TIMESTAMP,
// 	status_cliente VARCHAR(30) NULL,
// 	status_projeto VARCHAR(30) NULL,
// 	horas INT NULL,
// 	prioridade VARCHAR(30) NULL
// 	PRIMARY KEY (project_id),
// 	observacoes LONGTEXT NULL
// );