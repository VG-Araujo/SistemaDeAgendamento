const mysql = require("mysql2/promise"); // Importa a versão baseada em Promises do mysql2
require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env

// Cria um pool de conexões com o banco de dados usando as configurações do .env
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Ex: 'localhost'
  user: process.env.DB_USER, // Ex: 'root'
  password: process.env.DB_PASS, // Senha do banco de dados
  database: process.env.DB_DATABASE, // Nome do banco de dados
  port: process.env.DB_PORT, // Ex: 3306 (padrão do MySQL)
});

// Exporta o pool para ser reutilizado nos outros arquivos
module.exports = pool;
