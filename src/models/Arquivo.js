const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArquivoSchema = new Schema({
  arquivo_id: {
    type: Number,
  },
  nome: {
    type: String,
  },
  caminho: {
    type: String,
  },
    data_inclusao: {
      type: String,
  },
    usuario:  {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    versao: {
    type: String,
  },
  projeto:  {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Projeto',
  },
  tarefa:  {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Tarefa',
  },
  cliente:  {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
  },
  tipo: {
    type: String,
  }
});


module.exports = mongoose.model('Arquivo', ArquivoSchema);

// CREATE TABLE arquivos
// (
// 	file_id int NOT NULL AUTO_INCREMENT,
// 	nome VARCHAR(30) NULL,
// 	caminho VARCHAR(255) NULL,
// 	data_inclusao TIMESTAMP NULL, 
// 	usuario INT NULL,
// 	versao VARCHAR(30) NULL,
// 	projeto INT NULL,
// 	cliente INT NULL,
// 	tipo VARCHAR(30) NULL,
// 	PRIMARY KEY (file_id)
// );