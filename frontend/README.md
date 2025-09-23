# 🏥 Clínica - Frontend

Frontend em **Next.js (App Router)** do sistema de agendamento médico **Clínica Schedule**.  
Este projeto fornece a interface de usuário para médicos gerenciarem **pacientes e agendamentos**, integrando com a API do backend em PHP.

---

## 🚀 Tecnologias utilizadas

- [Next.js 13+](https://nextjs.org/) (App Router)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) (integração com API)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)

---

## 📂 Estrutura de pastas
```
frontend/
├── app/ # Páginas (Next.js App Router)
│ ├── appointments/ # Tela de agendamentos
│ │ └── page.tsx
│ ├── login/ # Tela de login
│ │ └── page.tsx
│ ├── patients/ # Tela de pacientes
│ │ └── page.tsx
│ ├── register/ # Tela de cadastro de médico
│ │ └── page.tsx
│ ├── layout.tsx # Layout global
│ ├── globals.css # Estilos globais
│ └── page.tsx # Página inicial
│
├── components/ # Componentes reutilizáveis
│ ├── Alert.tsx
│ ├── AppointmentForm.tsx
│ ├── ConfirmDialog.tsx
│ ├── NavBar.tsx
│ ├── PatientForm.tsx
│ └── Skeleton.tsx
│
├── lib/ # Funções auxiliares
│ ├── api.ts # Configuração do Axios (chamadas à API)
│ └── auth.ts # Funções de autenticação (token/localStorage)
│
├── public/ # Arquivos estáticos públicos
├── .env.local # Variáveis de ambiente
├── Dockerfile # Build do frontend em Docker
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md 
```
## Como rodar localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seuuser/clinica-schedule.git
cd clinica-schedule/frontend
```
### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```
### 3. Configure o `.env.local`
Crie um arquivo `.env.local` na raiz do `frontend/ com a URL da API:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```
### 4. Rode o servidor de desenvolvimento
```bash
npm run dev
```
Abra no navegador: `http://localhost:3000`

## Rodando com Docker

### Build da imagem
```bash
docker build -t clinica-frontend .
```

### Executar container
```bash
docker run -p 3000:3000 --env-file .env.local clinica-frontend
```
## Funcionalidades implementadas
- Login do médico

- Cadastro de novos médicos

- Cadastro de pacientes

- Criação de agendamentos

- Atualização de status de consultas:

    - **Agendado**

    - **Concluído** (remove do sistema após confirmação)

    - **Cancelado** (remove do sistema após confirmação)

- Exclusão de pacientes e agendamentos com modal de confirmação

- Interface responsiva com Tailwind CSS

## Contribuição

Sinta-se à vontade para abrir issues e enviar pull requests com melhorias.
