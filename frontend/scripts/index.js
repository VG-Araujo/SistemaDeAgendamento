// Espera o DOM estar totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
  const botaoCriar = document.querySelector(".add-task-btn");
  const taskList = document.getElementById("taskList");
  const userNameEl = document.getElementById("userName");
  const btnLogout = document.getElementById("logout");

  const token = localStorage.getItem("token"); // Recupera o token JWT salvo no login
  const name = localStorage.getItem("name"); // Recupera o nome do usuário salvo

  // Se o usuário não estiver autenticado, redireciona para a tela de login
  if (!token) {
    alert("Você precisa estar logado!");
    window.location.href = "login.html";
    return;
  }

  // Exibe o nome do usuário
  console.log(name);
  userNameEl.textContent = `Olá, ${name}`;

  // Função para criar uma nova tarefa
  async function criartarefa() {
    const titulo = prompt("Digite o título da tarefa:");
    if (!titulo) return;

    const data = prompt("Digite a data e hora (formato: YYYY-MM-DD HH:MM):");
    if (!data) return;

    try {
      const res = await fetch(`${backend_url}/task/adicionar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token de autenticação
        },
        body: JSON.stringify({ titulo, data }), // Envia os dados da tarefa
      });

      const dados = await res.json();

      if (dados.ok) {
        alert(dados.msg);
        adicionarTarefa({ id: dados.id, titulo, data }); // Adiciona a tarefa na tela
        location.reload();
      } else {
        alert(dados.msg); // Mensagem de erro retornada pelo backend
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Associa a função ao botão "Criar tarefa"
  botaoCriar.addEventListener("click", criartarefa);

  // Adiciona a tarefa no DOM
  function adicionarTarefa(tarefa) {
    const div = document.createElement("div");
    div.classList.add("task");

    div.dataset.id = tarefa.id; // Guarda o ID como atributo HTML
    div.innerHTML = `
      <div>
        <h3>${tarefa.titulo}</h3>
        <p>${formatarData(tarefa.data)}</p>
      </div>
      <button class="delete-btn">Excluir</button>
    `;

    // Associa o botão de excluir à função de deletar
    const botaoExcluir = div.querySelector(".delete-btn");
    const TarefaId = div.dataset.id;
    botaoExcluir.addEventListener("click", () => deletarTarefa(TarefaId, div));

    taskList.appendChild(div); // Adiciona o card da tarefa na lista
  }

  // Formata a data no padrão brasileiro
  function formatarData(dataStr) {
    const data = new Date(dataStr);
    const opcoes = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return data.toLocaleDateString("pt-BR", opcoes);
  }

  // Busca as tarefas do usuário autenticado
  async function buscarTarefas() {
    try {
      const res = await fetch(`${backend_url}/task/buscar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dados = await res.json();

      if (dados.ok) {
        dados.tarefas.forEach(adicionarTarefa); // Renderiza cada tarefa no DOM
      } else {
        alert(dados.msg); // Caso não haja tarefas ou ocorra erro
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  // Função para logout: apenas redireciona para tela de login
  function logout() {
    window.location.href = "../html/login.html";
  }

  btnLogout.addEventListener("click", logout); // Listener do botão de logout

  buscarTarefas(); // Carrega as tarefas assim que a página é carregada

  // Função para deletar uma tarefa
  async function deletarTarefa(id, elemento) {
    if (!confirm("Tem certeza que quer deletar a tarefa?")) return;

    try {
      const res = await fetch(`${backend_url}/task/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const dados = await res.json();

      if (dados.ok) {
        alert(dados.msg);
        taskList.removeChild(elemento); // Remove o elemento do DOM
      } else {
        alert(dados.msg);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir tarefa");
    }
  }
});
