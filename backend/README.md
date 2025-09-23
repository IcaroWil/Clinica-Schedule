# 🩺 Clínica - Backend

API em **Laravel** para o sistema de agendamento médico **Clínica Schedule**.  
Fornece endpoints para **autenticação, pacientes e agendamentos**, consumidos pelo frontend em Next.js.

---

## Tecnologias utilizadas

- [Laravel 10](https://laravel.com/)
- [PHP 8.2](https://www.php.net/)
- [MySQL](https://www.mysql.com/)
- [Laravel Passport](https://laravel.com/docs/10.x/passport) (OAuth2)
- [Docker](https://www.docker.com/)
- Arquitetura **Domain Driven Design (DDD)**

---

## Estrutura de pastas (simplificada)

```bash
backend/
├── app/
│ ├── Application/ # Serviços de aplicação
│ │ └── Appointments/
│ │ └── CreateAppointmentService.php
│ ├── Domain/ # Entidades e contratos (DDD)
│ │ ├── Appointments/
│ │ └── Patients/
│ ├── Http/ # Controllers, Requests e Resources
│ │ ├── Controllers/Api/ # Endpoints da API
│ │ ├── Requests/ # Validações
│ │ └── Resources/ # Formatação de resposta
│ ├── Infrastructure/ # Implementações persistência (Eloquent)
│ ├── Models/ # Modelos Eloquent
│ ├── Policies/ # Autorização
│ └── Providers/ # Providers da aplicação
│
├── routes/
│ ├── api.php # Rotas da API (principais)
│ ├── console.php
│ └── web.php
│
├── Dockerfile # Build do backend
├── composer.json
├── artisan
└── README.md
```

---

## Como rodar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/IcaroWil/Clinica-Schedule.git
cd backend/
```

### 2. Configure o `.env`
Edite o arquivo `.env` com as variáveis de ambiente:


```bash
APP_NAME=ClinicaAPI
APP_ENV=local
APP_KEY=base64:xxxx
APP_DEBUG=true
APP_URL=http://localhost:8080

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=clinica
DB_USERNAME=admin
DB_PASSWORD=123

PASSPORT_PASSWORD_CLIENT_ID=1
PASSPORT_PASSWORD_CLIENT_SECRET=seu_secret_aqui
```

### 3. Instale as dependências
```bash
composer install
php artisan key:generate
```

### 4. Rode as migrations
```bash
php artisan migrate
php artisan db:seed
```

### 5. Inicie o servidor
```bash
php artisan serve --host=0.0.0.0 --port=8080
```
API disponível em: `http://localhost:8080/api`

---

## Rodando com Docker

### Build da imagem
```bash
docker build -t clinica-backend .
```

### Subir container
```bash
docker run -p 8080:8080 --env-file .env clinica-backend
```
Normalmente será usado com `docker-compose` para orquestrar junto ao MySQL e Nginx.

---

## Autenticação (OAuth2 com Passport)

O backend usa **Laravel Passport** para autenticação OAuth2.

Após rodar as migrations, você deve criar o client de senha:
```bash
php artisan passport:install --password
```

Isso vai gerar as credenciais que devem ser colocadas no `.env`:
```bash
PASSPORT_PASSWORD_CLIENT_ID=1
PASSPORT_PASSWORD_CLIENT_SECRET=xxxxxx
```

Fluxo:
- Usuário faz login (`/api/login`) → recebe **access_token**
- Token deve ser usado no header `Authorization: Bearer {token}`

---

## Endpoints principais

- **Autenticação**
    - `POST /api/register` -> Cadastro de médico
    - `POST /api/login` -> Login (gera token)
    - `POST /api/logout` -> Logout

- **Pacientes**
    - `GET /api/patients` -> Listar pacientes
    - `POST /api/patients` -> Criar paciente
    - `PUT /api/patients/{id}` -> Atualizar paciente
    - `DELETE /api/patients/{id}` -> Remover paciente

- **Agendamentos**
    - `GET /api/appointments` -> Listar agendamentos
    - `POST /api/appointments` -> Criar agendamento
    - `PATCH /api/appointments/{id}` -> Atualizar status
    - `DELETE /api/appointments/{id}` -> Remover agendamento

--- 

## Funcionalidades implementadas

- Autenticação com Laravel Passport

- Cadastro e login de médicos

- CRUD de pacientes

- CRUD de agendamentos

- Atualização de status de consultas

- Arquitetura DDD (Domain, Application, Infrastructure)

## Contribuição

Sinta-se à vontade para abrir issues e enviar pull requests.
