const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertaSchema = new Schema({
  alerta_id: {
    type: Number,
  },
  titulo: {
    type: String,
  },
  solicitante:  {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    },  
    solicitado:  {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      },
  tarefa:  {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Tarefa',
    },  
    projeto:  {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Projeto',
      },
    descricao: {
    type: String,
  },
    data_inicio: {
      type: String,
  },
    status: {
    type: String,
    default: 'Não lida'
  },
    data_de_leitura: {
      type: String,
  }
});

module.exports = mongoose.model('Alerta', AlertaSchema);

// CREATE TABLE alertas
// (
// 	alert_id int NOT NULL AUTO_INCREMENT,
// 	titulo VARCHAR(30) NULL,
// 	tarefa LONGTEXT NULL,
// 	descricao LONGTEXT NULL,
// 	data_inicio TIMESTAMP NULL,
// 	status VARCHAR(30) NULL,
// 	data_de_leitura TIMESTAMP NULL,
// 	PRIMARY KEY (alert_id)
// );