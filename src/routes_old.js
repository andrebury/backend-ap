const express = require("express");
//const multer = require("multer");
const authMiddleware = require("./midllewares/auth");

//const uploadConfig = require("./config/upload");

const routes = express.Router();
const routeAuth = express.Router();

routes.use(authMiddleware);

//const upload = multer(uploadConfig);

const ProjetoController = require("./controllers/ProjetoController");
const UsuarioController = require("./controllers/UsuarioController");
const TarefaController = require("./controllers/TarefaController");
const AlertaController = require("./controllers/AlertaController");
const ClienteController = require("./controllers/ClienteController");
const ArquivoController = require("./controllers/ArquivoController");

routes.post("/cadastro/projeto", ProjetoController.store);
routes.post("/update/projeto", ProjetoController.update);
routes.get("/projetos", ProjetoController.index);
routes.get("/projeto/:id", ProjetoController.indexbyid);
routes.get("/projeto/total/", ProjetoController.indextotal);

routes.post("/cadastro/tarefa", TarefaController.store);
routes.post("/update/tarefa", TarefaController.update);
routes.post("/tarefas", TarefaController.index);
routes.get("/tarefa/:id", TarefaController.indexbyid);
routes.get("/tarefa/total/", ProjetoController.indextotal);

routeAuth.post("/cadastro/usuario", UsuarioController.store);
routes.post("/usuario", UsuarioController.index);
routes.get("/usuario/:id", UsuarioController.indexbyid);
routeAuth.post("/authenticate", UsuarioController.authUser);

routes.post("/cadastro/cliente", ClienteController.store);
routes.post("/update/cliente", ClienteController.update);
routes.get("/cliente/:id", ClienteController.indexbyid);
routes.get("/clientes", ClienteController.index);

module.exports = routes;
