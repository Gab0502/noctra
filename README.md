# NOCTRA CMS

## Setup rápido

### 1. PostgreSQL
Certifique-se que o PostgreSQL está rodando localmente na porta 5432.
Crie o banco de dados:
```bash
createdb noctra
```

### 2. Backend (porta 4000)
```bash
cd backend
npm install

# Rodar as migrations
npm run db:migrate

# Criar o primeiro admin
npm run db:seed admin@noctra.com suasenha

# Iniciar o servidor
npm run dev
```

### 3. Frontend (porta 3000)
```bash
cd frontend
npm install
npm run dev
```

### 4. Acessar o admin
Abra `http://localhost:3000/admin/login` e use as credenciais criadas no seed.

---

## Estrutura

```
noctra/
  backend/          # Express + Prisma + PostgreSQL
    src/
      routes/       # auth, projects, admin/
      lib/          # prisma.ts, auth.ts
    prisma/
      schema.prisma
  frontend/         # Next.js 16 + Tailwind v4
    app/
      admin/        # CMS admin (login, dashboard, editor)
      projects/     # Páginas públicas de projetos
    components/
      admin/        # ProjectForm, ModuleEditor, etc.
      project/      # ProjectPage, Sidebar, ModuleRenderer
      home/         # Componentes da homepage
```
