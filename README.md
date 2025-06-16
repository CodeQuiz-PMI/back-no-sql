# 📘 CodeQuiz API

A **CodeQuiz API** é um sistema backend desenvolvido com **Node.js**, **Express**, **MongoDB** e **TypeScript** que serve como motor de um quiz gamificado sobre programação. Os usuários avançam por níveis, respondem perguntas e acumulam pontos com base em seu desempenho.

---

## 📌 Endpoints da API

### 🔐 Autenticação

| Método | Rota        | Descrição                                  |
| ------ | ----------- | ------------------------------------------ |
| POST   | `/register` | Cria um novo usuário                       |
| POST   | `/login`    | Autentica o usuário e retorna um token JWT |

#### Exemplo de payload:

```json
POST /register
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
````

```json
POST /login
{
  "email": "joao@email.com",
  "password": "123456"
}
```

---

### 👤 Usuários

| Método | Rota         | Descrição                      |
| ------ | ------------ | ------------------------------ |
| GET    | `/users`     | Lista todos os usuários        |
| GET    | `/users/:id` | Retorna os dados de um usuário |
| PATCH  | `/users/:id` | Atualiza dados de um usuário   |
| DELETE | `/users/:id` | Remove um usuário do sistema   |

> ⚠️ Necessário token JWT para rotas com `:id`.

---

### 🎯 Níveis

| Método | Rota          | Descrição                   |
| ------ | ------------- | --------------------------- |
| POST   | `/levels`     | Cria um novo nível          |
| GET    | `/levels`     | Lista todos os níveis       |
| GET    | `/levels/:id` | Retorna um nível específico |
| PUT    | `/levels/:id` | Atualiza um nível           |
| DELETE | `/levels/:id` | Deleta um nível             |

#### Exemplo de payload:

```json
POST /levels
{
  "title": "Iniciante",
  "description": "Aprenda lógica básica de programação",
  "difficulty": "easy"
}
```

---

### 📚 Seções

| Método | Rota            | Descrição                    |
| ------ | --------------- | ---------------------------- |
| POST   | `/sections`     | Cria uma nova seção          |
| GET    | `/sections`     | Lista todas as seções        |
| GET    | `/sections/:id` | Retorna uma seção específica |
| PUT    | `/sections/:id` | Atualiza uma seção           |
| DELETE | `/sections/:id` | Deleta uma seção             |

#### Exemplo de payload:

```json
POST /sections
{
  "title": "Condicionais",
  "description": "Aprenda if, else, switch",
  "level": "665f6bc13d18fe9c63a9d91a"
}
```

---

### ❓ Perguntas

| Método | Rota             | Descrição                       |
| ------ | ---------------- | ------------------------------- |
| POST   | `/questions`     | Cria uma nova pergunta          |
| GET    | `/questions`     | Lista todas as perguntas        |
| GET    | `/questions/:id` | Retorna uma pergunta específica |
| PUT    | `/questions/:id` | Atualiza uma pergunta           |
| DELETE | `/questions/:id` | Deleta uma pergunta             |

#### Exemplo de payload:

````json
POST /questions
{
  "title": "Condicionais Simples",
  "text": "O que o seguinte código imprime?\n\n```js\nif (2 > 1) {\n  console.log('Verdadeiro');\n} else {\n  console.log('Falso');\n}",
  "answer": "Escolha a alternativa correta:",
  "response_1": "Verdadeiro",
  "response_2": "Falso",
  "correctResponse": "Verdadeiro",
  "type": "múltipla-escolha",
  "order": 1,
  "points": 5,
  "section": "665f6bc13d18fe9c63a9d91c"
}
````

---

### 🧠 Submissão de Respostas e Ranking

| Método | Rota                   | Descrição                              |
| ------ | ---------------------- | -------------------------------------- |
| POST   | `/logs/submit`         | Envia a resposta de uma pergunta       |
| GET    | `/logs`                | Lista todos os registros de resposta   |
| GET    | `/logs/:userId`        | Lista todos os registros de um usuário |
| DELETE | `/logs/:userId/delete` | Deleta todos os logs de um usuário     |

#### Exemplo de payload:

```json
POST /logs/submit
{
  "userId": "665f6bb83d18fe9c63a9d912",
  "questionId": "665f6bfb3d18fe9c63a9d918",
  "userAnswer": "Verdadeiro"
}
```

---

## 📐 Schemas principais

### User

```ts
{
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
```

### Level

```ts
{
  title: string;
  description: string;
  difficulty: string;
  createdAt: Date;
}
```

### Section

```ts
{
  title: string;
  description: string;
  level: ObjectId;
  createdAt: Date;
}
```

### Question

```ts
{
  title: string;
  text: string;
  answer: string;
  response_1: string;
  response_2?: string;
  response_3?: string;
  response_4?: string;
  correctResponse: string;
  type: string;
  order: number;
  points: number;
  section: ObjectId;
  createdAt: Date;
}
```

### AnswerLog

```ts
{
  user: ObjectId;
  question: ObjectId;
  userAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
  section: ObjectId;
  level: ObjectId;
  createdAt: Date;
}
```

---

## 🔑 Autenticação com JWT

Inclua o token em rotas protegidas via header:

```http
Authorization: Bearer seu_token_jwt
```

---

## 🚀 Testes

Para rodar os testes (usando Jest):

```bash
npm run test
```

---

## 📂 Estrutura de Diretórios

```
src/
├── controllers/
├── interfaces/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── app.ts
├── db.ts
└── server.ts
```

---

## 🧑‍💻 Autor

Desenvolvido por Diego André, Maria Julia, Magnolia, Leonardo Giora e Aline — Projeto acadêmico e educacional.

```
