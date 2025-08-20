# My Pocket Frontend

Frontend da aplicação **My Pocket**, uma área de membros e painel de controle financeiro pessoal.  
Construído em **Next.js** com **Tailwind CSS**, o objetivo é fornecer uma interface moderna, responsiva e integrada ao backend em **Java (Spring Boot)**.

---

## 📖 Sumário

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Integração com Backend](#-integração-com-backend)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Contribuição](#-contribuição)

---

## 🚀 Tecnologias Utilizadas

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Axios ou Fetch API (comunicação com backend)
- Docker (opcional para deploy)

---

## 📂 Estrutura do Projeto

```
├── public/                   # Arquivos estáticos
├── src/
│   ├── app/                  # Páginas e rotas (Next.js App Router)
│   ├── components/           # Componentes reutilizáveis (UI)
│   ├── hooks/                # Hooks customizados
│   ├── lib/                  # Configurações e utilitários
│   ├── services/             # Comunicação com API (backend)
│   └── styles/               # Estilos globais (Tailwind)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚙️ Como Executar

### Pré-requisitos

- Node.js 18+ (recomendado 20+)
- npm ou yarn

### Passos

1. Clone o repositório:

```sh
git clone https://github.com/pedroalano/my-pocket-frontend.git
cd my-pocket-frontend
```

2. Instale as dependências:

```sh
npm install
# ou
yarn install
```

3. Crie o arquivo `.env.local` e configure a URL da API backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

4. Rode o servidor de desenvolvimento:

```sh
npm run dev
# ou
yarn dev
```

Aplicação disponível em:  
👉 http://localhost:3000

---

## 🔗 Integração com Backend

Este frontend consome a API do backend **My Pocket (Spring Boot)**.  
Principais endpoints utilizados:

- `/auth` → autenticação (login/registro)
- `/accounts` → gerenciamento de contas
- `/categories` → gerenciamento de categorias
- `/transactions` → listagem e criação de transações

---

## 🎨 Funcionalidades Principais

- Autenticação com JWT  
- Dashboard financeiro responsivo  
- Gerenciamento de contas, categorias e transações  
- Visualização de relatórios e gráficos  
- Dark Mode 🌙  
- UI moderna e personalizável com Tailwind  

---

## 🤝 Contribuição

Pull requests são bem-vindos!  
Para maiores informações, abra uma **issue** ou entre em contato.

---

👨‍💻 Desenvolvido por [Pedro Alano](https://github.com/pedroalano)
