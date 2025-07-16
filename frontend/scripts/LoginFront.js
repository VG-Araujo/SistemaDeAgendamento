// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  // Escuta o evento de envio do formulário de login
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Captura os valores dos campos de entrada
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    try {
      // Envia a requisição de login para o backend
      const res = await fetch(`${backend_url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }), // Envia email e senha no corpo da requisição
      });

      const dados = await res.json(); // Converte resposta em JSON

      if (dados.ok) {
        // Se o login for bem-sucedido, salva o token e o nome do usuário no localStorage
        localStorage.setItem("token", dados.token);
        localStorage.setItem("name", dados.name);
        window.location.href = "../html/index.html"; // Redireciona para a página principal
      } else {
        alert(dados.msg); // Exibe a mensagem de erro retornada pelo backend
      }
    } catch (error) {
      console.error(error); // Exibe erro no console em caso de falha de rede ou servidor
    }
  });
});
