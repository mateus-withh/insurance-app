# Sistema de Gerenciamento de Apólices

## Pré-requisitos
- Node.js 18+
- Conta gratuita no [Supabase](https://supabase.com)
- Conta no [Resend](https://resend.com) (envio de e-mail)

---

## 1. Banco de dados
1. Crie um projeto no Supabase
2. Vá em **SQL Editor** e execute o arquivo `schema.sql`

---

## 2. Backend

```bash
cd backend
cp .env.example .env
# Edite o .env com suas credenciais do Supabase e SMTP
npm install
npm run dev
```

A API ficará disponível em `http://localhost:3001`.

---

## 3. Frontend

```bash
cd frontend
# Crie o arquivo .env com:
# VITE_API_URL=http://localhost:3001/api
# VITE_SUPABASE_URL=https://xxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJ...
npm install
npm run dev
```

O app ficará disponível em `http://localhost:5173`.

---

## Estrutura de módulos

| Módulo | Rota API | Descrição |
|--------|----------|-----------|
| Clientes | `/api/clientes` | CRUD completo |
| Apólices | `/api/apolices` | CRUD + filtros + status |
| Parcelas | `/api/parcelas` | Listagem e baixa de pagamento |
| Comissões | `/api/comissoes` | Listagem e baixa de recebimento |
| Relatórios | `/api/relatorios` | Resumo para dashboard |

---

## Alertas automáticos
O job em `backend/src/jobs/alertasCron.js` roda **todo dia às 08:00** e envia
e-mail para clientes com apólices vencendo em 30, 15 e 7 dias.
Os alertas são criados automaticamente pelo banco ao cadastrar cada apólice.
