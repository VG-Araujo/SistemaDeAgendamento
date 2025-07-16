// Importa as dependências principais
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env

// Importa as rotas
const routerCadastro = require("./routers/cadastro");
const routerLogin = require("./routers/login");
const routerTaks = require("./routers/agendamento");

// Middleware para permitir requisições de outras origens (CORS)
app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Define as rotas da aplicação
app.use("/", routerCadastro); // Rotas de cadastro de usuário
app.use("/", routerLogin); // Rotas de login
app.use("/", routerTaks); // Rotas de tarefas (agendamentos)

// Inicia o servidor na porta definida no arquivo .env
app.listen(process.env.SERVER_PORT, () => {
  console.log("Servidor rodando");
});
