# Repositories

Este diretório implementa o **Padrão Repository**, abstraindo a camada de acesso a dados e permitindo que a aplicação seja independente da implementação específica do banco de dados.

---

## 📋 Visão Geral

O padrão Repository centraliza a lógica de acesso a dados, fornecendo uma interface consistente independentemente da fonte de dados (SQLite, JSON, API, etc.). Isso facilita testes, manutenção e possíveis migrações futuras.

---

## 🗂 Estrutura

```
repositories/
└── post/
    ├── post-repository.ts          # Interface do repositório
    ├── drizzle-post-repostory.ts   # Implementação com Drizzle ORM
    ├── json-post-repository.ts     # Implementação com arquivo JSON
    └── index.ts                    # Export da implementação ativa
```

---

## 🔌 Interface: `PostRepository`

A interface define o contrato que todas as implementações devem seguir:

```typescript
interface PostRepository {
  // Queries públicas (apenas posts publicados)
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
  
  // Queries administrativas (todos os posts)
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  
  // Mutations
  create(post: PostModel): Promise<PostModel>;
  update(id: string, newPostData: Partial<PostModel>): Promise<PostModel>;
  delete(id: string): Promise<PostModel>;
}
```

---

## 🗄 Implementações

### `DrizzlePostRepository`

**Tecnologia**: Drizzle ORM + SQLite

**Características**:
- Type-safe com inferência de tipos
- Queries otimizadas
- Suporte a transações
- Migrations automáticas

**Métodos Principais**:

- **`findAllPublic()`**: Busca posts publicados ordenados por data (desc)
- **`findBySlugPublic(slug)`**: Busca post publicado por slug
- **`findAll()`**: Busca todos os posts (admin)
- **`findById(id)`**: Busca post por ID
- **`create(post)`**: Cria novo post (valida duplicação de ID/slug)
- **`update(id, data)`**: Atualiza post existente
- **`delete(id)`**: Remove post do banco

**Validações**:
- Verifica duplicação de ID ou slug antes de criar
- Valida existência antes de atualizar/deletar

### `JsonPostRepository`

**Tecnologia**: Arquivo JSON (`src/db/seed/posts.json`)

**Características**:
- Útil para desenvolvimento/testes
- Não requer banco de dados
- Leitura/escrita síncrona em arquivo

**Métodos**:
- Implementa a mesma interface de `PostRepository`
- Lê/escreve em arquivo JSON
- Mantém dados em memória durante operações

**Uso**: Pode ser usado como alternativa ao Drizzle para testes ou desenvolvimento simples.

---

## 🔄 Troca de Implementação

A implementação ativa é definida em `index.ts`:

```typescript
// Atualmente usando Drizzle
export const postRepository: PostRepository = new DrizzlePostRepository();

// Para usar JSON (desenvolvimento/testes):
// export const postRepository: PostRepository = new JsonPostRepository();
```

Para trocar a implementação, basta alterar o export em `index.ts`. O resto da aplicação não precisa ser modificado.

---

## 🎯 Padrões e Boas Práticas

### 1. Interface Consistente
Todas as implementações seguem a mesma interface, garantindo compatibilidade.

### 2. Tratamento de Erros
Métodos lançam erros descritivos quando:
- Post não encontrado
- ID/Slug duplicado
- Dados inválidos

### 3. Type Safety
Uso de `PostModel` garante type-safety em todas as operações.

### 4. Separação de Responsabilidades
- Repository: Acesso a dados
- Actions: Lógica de negócio e validação
- Queries: Cache e otimização

---

## 🔗 Conexões com Outros Módulos

### Dependências
- `src/models/post/post.model.ts` - Tipo `PostModel`
- `src/db/drizzle/` - Configuração do Drizzle ORM
- `src/utils/async-delay.ts` - Simulação de delay (desenvolvimento)

### Uso na Aplicação
Repositories são usados por:
- **Server Actions** (`src/actions/`) - Para mutations
- **Queries** (`src/lib/post/queries/`) - Para leitura de dados

**Exemplo**:
```typescript
// Em uma Server Action
await postRepository.create(newPost);

// Em uma Query
const posts = await postRepository.findAllPublic();
```

---

## 🧪 Testabilidade

O padrão Repository facilita testes:

1. **Mock Repository**: Criar implementação mock para testes unitários
2. **Test Repository**: Implementação em memória para testes de integração
3. **Isolamento**: Testar lógica de negócio sem depender do banco real

**Exemplo de Mock**:
```typescript
class MockPostRepository implements PostRepository {
  private posts: PostModel[] = [];
  
  async findAllPublic() {
    return this.posts.filter(p => p.published);
  }
  
  // ... outros métodos
}
```

---

## 📝 Notas Técnicas

### Performance
- `DrizzlePostRepository` utiliza queries otimizadas do Drizzle
- Suporte a índices do SQLite para melhor performance
- Cache é gerenciado na camada de queries, não no repository

### Transações
Atualmente não há uso explícito de transações, mas o Drizzle suporta caso seja necessário no futuro.

### Migrations
Migrations do Drizzle são gerenciadas via `drizzle-kit` e ficam em `src/db/drizzle/migrations/`.

---

## 🚀 Extensibilidade

Para adicionar uma nova implementação:

1. Criar classe que implementa `PostRepository`
2. Implementar todos os métodos da interface
3. Exportar em `index.ts` (se quiser usar como padrão)

**Exemplo**: Implementação com API REST:
```typescript
class ApiPostRepository implements PostRepository {
  async findAllPublic() {
    const response = await fetch('/api/posts/public');
    return response.json();
  }
  // ... outros métodos
}
```

---

## 📌 Nota sobre Documentação

> **Nota**: Esta documentação foi gerada com auxílio de Inteligência Artificial para garantir completude e precisão técnica.

