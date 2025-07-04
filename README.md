# 🚚 delivery-api

API REST para gerenciamento de entregas e logs, com autenticação baseada em JWT e controle de acesso por papéis (`customer`, `sale`).
Feita em **Node.js**, **TypeScript**, **Express**, **Prisma ORM** e **PostgreSQL**, containerizada com **Docker**.

---

## ✨ Funcionalidades principais

* Cadastro e login de usuários com controle de papéis (`customer` e `sale`)
* Criação e listagem de entregas vinculadas aos usuários
* Registro de logs para cada entrega
* Controle de status das entregas (`processing`, `shipped`, `delivered`)
* Autenticação JWT e autorização baseada em roles
* Testes E2E com Jest e Supertest para garantir qualidade

---

## 🏗️ Arquitetura do projeto

```plaintext
src/
├── app.ts                  # Configuração da aplicação Express
├── domain                  # Lógica de negócio e casos de uso (usecases, repositories)
├── infra
│   ├── database            # Prisma Client
│   └── http                # Controllers, DTOs, middlewares, rotas
├── server.ts               # Inicialização do servidor
├── shared                  # Tipos customizados e tratamento de erros
└── tests                   # Testes E2E
```

Estrutura orientada a Clean Architecture, separando responsabilidades para facilitar manutenção e escalabilidade.

---

## 🛠 Tecnologias usadas

* Node.js 20
* TypeScript
* Express.js
* Prisma ORM
* PostgreSQL (via Bitnami Postgres Docker)
* JWT para autenticação
* Jest + Supertest para testes E2E
* Docker e Docker Compose para containerização

---

## 🐳 Como rodar o projeto com Docker

```bash
# Clone o repositório
git clone https://github.com/anaclaraaraujo/delivery-api.git
cd delivery-api

# Suba os containers da API e do banco
docker-compose up -d

# Execute as migrations no container da API
docker exec -it delivery-api-node npx prisma migrate deploy

# A API estará disponível em http://localhost:3333
```

---

## 🧪 Executando os testes

O projeto conta com testes E2E integrados para validar os fluxos principais.

```bash
# Construa o container de testes
docker-compose build test

# Suba o container de testes (isso executa os testes automaticamente)
docker-compose up test
```

---

## 🔐 Autenticação e Papéis

* `customer`: pode criar entregas, ver e gerenciar suas próprias entregas e logs.
* `sale`: usuário com permissões para ver e atualizar entregas de clientes.
* A autenticação é feita via JWT com middleware para validação de tokens e verificação de autorização.

---

## 📬 Endpoints principais

| Método | Rota                     | Descrição                        |
| ------ | ------------------------ | -------------------------------- |
| POST   | /users                   | Cadastro de usuário              |
| POST   | /sessions                | Login e obtenção de token        |
| POST   | /deliveries              | Criação de entrega (autenticado) |
| POST   | /delivery-logs           | Criação de log para entrega      |
| GET    | /delivery-logs/\:id/show | Listagem de logs da entrega      |
| PATCH  | /deliveries/\:id/status  | Atualização do status da entrega |

---

## 👩‍💻 Desenvolvido por

Feito com 💚 por **Ana Clara**

[GitHub](https://github.com/anaclaraaraujo) | [LinkedIn](https://www.linkedin.com/in/anaclaraaraujoa)

---

## 🧾 Extras

* O banco de dados utiliza PostgreSQL com volumes Docker para persistência.
* Migrations gerenciadas pelo Prisma.
* Dockerfile multi-stage para otimizar imagem de produção.
* Scripts para testes separados e ambiente isolado.
