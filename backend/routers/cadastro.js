const express = require("express");
const router = express.Router();
const pool = require("../db"); // Conexão com o banco de dados
const bycrypt = require("bcryptjs"); // Biblioteca para encriptar senhas
const { v4: uuidv4 } = require("uuid"); // Gerador de UUIDs únicos
const jwtToken = require("jsonwebtoken"); // Biblioteca para criação de tokens JWT

// Chave secreta para assinar o token JWT (deve estar definida nas variáveis de ambiente)
const secret = process.env.SECRET_JWT;

// Rota POST para cadastro de novos usuários
router.post("/cadastro", async (req, res) => {
  try {
    const { username, name, email, senha } = req.body; // Dados recebidos do corpo da requisição
    console.log(req.body); // Log para debug (pode ser removido em produção)

    // Verifica se o email já está cadastrado
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE UserEmail=?",
      [email]
    );

    // Verifica se o nome de usuário já está cadastrado
    const [rows1] = await pool.query(
      "SELECT * FROM usuarios WHERE UserName=?",
      [username]
    );

    // Se o nome de usuário já existe, retorna erro
    if (rows1.length > 0) {
      return res.status(500).json({ msg: "Nome de usuário já cadastrado" });
    }

    // Se o email já existe, retorna erro
    if (rows.length > 0) {
      return res.status(500).json({ msg: "Email já cadastrado" });
    }

    // Gera um ID único para o novo usuário
    const id = uuidv4();

    // Encripta a senha antes de armazenar
    const newSenha = await bycrypt.hash(senha, 10);

    // Cria um token JWT com validade de 7 dias
    const token = jwtToken.sign({ id, username, email }, secret, {
      expiresIn: "7d",
    });

    // Insere o novo usuário no banco de dados
    await pool.query(
      "INSERT INTO usuarios (IDUser, UserName, Name, UserEmail, UserPass) VALUES (?,?,?,?,?)",
      [id, username, name, email, newSenha]
    );

    // Retorna sucesso com o token JWT
    res
      .status(201)
      .json({ ok: true, msg: "Usuário cadastrado com sucesso", token });
  } catch (error) {
    console.log(error); // Log do erro no servidor
    res.status(500).json({ ok: false, msg: "Erro ao cadastrar", error });
  }
});

module.exports = router; // Exporta o roteador para a aplicação principal(server)
