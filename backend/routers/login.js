const pool = require("../db"); // Conexão com o banco de dados
const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs"); // Biblioteca para comparação de senhas criptografadas
const jwtToken = require("jsonwebtoken"); // Biblioteca para geração de tokens JWT

const secret = process.env.SECRET_JWT; // Chave secreta para assinar o token JWT (deve estar nas variáveis de ambiente)

// Rota POST para login de usuário
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o email existe no banco de dados
    const [emailRows] = await pool.query(
      "SELECT * FROM usuarios WHERE UserEmail = ?",
      [email]
    );

    // Se o email não for encontrado, retorna erro
    if (emailRows.length == 0) {
      return res
        .status(404)
        .json({ ok: false, msg: "Usuário não encontrado, verifique o email" });
    }

    const User = emailRows[0]; // Dados do usuário encontrado

    // Compara a senha fornecida com a senha criptografada no banco
    const verifique = await bycrypt.compare(senha, User.UserPass);
    if (!verifique) {
      return res.status(401).json({ ok: false, msg: "Senha inválida" });
    }

    // Gera o token JWT válido por 7 dias
    const token = jwtToken.sign(
      { id: User.IDUser, username: User.UserName, email: User.UserEmail },
      secret,
      { expiresIn: "7d" }
    );

    // Retorna sucesso com token e nome do usuário
    res.status(200).json({
      ok: true,
      msg: "Login bem-sucedido",
      token,
      name: User.Name,
    });
  } catch (error) {
    console.log(error); // Log de erro para debug
    res.status(500).json({ ok: false, msg: "Erro ao logar", error });
  }
});

module.exports = router; // Exporta o roteador para uso na aplicação principal(server)
