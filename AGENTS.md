# AnoteAI — Guia do Agente

## Stack
- **Next.js 16.2.6** (App Router) + **React 19.2.4**
- **Tailwind CSS v4** — usa `@import "tailwindcss"` e diretiva `@theme`, **NÃO** usar `@tailwind base/components/utilities` legado
- **ESLint 9** com flat config (`eslint.config.mjs`)
- **OpenAI** `gpt-4o-mini` via `POST /api/generate`

## Comandos
```
npm run dev       # servidor dev em http://localhost:3000
npm run build     # build + typecheck (não há script tsc separado)
npm run start     # servidor production
npm run lint      # ESLint
```
Sem framework de testes configurado.

## Estrutura
```
src/
  app/
    page.tsx                # Landing page (/)
    layout.tsx              # Root layout (fonte Geist, pt-BR)
    globals.css             # Tailwind base + tokens de tema
    gerar/page.tsx          # Página de geração (/gerar) — "use client"
    api/generate/route.ts   # POST handler, chama OpenAI
  components/               # 5 componentes (client/server misturados)
  hooks/use-history.ts      # Histórico localStorage (máx 5, chave: anoteai-history)
  lib/
    types.ts                # TextType, Field, FormConfig, HistoryItem
    form-config.ts          # Definições de campos por tipo de texto
    prompts.ts              # Construtor de prompt por tipo
```

## Convenções importantes
- **Alias de path**: `@/*` → `./src/*`
- **Idioma**: `pt-BR` — UI, prompts e mensagens de erro em português
- **4 tipos de texto**: `email`, `linkedin`, `product`, `bio` — cada um com campos dinâmicos definidos em `form-config.ts`
- **Histórico**: `localStorage` apenas, sem banco de dados — botão "Limpar" apaga tudo
- **Estilo**: tema escuro (`bg-zinc-950`), destaque em verde esmeralda, utilitários Tailwind inline (sem CSS modules ou arquivos de estilo separados)
- **API route**: recebe `{ type: TextType, fields: Record<string, string> }`, retorna `{ result: string }` — valida campos obrigatórios com erro 400

## Env / segredos
- `OPENAI_API_KEY` é obrigatória (usada em `src/app/api/generate/route.ts`)
- Arquivo de exemplo em `.env.local.example`
- O Next.js lê `.env.local` da raiz do app (`anoteai/`)
