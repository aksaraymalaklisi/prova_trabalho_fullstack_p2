# Fullstack Application Project

Esta é uma aplicação Fullstack conteinerizada contendo um Backend em **Node.js/Express** e um Frontend em **React/Tailwind CSS**.
A documentação do backend está no README.md na diretório backend.

## Tecnologias Utilizadas

### Backend
- **Node.js** com **Express**
- **PostgreSQL** (via Sequelize) para dados de Usuários.
- **MongoDB** (via Mongoose) para persistência de itens (Carros, Motos, Marcas de Roupa).
- **JWT** (JSON Web Tokens) para Autenticação e Autorização baseada em Perfis (RBAC).
- Foco na segurança da API (**Helmet**, **CORS**, **Rate Limiting**, **Bcrypt**) focado no OWASP Top 10.
- Testes de integração com **Jest** e **Supertest**.
- Documentação interativa via **Swagger**.

### Frontend
- **React** (via Vite).
- **Tailwind CSS** para design moderno, focado em Experiência do Usuário (UX/UI).
- Controle de estado de autenticação via Context API.
- Requisições seguras via interceptadores do **Axios** para passagem de token JWT.
- Interface completa de CRUD (Listar, Cadastrar, Editar, Remover) para as entidades.

### DevOps / Orquestração
- **Docker** e **Docker Compose** para orquestração de todos os serviços simultaneamente:
  - `postgres` (Banco Relacional)
  - `mongo` (Banco NoSQL)
  - `backend` (API em Node)
  - `frontend` (Aplicação React servida no Nginx)

---

## Como Executar o Projeto

Certifique-se de ter o **Docker** e o **Docker Compose** instalados na sua máquina. Não é necessário rodar "npm install" manualmente para iniciar a aplicação via Docker.

1. Acesse o terminal na pasta raiz do projeto.
2. Execute o comando abaixo para construir as imagens e subir os contêineres:

```bash
docker-compose up --build -d
```

3. Aguarde alguns instantes enquanto os bancos de dados são inicializados.

---

## Acessando a Aplicação

### 1. Frontend (Interface do Usuário)
Acesse no seu navegador:
**http://localhost:80** ou apenas **http://localhost**

> **Credenciais de Acesso (Admin Padrão):**
> O sistema cria automaticamente um usuário administrador ao ser iniciado pela primeira vez.
> - **E-mail:** `admin@admin.com`
> - **Senha:** `admin123`

### 2. Documentação da API (Swagger)
Para visualizar todos os endpoints do Backend, formatos de payload (body) e testar a API, acesse a documentação do Swagger:
**http://localhost:3000/api-docs**

> **Como testar rotas protegidas no Swagger:**
> 1. Expanda a rota de **Autenticação** (`POST /api/auth/login`).
> 2. Clique em *Try it out* e envie o e-mail (`admin@admin.com`) e senha (`admin123`). Clique em *Execute*.
> 3. Nos resultados (*Server response*), copie apenas o texto do token JWT gerado (sem aspas).
> 4. Role a página até o topo e clique no botão verde **Authorize** (ou no cadeado de qualquer rota).
> 5. Cole o token no campo correspondente e clique em *Authorize*. 
> 6. Pronto! Agora você pode testar todas as outras rotas do sistema.

---

## Permissões e Perfis (Role-Based Access Control)
O sistema conta com dois perfis de acesso, que são refletidos tanto no Backend (proteção de rotas) quanto no Frontend (ocultação de menus):
- `admin`: Possui acesso total ao sistema. Pode criar, editar e excluir Usuários no dashboard de administração, além de ter acesso aos CRUDs de Carros, Motos e Marcas de Roupa.
- `user`: Perfil de acesso limitado. Tem acesso para gerenciar Carros, Motos e Marcas de Roupa, porém será bloqueado pela API caso tente manipular ou visualizar dados de Usuários.

---

## 🛠️ Executando Testes do Backend

Os testes de integração do Backend verificam todas as rotas simulando requisições reais. Eles utilizam SQLite (Em memória) e MongoDB Memory Server, garantindo que os testes rodem rapidamente e sem poluir o banco do Docker.

Para executá-los manualmente:

```bash
cd backend
npm install
npm test
```

---

## Estrutura de Pastas do Projeto

- `/backend`: API, configurações, modelos de banco de dados, controladores, rotas e testes. Contém seu próprio `Dockerfile`.
- `/frontend`: Páginas, componentes, interceptadores de requisição e Contexto. Contém um `Dockerfile` que compila o projeto e o entrega através de um servidor Nginx leve.
- `docker-compose.yml`: Na raiz do projeto, orquestra todos os contêineres e configurações de rede entre eles.
