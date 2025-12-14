# 🦷 CRM Odontológico - DentalCare CRM

Sistema completo de gestão para clínicas dentárias, desenvolvido com Next.js, React e TypeScript. Uma solução moderna e intuitiva para gerenciar pacientes, agendamentos, procedimentos e finanças de clínicas odontológicas.

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## ✨ Características

### 🎯 Módulos Principais

- **Dashboard**: Visão geral com KPIs, gráficos de receita e procedimentos
- **Gestão de Pacientes**: Cadastro completo com histórico, odontograma e timeline de tratamentos
- **Agendamentos**: Sistema de agendamento e controle de consultas
- **Financeiro**: Controle de receitas, despesas e relatórios financeiros
- **Comunicação**: Sistema de mensagens e notificações
- **Perfil**: Gerenciamento de perfil do usuário
- **Configurações**: Configurações gerais do sistema e permissões

### 🎨 Interface

- Design moderno e responsivo
- Suporte a tema claro/escuro
- Componentes UI reutilizáveis (shadcn/ui)
- Animações suaves e transições
- Interface intuitiva e acessível

### 🔐 Segurança

- Sistema de autenticação
- Controle de permissões por usuário
- Proteção de rotas com AuthGuard

## 🛠 Tecnologias

### Core
- **[Next.js 16.0.10](https://nextjs.org/)** - Framework React com SSR/SSG
- **[React 19.2.0](https://react.dev/)** - Biblioteca UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4.1.9](https://tailwindcss.com/)** - Framework CSS utility-first

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI baseados em Radix UI
- **[Radix UI](https://www.radix-ui.com/)** - Componentes primitivos acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones
- **[Recharts](https://recharts.org/)** - Gráficos e visualizações

### Formulários e Validação
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Resolvers para validação

### Outras Bibliotecas
- **[date-fns](https://date-fns.org/)** - Manipulação de datas
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Gerenciamento de temas
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast
- **[Vercel Analytics](https://vercel.com/analytics)** - Analytics

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18.x ou superior
- **pnpm** (gerenciador de pacotes) - ou npm/yarn
- **Git**

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone git@github.com:LucasFSXavier/crm-odontologico.git
   cd crm-odontologico
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```
   ou
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   pnpm dev
   ```
   ou
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (se necessário):

```env
# Exemplo de variáveis de ambiente
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Autenticação

O sistema utiliza autenticação baseada em localStorage para demonstração. Usuários padrão:

- **Admin**: `admin@clinica.com` / `admin123`
- **Dentista**: `maria@clinica.com` / `admin123`

> ⚠️ **Nota**: Em produção, substitua por um sistema de autenticação adequado (NextAuth.js, Auth0, etc.)

## 📖 Uso

### Login

1. Acesse a página de login
2. Use uma das credenciais padrão
3. Após o login, você será redirecionado para o dashboard

### Navegação

Use a sidebar lateral para navegar entre os módulos:
- 🏠 **Dashboard**: Visão geral
- 👥 **Pacientes**: Gerenciar pacientes
- 📅 **Agendamentos**: Gerenciar consultas
- 💰 **Financeiro**: Controle financeiro
- 💬 **Comunicação**: Mensagens
- ⚙️ **Configurações**: Configurações do sistema
- 👤 **Perfil**: Seu perfil

## 📁 Estrutura do Projeto

```
dental-crm-application/
├── app/                      # App Router do Next.js
│   ├── appointments/         # Módulo de agendamentos
│   ├── communication/        # Módulo de comunicação
│   ├── financial/            # Módulo financeiro
│   ├── login/                # Página de login
│   ├── patients/             # Módulo de pacientes
│   │   ├── [id]/             # Detalhes do paciente
│   │   └── recent/           # Pacientes recentes
│   ├── profile/              # Perfil do usuário
│   ├── settings/              # Configurações
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Página inicial (Dashboard)
│   └── globals.css           # Estilos globais
├── components/               # Componentes React
│   ├── ui/                   # Componentes UI (shadcn/ui)
│   ├── auth-guard.tsx        # Proteção de rotas
│   ├── odontogram.tsx        # Componente de odontograma
│   ├── patient-modal.tsx     # Modal de paciente
│   ├── revenue-chart.tsx     # Gráfico de receita
│   ├── sidebar.tsx           # Barra lateral
│   └── ...
├── hooks/                    # React Hooks customizados
├── lib/                      # Utilitários e helpers
│   ├── auth.ts               # Lógica de autenticação
│   ├── masks.ts              # Máscaras de input
│   └── utils.ts              # Funções utilitárias
├── public/                   # Arquivos estáticos
├── styles/                   # Estilos adicionais
├── .gitignore               # Arquivos ignorados pelo Git
├── components.json           # Configuração do shadcn/ui
├── next.config.mjs           # Configuração do Next.js
├── package.json             # Dependências do projeto
├── postcss.config.mjs       # Configuração do PostCSS
├── tsconfig.json            # Configuração do TypeScript
└── README.md                # Este arquivo
```

## 🎯 Funcionalidades

### Dashboard
- ✅ KPIs principais (consultas, receita, comparecimento, faltas)
- ✅ Gráficos de receita mensal
- ✅ Gráficos de procedimentos mais realizados
- ✅ Lista de agendamentos do dia
- ✅ Lista de pacientes recentes
- ✅ Busca rápida de pacientes

### Gestão de Pacientes
- ✅ Cadastro completo de pacientes
- ✅ Histórico de consultas
- ✅ Odontograma interativo
- ✅ Timeline de tratamentos
- ✅ Informações médicas (alergias, condições)
- ✅ Próximos agendamentos
- ✅ Filtros e busca avançada

### Agendamentos
- ✅ Visualização de agendamentos
- ✅ Criação e edição de consultas
- ✅ Controle de status (agendado, confirmado, cancelado)
- ✅ Filtros por data, dentista, status

### Financeiro
- ✅ Controle de receitas
- ✅ Relatórios financeiros
- ✅ Gráficos de desempenho
- ✅ Histórico de transações

### Comunicação
- ✅ Sistema de mensagens
- ✅ Notificações
- ✅ Templates de comunicação

### Configurações
- ✅ Gerenciamento de usuários
- ✅ Controle de permissões
- ✅ Configurações gerais
- ✅ Templates personalizáveis

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento

# Build
pnpm build        # Cria build de produção

# Produção
pnpm start        # Inicia servidor de produção

# Linting
pnpm lint         # Executa ESLint
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto é privado e de uso interno.

## 👨‍💻 Autor

**Lucas F. S. Xavier**

- GitHub: [@LucasFSXavier](https://github.com/LucasFSXavier)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pela excelente framework
- [shadcn](https://ui.shadcn.com/) pelos componentes UI incríveis
- [Radix UI](https://www.radix-ui.com/) pelos primitivos acessíveis
- Comunidade open source

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!

