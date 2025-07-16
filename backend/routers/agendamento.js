const express = require("express");
const router = express.Router();
const pool = require("../db"); // Conexão com o banco de dados
const verificarToken = require("../middleware/TokenVerification"); // Middleware de autenticação JWT

// Rota para adicionar uma nova tarefa
router.post("/task/adicionar", verificarToken, async (req, res) => {
  try {
    const { titulo, data } = req.body;

    // Verifica se título e data foram fornecidos
    if (!titulo || !data) {
      return res
        .status(400)
        .json({ ok: false, msg: "Titulo e data são obrigatórios" });
    }

    const UserId = req.usuario.id; // Obtém o ID do usuário autenticado

    // Insere a nova tarefa no banco de dados
    const [result] = await pool.query(
      "INSERT INTO tarefas (Titulo, DataHora, IDUser) VALUES (?, ?, ?)",
      [titulo, data, UserId]
    );

    // Resposta com sucesso e ID da tarefa criada
    res
      .status(200)
      .json({
        ok: true,
        msg: "Tarefa criada com sucesso",
        id: result.IDTarefa,
      });
  } catch (error) {
    console.log(error); // Log de erro para debug
    res.status(500).json({ ok: false, msg: "Erro ao adicionar tarefa", error });
  }
});

// Rota para buscar todas as tarefas do usuário logado
router.get("/task/buscar", verificarToken, async (req, res) => {
  try {
    const userId = req.usuario.id;

    // Busca todas as tarefas do usuário ordenadas pela data (mais recente primeiro)
    const [tarefas] = await pool.query(
      "SELECT IDTarefa as id, Titulo as titulo, DataHora as data FROM tarefas WHERE IDUser = ? ORDER BY DataHora DESC",
      [userId]
    );

    // Se não houver tarefas, retorna 404
    if (tarefas.length == 0) {
      return res
        .status(404)
        .json({ ok: false, msg: "Nenhuma tarefa encontrada" });
    }

    // Retorna a lista de tarefas encontradas
    res.status(200).json({ ok: true, msg: "Tarefas encontradas", tarefas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Erro ao buscar tarefas", error });
  }
});

// Rota para deletar uma tarefa específica pelo ID
router.delete("/task/delete/:id", verificarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const UserId = req.usuario.id;

    // Deleta a tarefa apenas se pertencer ao usuário logado
    const [result] = await pool.query(
      "DELETE FROM tarefas WHERE IDTarefa = ? AND IDUser = ?",
      [id, UserId]
    );

    // Verifica se alguma linha foi afetada (tarefa deletada com sucesso)
    if (result.affectedRows > 0) {
      res.json({ ok: true, msg: "Tarefa excluída com sucesso" });
    } else {
      res.json({ ok: false, msg: "Tarefa não encontrada ou não autorizada" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Falha ao deletar tarefa", error });
  }
});

module.exports = router; // Exporta o roteador para uso na aplicação principal(server)
