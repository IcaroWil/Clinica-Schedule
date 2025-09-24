# 🏥 Clínica Schedule

Sistema de agendamento de clínica em **monorepo**, contendo:

- **Frontend** → [Next.js](https://nextjs.org/) (`/frontend`)
- **Backend** → [Laravel 11 + Passport](https://laravel.com/) (`/backend`)
- **Infra (dev)** → Docker Compose (Nginx/Mailhog) para ambiente local

---

## Links (produção)

- **App (Vercel):** https://clinica-schedule.vercel.app  
- **API (Render):** https://clinica-schedule-backend.onrender.com  
- **Base da API:** `https://clinica-schedule-backend.onrender.com/api`  
- **Healthcheck:** `GET https://clinica-schedule-backend.onrender.com/up`

---

## Estrutura

```bash
clinica-schedule/
├── backend/        # API em Laravel
├── frontend/       # Frontend em Next.js
├── docker/         # Arquivos auxiliares p/ dev local
├── docker-compose.yml
└── README.md
```
---

## Ambiente de Desenvolvimento (Docker)

### 1. Pré-requisitos
- Docker + Docker Compose instalados

### 2. Subir
```bash
docker compose up --build
```
Serviços:
- Frontend → `http://localhost:3000`
- Backend (API) → `http://localhost:8080/api`
- MySQL → localhost:3306 (ajuste no `.env` do backend)
- Mailhog (emails fake) → `http://localhost:8025`

### 3. Derrubar
```bash
docker compose down
```

---

## Variáveis de Ambiente
**Frontend** (`/frontend`)

Crie `.env.local` (dev) ou configure na Vercel:
```bash
NEXT_PUBLIC_API_URL=https://clinica-schedule-backend.onrender.com/api
```

**Backend** (`/backend`)

Na Render (produção) configure:
```bash
APP_ENV=production
APP_DEBUG=false
APP_URL=https://clinica-schedule-backend.onrender.com
APP_KEY=base64:**************

DB_CONNECTION=mysql
DB_HOST=<host da MYSQL_PUBLIC_URL>       # ex: trolley.proxy.rlwy.net
DB_PORT=<porta da MYSQL_PUBLIC_URL>      # ex: 25055
DB_DATABASE=<db>                         # ex: railway
DB_USERNAME=<user>                       # ex: root
DB_PASSWORD=<pass>
```

---

## Tecnologias
- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Laravel 11, PHP 8.3, Passport (auth), MySQL
- **Infra**: Docker/Compose, Render, Railway, Vercel

---

## Documentação por módulo
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
