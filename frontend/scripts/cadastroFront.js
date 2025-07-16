// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formcadastro");

  // Adiciona um listener para o envio do formulário
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Captura os dados do formulário
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    try {
      // Envia uma requisição POST para o backend com os dados de cadastro
      const res = await fetch(`${backend_url}/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, email, senha }),
      });

      const dados = await res.json(); // Converte a resposta em JSON

      if (dados.ok) {
        // Se o cadastro for bem-sucedido:
        console.log("Cadastro bem-sucedido. Redirecionando...");
        localStorage.setItem("token", dados.token); // Armazena o token JWT
        localStorage.setItem("name", name); // Armazena o nome para uso futuro (ex: exibição no front)
        window.location.href = "../html/index.html"; // Redireciona para a página principal
      } else {
        // Se houver erro, exibe a mensagem retornada pelo backend
        alert(dados.msg);
        console.log("teste"); // Pode ser removido ou usado para debug
      }
    } catch (error) {
      console.log(error); // Log de erro em caso de falha na requisição
    }
  });
});
