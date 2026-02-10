# Server Actions

Este diretório contém todas as **Server Actions** do Next.js, que são funções assíncronas executadas no servidor para processar mutations e operações que modificam dados.

---

## 📋 Visão Geral

Server Actions são uma feature do Next.js que permite executar código no servidor diretamente de componentes React, sem necessidade de criar API routes separadas. Todas as funções neste diretório são marcadas com `"use server"` e são type-safe end-to-end.

---

## 🗂 Estrutura

```
actions/
├── login/
│   ├── login-action.ts      # Autenticação de usuário
│   └── logout-action.ts      # Logout e limpeza de sessão
├── post/
│   ├── create-post-action.ts # Criar novo post
│   ├── update-post-action.ts # Atualizar post existente
│   └── delete-post-action.ts # Deletar post
└── upload/
    └── upload-image-action.ts # Upload de imagens
```

---

## 🔐 Actions de Autenticação

### `login-action.ts`

**Responsabilidade**: Autenticar usuário e criar sessão JWT.

**Fluxo**:
1. Verifica se login está habilitado (`ALLOW_LOGIN`)
2. Valida credenciais contra variáveis de ambiente
3. Cria sessão JWT e salva em cookie httpOnly
4. Redireciona para área administrativa

**Retorno**: `LoginActionState` com username e mensagem de erro (se houver).

### `logout-action.ts`

**Responsabilidade**: Invalidar sessão do usuário.

**Fluxo**:
1. Remove cookie de sessão
2. Redireciona para página de login

---

## 📝 Actions de Posts

### `create-post-action.ts`

**Responsabilidade**: Criar um novo post no sistema.

**Fluxo**:
1. Verifica autenticação
2. Valida dados do formulário com Zod (`PostCreateSchema`)
3. Sanitiza HTML do conteúdo
4. Gera slug a partir do título
5. Cria UUID para ID
6. Salva no banco via repository
7. Invalida cache (`revalidateTag`)
8. Redireciona para página de edição

**Parâmetros**:
- `prevState`: Estado anterior do formulário
- `formData`: Dados do formulário

**Retorno**: `CreatePostActionState` com estado do formulário, erros e sucesso.

### `update-post-action.ts`

**Responsabilidade**: Atualizar um post existente.

**Fluxo**:
1. Verifica autenticação
2. Valida ID do post
3. Valida dados com Zod (`PostUpdateSchema`)
4. Atualiza no banco via repository
5. Invalida cache do post específico e da lista
6. Retorna estado atualizado

**Parâmetros**:
- `prevState`: Estado anterior do formulário
- `formData`: Dados do formulário (deve conter `id`)

**Retorno**: `UpdatePostActionState` com estado atualizado e mensagens.

### `delete-post-action.ts`

**Responsabilidade**: Deletar um post do sistema.

**Fluxo**:
1. Verifica autenticação
2. Valida ID
3. Deleta do banco via repository
4. Invalida cache

**Parâmetros**:
- `id`: ID do post a ser deletado

**Retorno**: Objeto com `error` (string vazia em caso de sucesso).

---

## 📤 Actions de Upload

### `upload-image-action.ts`

**Responsabilidade**: Fazer upload de imagens para o servidor.

**Fluxo**:
1. Verifica autenticação
2. Valida arquivo (tipo, tamanho)
3. Gera nome único baseado em timestamp
4. Salva em `public/uploads/`
5. Retorna URL da imagem

**Validações**:
- Arquivo deve ser imagem (`image/*`)
- Tamanho máximo configurável via `NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE`
- Autenticação obrigatória

**Retorno**: `UploadImageActionResult` com `url` e `error`.

---

## 🎯 Padrões e Boas Práticas

### 1. Validação de Autenticação
Todas as actions que modificam dados verificam autenticação primeiro:
```typescript
const isAuthenticated = await verifyLoginSession();
if (!isAuthenticated) {
  return { /* erro */ };
}
```

### 2. Validação de Dados
Uso de Zod para validação type-safe:
```typescript
const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);
if (!zodParsedObj.success) {
  return { errors: getZodErrorMessages(zodParsedObj.error) };
}
```

### 3. Tratamento de Erros
Todas as actions tratam erros de forma consistente:
```typescript
try {
  // operação
} catch (e: unknown) {
  if (e instanceof Error) {
    return { errors: [e.message] };
  }
  return { errors: ['Erro desconhecido'] };
}
```

### 4. Invalidação de Cache
Após mutations, o cache é invalidado:
```typescript
revalidateTag("posts", "default");
revalidateTag(`post-${slug}`, "default");
```

### 5. Estado do Formulário
Actions retornam estado do formulário para manter dados em caso de erro:
```typescript
return {
  formState: makePartialPublicPost(formDataToObj),
  errors: ['Erro aqui'],
};
```

---

## 🔗 Conexões com Outros Módulos

### Dependências
- `src/lib/login/manage-login.ts` - Autenticação e sessão
- `src/lib/post/validations.ts` - Schemas Zod
- `src/repositories/post/` - Acesso a dados
- `src/dto/post/dto.ts` - Transformação de dados
- `src/utils/` - Utilitários diversos

### Uso nos Componentes
Server Actions são usadas diretamente em componentes com `useFormState` ou `formAction`:
```typescript
const [state, formAction] = useFormState(createPostAction, initialState);
```

---

## 📝 Notas Técnicas

- Todas as actions são assíncronas e executam no servidor
- Type-safety é garantido por TypeScript e Zod
- Erros são sempre tratados e retornados de forma amigável
- Cache é sempre invalidado após mutations para manter consistência

---

## 📌 Nota sobre Documentação

> **Nota**: Esta documentação foi gerada com auxílio de Inteligência Artificial para garantir completude e precisão técnica.

