const express = require('express');
const cors = require('cors');
const path  = require('path')
require('dotenv/config');
const mongoose = require('mongoose');


const app = express();


const routes = require('./routes');
mongoose.connect(
  //process.env.DB_ACCESS,
  process.env.DB_ACCESS,
  //'mongodb+srv://aphomol:Embratel@21@cluster0-3yv4i.mongodb.net/test?retryWrites=true&w=majority',  
  { useNewUrlParser: true,  useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Erro: ' + err));

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));
app.use(routes);


//const port = 8091;
const port = process.env.PORT
app.listen(port, () => console.log('Server running on port ' + port  + '...'));


