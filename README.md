# 🚀 Galactic News

> Blog de notícias sobre espaço, astronomia e exploração espacial

**Galactic News** é uma aplicação web moderna desenvolvida com Next.js 16, oferecendo uma plataforma completa para publicação e gerenciamento de artigos sobre temas espaciais. O projeto implementa uma arquitetura robusta com separação de responsabilidades, utilizando Server Actions, cache otimizado e sistema de autenticação seguro.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Componentes Principais](#componentes-principais)
- [Fluxo de Funcionamento](#fluxo-de-funcionamento)
- [Setup e Instalação](#setup-e-instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Boas Práticas e Padrões](#boas-práticas-e-padrões)
- [Decisões Técnicas](#decisões-técnicas)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [Contribuindo](#contribuindo)

---

## 🎯 Visão Geral

O **Galactic News** é um sistema de blog completo que permite:

- **Área Pública**: Visualização de posts publicados com suporte a Markdown, renderização segura de conteúdo e design responsivo
- **Área Administrativa**: CRUD completo de posts com autenticação JWT, editor Markdown avançado e upload de imagens
- **Performance**: Utiliza ISR (Incremental Static Regeneration) e cache otimizado para melhor experiência do usuário
- **Segurança**: Validação de dados com Zod, sanitização de HTML, autenticação baseada em JWT e proteção de rotas

---

## 🛠 Stack Tecnológica

### Core
- **Next.js 16.1.6** - Framework React com App Router
- **React 19.2.3** - Biblioteca UI
- **TypeScript 5** - Tipagem estática

### Banco de Dados
- **Drizzle ORM 0.45.1** - ORM type-safe
- **Better SQLite3 12.6.2** - Banco de dados SQLite
- **Drizzle Kit 0.31.8** - Ferramentas de migração

### Estilização
- **Tailwind CSS 4** - Framework CSS utility-first
- **@tailwindcss/typography** - Plugin para estilização de conteúdo Markdown

### Autenticação e Segurança
- **Jose 6.1.3** - Implementação JWT
- **bcryptjs 3.0.3** - Hash de senhas
- **Zod 4.3.6** - Validação de schemas
- **sanitize-html 2.17.0** - Sanitização de HTML

### Editor e Markdown
- **@uiw/react-md-editor 4.0.11** - Editor Markdown WYSIWYG
- **react-markdown 10.1.0** - Renderização de Markdown
- **remark-gfm 4.0.1** - Suporte a GitHub Flavored Markdown
- **rehype-sanitize 6.0.0** - Sanitização de HTML no Markdown

### Utilitários
- **date-fns 4.1.0** - Manipulação de datas
- **slugify 1.6.6** - Geração de slugs
- **uuid 13.0.0** - Geração de IDs únicos
- **react-toastify 11.0.5** - Notificações toast
- **lucide-react 0.563.0** - Ícones
- **clsx 2.1.1** - Utilitário para classes CSS condicionais

---

## 🏗 Arquitetura do Projeto

O projeto segue uma arquitetura em camadas bem definida:

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Pages, Components, Server Actions)│
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Business Logic Layer        │
│   (Queries, Validations, DTOs)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Data Access Layer            │
│      (Repositories, Models)          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Database Layer               │
│      (Drizzle ORM, SQLite)          │
└─────────────────────────────────────┘
```

### Princípios Arquiteturais

1. **Separation of Concerns**: Cada camada tem responsabilidade específica
2. **Repository Pattern**: Abstração da camada de dados permite trocar implementações
3. **Server Actions**: Mutations executadas no servidor com type-safety
4. **Cache Strategy**: Uso de `unstable_cache` e `cache` do React para otimização
5. **Type Safety**: TypeScript em toda a aplicação com inferência de tipos

---

## 📁 Estrutura de Diretórios

```
galatic-news/
├── public/                    # Arquivos estáticos
│   ├── images/               # Imagens de exemplo
│   └── uploads/              # Imagens enviadas pelos usuários
│
├── src/
│   ├── actions/              # Server Actions (mutations)
│   │   ├── login/           # Autenticação
│   │   ├── post/            # CRUD de posts
│   │   └── upload/          # Upload de imagens
│   │
│   ├── app/                  # Next.js App Router
│   │   ├── admin/           # Rotas administrativas
│   │   │   ├── login/      # Página de login
│   │   │   └── post/        # Gerenciamento de posts
│   │   ├── post/            # Rotas públicas de posts
│   │   ├── layout.tsx       # Layout raiz
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Estilos globais
│   │
│   ├── components/           # Componentes React
│   │   ├── admin/           # Componentes administrativos
│   │   └── [componentes]    # Componentes públicos
│   │
│   ├── db/                   # Configuração do banco
│   │   └── drizzle/         # Schemas, migrations, seed
│   │
│   ├── dto/                  # Data Transfer Objects
│   │   └── post/            # DTOs de posts
│   │
│   ├── lib/                  # Lógica de negócio
│   │   ├── login/           # Gerenciamento de sessão
│   │   └── post/            # Queries e validações
│   │
│   ├── models/               # Modelos de dados
│   │   └── post/            # Modelo de Post
│   │
│   ├── repositories/         # Camada de acesso a dados
│   │   └── post/            # Implementações do repositório
│   │
│   └── utils/                # Utilitários
│
├── db.sqlite3                # Banco de dados SQLite
├── drizzle.config.js         # Configuração do Drizzle
├── next.config.ts            # Configuração do Next.js
├── package.json              # Dependências e scripts
└── tsconfig.json             # Configuração TypeScript
```

### Descrição das Pastas Principais

#### `src/actions/`
Contém todas as Server Actions do Next.js. Cada ação é uma função assíncrona marcada com `"use server"` que processa formulários e executa mutations.

#### `src/app/`
Estrutura de rotas do Next.js App Router. Cada pasta representa uma rota, e arquivos `page.tsx` definem as páginas.

#### `src/components/`
Componentes React reutilizáveis organizados por funcionalidade. Componentes administrativos ficam em `admin/`.

#### `src/lib/`
Lógica de negócio pura, incluindo:
- **Queries**: Funções que buscam dados com cache
- **Validations**: Schemas Zod para validação
- **Login**: Gerenciamento de sessão JWT

#### `src/repositories/`
Implementação do padrão Repository, abstraindo o acesso ao banco de dados. Permite trocar implementações (ex: Drizzle para JSON).

#### `src/models/`
Tipos TypeScript que representam entidades do domínio.

#### `src/dto/`
Data Transfer Objects para transformar dados entre camadas, especialmente para exposição pública.

---

## 🧩 Componentes Principais

### Componentes Públicos

#### `PostList`
Lista todos os posts públicos (exceto o featured) em grid responsivo.

#### `PostFeatured`
Exibe o post mais recente em destaque na homepage.

#### `SinglePost`
Renderiza um post individual completo com Markdown processado.

#### `PostSummary`
Componente reutilizável que exibe título, excerto e data de um post.

#### `SafeMarkdown`
Renderiza Markdown de forma segura com sanitização, suportando GFM (tabelas, checkboxes, etc).

#### `Header` / `Footer`
Componentes de layout da aplicação.

### Componentes Administrativos

#### `LoginForm`
Formulário de autenticação com validação e feedback de erros.

#### `ManagePostForm`
Formulário completo para criar/editar posts com:
- Editor Markdown WYSIWYG
- Upload de imagens
- Validação em tempo real
- Estado de publicação

#### `PostsListAdmin`
Lista todos os posts (publicados e não publicados) com ações de edição e exclusão.

#### `ImageUploader`
Componente para upload de imagens com preview e validação de tamanho/tipo.

#### `MenuAdmin`
Menu de navegação da área administrativa.

---

## 🔄 Fluxo de Funcionamento

### Fluxo de Autenticação

1. Usuário acessa `/admin/login`
2. Sistema verifica se login está habilitado (`ALLOW_LOGIN`)
3. Usuário preenche credenciais
4. `loginAction` valida contra variáveis de ambiente
5. Se válido, cria sessão JWT e salva em cookie httpOnly
6. Redireciona para `/admin/post`

### Fluxo de Criação de Post

1. Usuário autenticado acessa `/admin/post/new`
2. Preenche formulário com editor Markdown
3. Faz upload de imagem de capa (opcional)
4. Submete formulário
5. `createPostAction` executa:
   - Valida autenticação
   - Valida dados com Zod
   - Sanitiza HTML do conteúdo
   - Gera slug do título
   - Cria UUID para ID
   - Salva no banco via repository
   - Invalida cache
   - Redireciona para página de edição

### Fluxo de Visualização Pública

1. Usuário acessa homepage `/`
2. `findAllPublicPostsCached` busca posts publicados
3. Cache do Next.js verifica se há dados válidos
4. Se não houver, busca no banco e armazena em cache
5. Renderiza `PostFeatured` (primeiro post) e `PostList` (resto)
6. Ao acessar `/post/[slug]`, busca post específico com cache por slug

### Fluxo de Cache

O projeto utiliza duas estratégias de cache:

1. **`unstable_cache`**: Cache do Next.js com tags para invalidação
   - Tags: `['posts']` para lista, `['post-${slug}']` para individual
   - Invalidação via `revalidateTag` após mutations

2. **`cache` do React**: Deduplicação de requisições durante renderização
   - Evita múltiplas chamadas à mesma query no mesmo request

---

## 🚀 Setup e Instalação

### Pré-requisitos

- Node.js 18+ (recomendado: LTS)
- npm ou yarn

### Passos

1. **Clone o repositório** (se aplicável)
   ```bash
   git clone <repository-url>
   cd galatic-news
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env.local` na raiz do projeto com as variáveis necessárias (veja seção [Variáveis de Ambiente](#variáveis-de-ambiente)).

4. **Configure o banco de dados**
   
   O banco SQLite será criado automaticamente na primeira execução. Se necessário, execute migrations:
   ```bash
   npx drizzle-kit push
   ```

5. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

6. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📜 Scripts Disponíveis

### `npm run dev`
Inicia o servidor de desenvolvimento Next.js com hot-reload.

### `npm run build`
Gera build de produção otimizado.

### `npm run start`
Inicia servidor de produção (requer build prévio).

### `npm run lint`
Executa o ESLint para verificar problemas no código.

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Autenticação
ALLOW_LOGIN=1                    # 1 para habilitar, 0 para desabilitar
LOGIN_USER=admin                 # Usuário para login
LOGIN_PASS=<hash-base64>         # Hash bcrypt em base64 da senha
JWT_SECRET_KEY=your-secret-key   # Chave secreta para JWT (use uma string forte)
LOGIN_EXPIRATION_SECONDS=86400   # Tempo de expiração em segundos (padrão: 1 dia)
LOGIN_EXPIRATION_STRING=1d       # String de expiração para JWT (padrão: 1d)
LOGIN_COOKIE_NAME=loginSession  # Nome do cookie de sessão

# Upload de Imagens
IMAGE_UPLOAD_DIRECTORY=uploads   # Diretório relativo a public/ para uploads
IMAGE_SERVER_URL=http://localhost:3000/uploads  # URL base para imagens
NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE=921600  # Tamanho máximo em bytes (padrão: ~900KB)

# Desenvolvimento
SIMULATE_WAIT_IN_MS=0            # Simular delay em queries (útil para testes)
```

### Gerando Hash de Senha

Para gerar o hash da senha em base64 (necessário para `LOGIN_PASS`), você pode usar o utilitário do projeto:

```typescript
import { hashPassword } from './src/lib/login/manage-login';

const hash = await hashPassword('sua-senha-aqui');
console.log(hash); // Use este valor em LOGIN_PASS
```

Ou criar um script temporário para isso.

---

## ✨ Boas Práticas e Padrões

### 1. Type Safety
- Uso extensivo de TypeScript com tipos estritos
- Inferência de tipos do Drizzle ORM
- Validação com Zod para runtime type checking

### 2. Server Actions
- Todas as mutations são Server Actions
- Validação de autenticação em cada ação
- Tratamento de erros consistente
- Retorno de estados tipados

### 3. Cache Strategy
- Cache com tags para invalidação seletiva
- Deduplicação de queries com `cache` do React
- ISR para páginas públicas

### 4. Segurança
- Sanitização de HTML em conteúdo Markdown
- Validação de dados com Zod
- Autenticação JWT com cookies httpOnly
- Verificação de autenticação em rotas protegidas

### 5. Componentização
- Componentes pequenos e focados
- Reutilização de componentes
- Separação entre componentes públicos e admin

### 6. Repository Pattern
- Abstração da camada de dados
- Interface `PostRepository` permite múltiplas implementações
- Facilita testes e manutenção

### 7. Error Handling
- Tratamento de erros em todas as camadas
- Mensagens de erro amigáveis ao usuário
- Logging apropriado

---

## 🎯 Decisões Técnicas

### Por que Drizzle ORM?
- Type-safety completo com inferência de tipos
- Queries type-safe sem necessidade de strings SQL
- Migrations automáticas
- Performance otimizada

### Por que Server Actions?
- Type-safety end-to-end
- Integração nativa com Next.js
- Sem necessidade de API routes separadas
- Progressive Enhancement

### Por que SQLite?
- Simplicidade para desenvolvimento
- Não requer servidor de banco separado
- Perfeito para projetos pequenos/médios
- Fácil backup (um arquivo)

### Por que Markdown?
- Formatação rica e legível
- Suporte a código, tabelas, listas
- Editor WYSIWYG para não-técnicos
- Renderização segura com sanitização

### Por que JWT em Cookies?
- Segurança: httpOnly previne XSS
- SameSite: previne CSRF
- Expiração automática
- Sem necessidade de armazenamento no servidor

---

## 🗺 Rotas da Aplicação

### Rotas Públicas

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | ISR | Homepage com lista de posts |
| `/post/[slug]` | ISR | Visualização de post individual |

### Rotas Administrativas (Protegidas)

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/admin/login` | Dynamic | Página de login |
| `/admin/post` | Dynamic | Lista de todos os posts |
| `/admin/post/new` | Dynamic | Criar novo post |
| `/admin/post/[id]` | Dynamic | Editar post existente |

**Nota**: Todas as rotas `/admin/post/*` são protegidas por autenticação via layout.

---

## 🤝 Contribuindo

### Processo de Contribuição

1. Crie uma branch para sua feature/fix
2. Faça suas alterações seguindo os padrões do projeto
3. Execute `npm run lint` para verificar problemas
4. Teste localmente
5. Crie um Pull Request com descrição clara

### Padrões de Código

- Use TypeScript estrito
- Siga a estrutura de pastas existente
- Documente funções complexas
- Mantenha componentes pequenos e focados
- Use nomes descritivos para variáveis e funções

### Estrutura de Commits

Use mensagens de commit descritivas:
```
feat: adiciona funcionalidade X
fix: corrige bug Y
refactor: refatora componente Z
docs: atualiza documentação
```

---

## 📝 Observações Técnicas

### Cache e Revalidação

O projeto utiliza ISR (Incremental Static Regeneration) para páginas públicas. Após criar, atualizar ou deletar um post, o cache é invalidado usando `revalidateTag`, garantindo que o conteúdo atualizado seja exibido.

### Upload de Imagens

As imagens são salvas em `public/uploads/` e servidas estaticamente. O sistema valida:
- Tipo de arquivo (deve ser imagem)
- Tamanho máximo configurável
- Autenticação do usuário

### Geração de Slugs

Slugs são gerados automaticamente a partir do título usando a biblioteca `slugify`, garantindo URLs amigáveis e únicas.

### Sanitização de Conteúdo

Todo conteúdo Markdown é sanitizado antes de ser salvo e renderizado, prevenindo XSS e outros ataques.

---

## 📄 Licença

Este projeto é parte de um curso da Udemy - GFT.

---

## 📌 Nota sobre Documentação

> **Nota**: Esta documentação foi gerada com auxílio de Inteligência Artificial para garantir completude e precisão técnica. O conteúdo foi baseado na análise profunda do código-fonte do projeto.

---

**Desenvolvido com ❤️ usando Next.js e React**
