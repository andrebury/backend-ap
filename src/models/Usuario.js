const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  usuario_id: {
    type: Number,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  funcao: {
    type: String,
    required: true
  },
    email: {
    type: String,
    required: true
  },
    senha: {
    type: String,
    required: true
  },
    habilidades: {
    type: [String],
    required: false
  },
    foto: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  }
}, {
    toJSON: {
        virtuals: true,
    }
});

UsuarioSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost/files/${this.foto}`
})

module.exports = mongoose.model('Usuario', UsuarioSchema);

// CREATE TABLE usuarios
// (
// 	user_id int NOT NULL AUTO_INCREMENT,
// 	nome VARCHAR(50) NULL,
// 	funcao VARCHAR(30) NULL,
// 	email VARCHAR(100) NULL,
// 	senha VARCHAR(30) NULL,
// 	habilidades VARCHAR(30) NULL,
// 	foto VARCHAR(255) NULL,
// 	PRIMARY KEY (user_id)
// );