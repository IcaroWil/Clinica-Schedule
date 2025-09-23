# 🏥 Clínica Schedule

Sistema de agendamento de clínica em **monorepo**, contendo:

- **Frontend** → [Next.js](https://nextjs.org/) (`/frontend`)
- **Backend** → [Laravel](https://laravel.com/) (`/backend`)
- **Infraestrutura** → [Docker Compose](https://docs.docker.com/compose/), Nginx e Mailhog para desenvolvimento local.

---

## Estrutura do Projeto
```bash
clinica-schedule/
├── backend/ # API em Laravel
├── frontend/ # Frontend em Next.js
├── docker/ # Configurações adicionais (ex.: Nginx)
├── docker-compose.yml
├── .gitignore
└── README.md
```

Cada módulo possui seu próprio `README.md` com instruções específicas.

---

## Ambiente de Desenvolvimento

### 1. Pré-requisitos
- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/)  

### 2. Subir os serviços
Na raiz do projeto, execute:

```bash
docker compose up --build
```

Serviços disponíveis:

- Frontend (Next.js) → `http://localhost:3000`
- Backend (Laravel API) → `http://localhost:8080/api`
- MySQL → localhost:3306 (usuário: `admin`, senha: `123`)
- Mailhog (teste de emails) → `http://localhost:8025`

### 3. Derrubar os serviços
```bash
docker compose down
```

## Variáveis de Ambiente

Cada aplicação possui seu `.env` próprio:

- Backend (`/backend/.env`) → configuração do Laravel

- Frontend (`/frontend/.env`) → URL da API

Obs.: os arquivos `.env` não são versionados (estão no `.gitignore`).

## Tecnologias Usadas

- **Frontend**: Next.js, React, TailwindCSS

- **Backend**: Laravel, PHP 8, MySQL

- **Infra**: Docker, Docker Compose, Nginx, Mailhog

## Documentação adicional

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)