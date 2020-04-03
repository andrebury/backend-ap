const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  cliente_id: {
    type: Number,
  },
  nome: {
    type: String,
  },
  ramo: {
    type: String,
  },
    solicitantes: {
    type: [String],
  },
    foto: {
    type: String,
  }
}, {
    toJSON: {
        virtuals: true,
    }
});

ClienteSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost/files/${this.foto}`
})

module.exports = mongoose.model('Cliente', ClienteSchema);

// CREATE TABLE clientes
// (
// 	client_id int NOT NULL AUTO_INCREMENT,
// 	nome VARCHAR(50) NULL,
// 	ramo VARCHAR(30) NULL,
// 	solicitantes VARCHAR(30) NULL,
// 	foto VARCHAR(255) NULL,
// 	PRIMARY KEY (client_id)
// );