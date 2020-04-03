const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId; 
const Schema = mongoose.Schema;


const TarefaSchema = new Schema({
    _id: {
        type:mongoose.Schema.Types.ObjectId
    },
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
const Tarefa = mongoose.model('Tarefa', TarefaSchema);

const UsuarioSchema = new Schema({
    _id: {
        type:mongoose.Schema.Types.ObjectId
    },
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
const Usuario = mongoose.model('Usuario', UsuarioSchema);



const ProjetoSchema = new Schema({
    _id: {
        type:mongoose.Schema.Types.ObjectId
    },
    projeto_id: {
      type: Number,
    },
    cliente: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
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
      },
      funcional: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
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
  const Projeto = mongoose.model('Projeto', ProjetoSchema);




function buscaTarefas() {
    const res = Tarefa.find({})
    .populate('desenvolvedor')
    .populate('projeto')
        .exec()

    return res
}

mongoose.connect(
    'mongodb://localhost:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Erro: ' + err));


buscaTarefas().then(res => {
    console.log(res)
},err => {
    console.log(err)
})

