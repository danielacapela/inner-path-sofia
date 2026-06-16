# inner.path™ demo v0.14

Demo privada da app inner.path™ by inner.architecture®.

## O que esta versão acrescenta

- Motor de clientes mais limpo
- Dois modos de entrada:
  - cliente nova → começa em S1 · O Casulo
  - cliente em continuidade → começa no Ponto de Reencontro
- Cada cliente tem `slug`, `code`, `mode`, `entry`, `values`, `activeSessionId` e `sessions`
- Links por cliente através de query string:
  - `/?cliente=sofia`
  - `/?cliente=sara`
  - `/?cliente=marta`
- Sofia entra como cliente nova de teste, sem idade, apelido ou dados sensíveis
- Troca de cliente demo actualiza o URL
- Estrutura preparada para a Daniela pedir novos clientes por ficheiro, sem mexer no HTML

## Como publicar no Netlify

1. Descompactar o ZIP
2. Arrastar a pasta `inner_path_v014_netlify` para Netlify → Deploys
3. Abrir o link em janela privada/anónima

## Como criar cliente nova no `data.js`

Criar um novo objecto em `CLIENTS`:

```js
{
  id: "ana-new-demo",
  slug: "ana",
  code: "ana-001",
  mode: "new",
  entry: "base9",
  name: { pt: "Ana", en: "Ana" },
  initials: "an",
  values: { pt: ["Valor 1", "Valor 2", "Valor 3"], en: ["Value 1", "Value 2", "Value 3"] },
  activeSessionId: "base-01",
  sessions: METHOD_SESSIONS.map((session, index) => ({ ...session, status: index === 0 ? "current" : "locked" }))
}
```

## Como criar cliente em continuidade

```js
{
  id: "cliente-continuity-demo",
  slug: "cliente",
  code: "cliente-001",
  mode: "continuity",
  entry: "reconnect",
  name: { pt: "Cliente", en: "Client" },
  initials: "cl",
  values: { pt: ["Segurança", "Verdade", "Auto-respeito"], en: ["Safety", "Truth", "Self-Respect"] },
  activeSessionId: "reconnect-00",
  sessions: [REENCONTRO_SESSION, CONTINUITY_INTEGRATION]
}
```

## Nota de segurança

Ainda não usar com dados reais sensíveis. Esta versão não tem login, PIN, base de dados nem encriptação de dados em servidor. É uma demo funcional para validar estrutura e fluxo.
