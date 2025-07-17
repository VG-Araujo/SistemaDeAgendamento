# 📅 Sistema de Agendamento de Tarefas

Sistema completo com **login, cadastro e gerenciamento de tarefas**, utilizando **Node.js, Express, MySQL e HTML/CSS puro**. Este projeto simula uma agenda de compromissos, com autenticação por token JWT e persistência de dados em banco de dados MySQL.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [uuid](https://www.npmjs.com/package/uuid)

### 🎨 Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)

### 💽 Banco de Dados

- **MySQL Workbench** (interface para criar e gerenciar tabelas)

---

## 🗂️ Estrutura de Pastas

SistemaDeAgendamento
├── backend
│ ├── routers # Rotas da API (Login, Cadastro, Agendamento)
│ ├── middleware # Middleware de verificação do token
│ ├── db.js # Conexão com o banco de dados
│ ├── server.js # Inicialização do servidor
│ ├── .env # Variáveis de ambiente (não incluído no Git)
│ ├── gerarSegredoJWT.js
│ └── package.json
│
├── frontend
│ ├── html # Páginas HTML (Login, Cadastro, Index)
│ ├── scripts # Scripts JS do frontend
│ └── styles # Estilos CSS das páginas

---

## ⚙️ Como rodar o projeto localmente

### 🔁 Pré-requisitos

- Node.js v18+
- MySQL Server e MySQL Workbench
- Git

---

### 📥 1. Clone o repositório

```bash
git clone https://github.com/VG-Araujo/SistemaDeAgendamento
cd SistemaDeAgendamento
```

### 📦 2. Instale as dependências

cd backend
npm install

### 🗄️ 3. Configure o banco de dados

Crie o banco no MySQL Workbench com a seguinte estrutura:

```bash
CREATE DATABASE agenda;

USE agenda;

CREATE TABLE usuarios (
  IDUser CHAR(36) PRIMARY KEY,
  Nome VARCHAR(100) NOT NULL,
  Email VARCHAR(100) UNIQUE NOT NULL,
  Senha VARCHAR(100) NOT NULL
);

CREATE TABLE tarefas (
  IDTarefa INT AUTO_INCREMENT PRIMARY KEY,
  Titulo VARCHAR(255) NOT NULL,
  DataHora DATETIME NOT NULL,
  IDUser CHAR(36),
  FOREIGN KEY (IDUser) REFERENCES usuarios(IDUser)
);
```

### 🛠️ 4. Crie o arquivo .env

```bash
Na pasta backend, crie o arquivo .env com este conteúdo:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=agenda
JWT_SECRET=sua_chave_secreta_gerada
💡 Você pode gerar um segredo JWT com o script gerarSegredoJWT.js incluído no projeto.
```

### 🧪 Funcionalidades

✅ Cadastro de usuário com senha criptografada

✅ Login com geração de JWT

✅ Autenticação protegida via token

✅ Criação de tarefas

✅ Listagem de tarefas do usuário logado

✅ Exclusão de tarefas

✅ Interface minimalista e funcional

### 🧠 Autor

Desenvolvido por Vinicius Araújo – estudante de Automação Industrial e apaixonado por backend, Node.js e projetos com lógica e propósito.

### 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
