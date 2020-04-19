const express = require("express");
const cors = require("cors");
const path = require("path");

const ProjetoController = require("./controllers/ProjetoController");
const UsuarioController = require("./controllers/UsuarioController");
const TarefaController = require("./controllers/TarefaController");
const AlertaController = require("./controllers/AlertaController");
const ClienteController = require("./controllers/ClienteController");
const ArquivoController = require("./controllers/ArquivoController");
const AuthController = require("./controllers/AuthController");

const mongoose = require("mongoose");

require("dotenv").config({
  path: ".env",
});

const app = express();

//const routes = require("./routes");

mongoose
  .connect(
    //process.env.DB_ACCESS,
    process.env.DB_ACCESS,
    //'mongodb+srv://aphomol:Embratel@21@cluster0-3yv4i.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Erro: " + err));

app.use(cors());
app.use(express.json());
//app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

require("./controllers/UsuarioController")(app);
require("./controllers/AuthController")(app);
require("./controllers/ProjetoController")(app);
require("./controllers/TarefaController")(app);
require("./controllers/ClienteController")(app);

//const port = 8091;

app.listen(process.env.PORT || "3333");
