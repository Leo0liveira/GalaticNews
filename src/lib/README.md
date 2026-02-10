# Business Logic Layer

Este diretório contém a **lógica de negócio** da aplicação, incluindo queries otimizadas, validações de dados e gerenciamento de autenticação.

---

## 📋 Visão Geral

A camada `lib/` centraliza a lógica de negócio, separando-a da apresentação (components) e do acesso a dados (repositories). Isso garante reutilização, testabilidade e manutenibilidade.

---

## 🗂 Estrutura

```
lib/
├── login/
│   └── manage-login.ts        # Gerenciamento de sessão JWT
└── post/
    ├── queries/
    │   ├── public.ts          # Queries públicas com cache
    │   └── admin.ts           # Queries administrativas
    └── validations.ts         # Schemas Zod para validação
```

---

## 🔐 Autenticação: `lib/login/`

### `manage-login.ts`

**Responsabilidade**: Gerenciar sessões de autenticação usando JWT.

#### Funções Principais

**`hashPassword(password: string)`**
- Gera hash bcrypt da senha
- Retorna hash em base64
- Usado para armazenar senha em variável de ambiente

**`verifyPassword(password: string, base64Hash: string)`**
- Compara senha com hash armazenado
- Usado no processo de login

**`createLoginSession(username: string)`**
- Cria JWT com username e expiração
- Salva em cookie httpOnly, secure, sameSite=strict
- Expiração configurável via `LOGIN_EXPIRATION_SECONDS`

**`deleteLoginSession()`**
- Remove cookie de sessão
- Usado no logout

**`getLoginSession()`**
- Lê e valida JWT do cookie
- Retorna payload ou `false` se inválido

**`verifyLoginSession()`**
- Verifica se usuário está autenticado
- Compara username do JWT com `LOGIN_USER`
- Retorna `boolean`

**`requireLoginSessionOrRedirect()`**
- Verifica autenticação
- Redireciona para `/admin/login` se não autenticado
- Usado em layouts/páginas protegidas

#### Configuração

Variáveis de ambiente necessárias:
- `JWT_SECRET_KEY`: Chave secreta para assinar JWT
- `LOGIN_USER`: Usuário válido
- `LOGIN_PASS`: Hash bcrypt em base64 da senha
- `LOGIN_EXPIRATION_SECONDS`: Tempo de expiração
- `LOGIN_COOKIE_NAME`: Nome do cookie

#### Segurança

- Cookies httpOnly (não acessíveis via JavaScript)
- Cookies secure (apenas HTTPS em produção)
- SameSite=strict (proteção CSRF)
- Validação de algoritmo JWT (HS256)
- Verificação de expiração automática

---

## 📝 Posts: `lib/post/`

### `validations.ts`

**Responsabilidade**: Definir schemas Zod para validação de dados de posts.

#### Schemas

**`PostBaseSchema`**
- Validação base para criação e atualização
- Campos:
  - `title`: 3-120 caracteres
  - `content`: Mínimo 3 caracteres, sanitizado automaticamente
  - `author`: 4-100 caracteres
  - `excerpt`: 3-200 caracteres
  - `coverImageUrl`: URL ou caminho relativo válido
  - `published`: Boolean (transforma 'on', 'true', etc.)

**`PostCreateSchema`**
- Atualmente igual a `PostBaseSchema`
- Pode ser estendido no futuro

**`PostUpdateSchema`**
- Estende `PostBaseSchema`
- Pode incluir validações específicas de atualização

#### Transformações

- **Sanitização de HTML**: Conteúdo é sanitizado automaticamente via `sanitize-html`
- **Transformação de published**: Converte strings ('on', 'true') para boolean
- **Trim**: Remove espaços em branco do início/fim

### `queries/public.ts`

**Responsabilidade**: Queries públicas com cache otimizado.

#### Funções

**`findAllPublicPostsCached()`**
- Busca todos os posts publicados
- Cache com tag `['posts']`
- Usa `unstable_cache` + `cache` do React
- Invalidação via `revalidateTag('posts')`

**`findPublicPostBySlugCached(slug: string)`**
- Busca post publicado por slug
- Cache com tag `['post-${slug}']`
- Retorna 404 se não encontrado
- Invalidação via `revalidateTag('post-${slug}')`

#### Estratégia de Cache

1. **`unstable_cache`**: Cache do Next.js com tags
   - Permite invalidação seletiva
   - Persiste entre requests

2. **`cache` do React**: Deduplicação durante renderização
   - Evita múltiplas chamadas no mesmo request
   - Útil para componentes que compartilham dados

### `queries/admin.ts`

**Responsabilidade**: Queries administrativas (sem cache, dados sempre atualizados).

#### Funções

**`findAllPostAdmin()`**
- Busca todos os posts (publicados e não publicados)
- Usa `cache` do React para deduplicação
- Sem cache persistente (sempre busca dados frescos)

**`findPostByIdAdmin(id: string)`**
- Busca post por ID (admin)
- Usa `cache` do React para deduplicação
- Sem cache persistente

---

## 🎯 Padrões e Boas Práticas

### 1. Separação de Responsabilidades
- **Queries**: Apenas leitura com cache
- **Validations**: Apenas validação e transformação
- **Login**: Apenas gerenciamento de sessão

### 2. Cache Strategy
- **Público**: Cache persistente com tags para invalidação
- **Admin**: Sem cache persistente (dados sempre frescos)
- **Deduplicação**: `cache` do React em ambos os casos

### 3. Type Safety
- Schemas Zod garantem type-safety em runtime
- Inferência de tipos do TypeScript
- Validação antes de processar dados

### 4. Segurança
- Sanitização automática de HTML
- Validação rigorosa de dados
- Autenticação verificada em todas as operações sensíveis

---

## 🔗 Conexões com Outros Módulos

### Dependências
- `src/repositories/post/` - Acesso a dados
- `src/utils/` - Utilitários (ex: `get-zod-error-messages`)
- `next/cache` - Sistema de cache do Next.js
- `jose` - JWT
- `bcryptjs` - Hash de senhas
- `zod` - Validação

### Uso na Aplicação

**Queries** são usadas em:
- Componentes Server Components (`src/components/`)
- Páginas (`src/app/`)

**Validations** são usadas em:
- Server Actions (`src/actions/`)

**Login** é usado em:
- Server Actions de autenticação
- Layouts protegidos
- Verificação de permissões

---

## 📝 Exemplos de Uso

### Usando Queries Públicas

```typescript
// Em um Server Component
import { findAllPublicPostsCached } from '@/lib/post/queries/public';

export default async function HomePage() {
  const posts = await findAllPublicPostsCached();
  // posts está em cache, múltiplas chamadas não fazem queries extras
  return <PostsList posts={posts} />;
}
```

### Usando Validações

```typescript
// Em uma Server Action
import { PostCreateSchema } from '@/lib/post/validations';

const result = PostCreateSchema.safeParse(formData);
if (!result.success) {
  return { errors: getZodErrorMessages(result.error) };
}
```

### Verificando Autenticação

```typescript
// Em um layout protegido
import { requireLoginSessionOrRedirect } from '@/lib/login/manage-login';

export default async function AdminLayout() {
  await requireLoginSessionOrRedirect(); // Redireciona se não autenticado
  return <>{children}</>;
}
```

---

## 🧪 Testabilidade

A separação da lógica de negócio facilita testes:

1. **Queries**: Podem ser testadas com mocks do repository
2. **Validations**: Schemas Zod podem ser testados isoladamente
3. **Login**: Funções puras podem ser testadas sem dependências externas

---

## 📌 Nota sobre Documentação

> **Nota**: Esta documentação foi gerada com auxílio de Inteligência Artificial para garantir completude e precisão técnica.

