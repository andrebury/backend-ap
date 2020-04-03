const express = require('express');
const cors = require('cors');
const path  = require('path')

const mongoose = require('mongoose');


const app = express();


const routes = require('./routes');
//'mongodb://mongo:27017/docker-node-mongo'
mongoose.connect(
  process.env.DB_ACCESS,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Erro: ' + err));

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));
app.use(routes);


//const port = 8091;
const port = process.env.PORT
app.listen(port, () => console.log('Server running...'));


