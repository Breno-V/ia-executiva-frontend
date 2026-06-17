# ExecutivoX

Cockpit estratégico para CEO e liderança executiva — frontend Next.js com TypeScript, Zustand e Tailwind CSS.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript (strict mode) |
| Estilo | Tailwind CSS v4 + CSS Modules |
| Estado | Zustand |
| Gráficos | Chart.js + react-chartjs-2 |
| Mapas | Leaflet + react-leaflet |
| HTTP | Axios |
| Animação | Lenis (smooth scroll) |
| Validação | Zod |
| Testes | Vitest + Testing Library |

---

## ⚡ Primeiros Passos

### Pré-requisitos
- Node.js >= 18
- npm >= 9

### 1. Clone e instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Crie o arquivo `.env.local` com a URL da API:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Inicie o frontend

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Estrutura de Pastas

```
src/
├── proxy.ts                 # Next.js middleware (CORS + auth)
├── app/
│   ├── page.tsx             # Dashboard Executivo
│   ├── layout.tsx           # Root layout
│   ├── loading.tsx          # Loading state global
│   ├── error.tsx            # Error boundary global
│   ├── not-found.tsx        # Página 404
│   ├── globals.css
│   ├── login/
│   │   ├── page.tsx         # Autenticação
│   │   ├── error.tsx
│   │   └── loading.tsx
│   ├── gestao/
│   │   ├── page.tsx         # Gestão Principal
│   │   ├── error.tsx
│   │   └── loading.tsx
│   ├── alertas/
│   │   ├── page.tsx         # Alertas & Chatbot IA
│   │   ├── error.tsx
│   │   └── loading.tsx
│   ├── relatorios/
│   │   ├── page.tsx         # Relatórios Executivos
│   │   ├── error.tsx
│   │   └── loading.tsx
│   └── geografica/
│       ├── page.tsx         # Visualização Geográfica
│       ├── error.tsx
│       └── loading.tsx
├── components/
│   ├── ui/                  # Button, SearchBar, SectionTitle, SkeletonLoader, AiContextCard, UnitStatusCard
│   ├── layout/              # Sidebar, AuthLayout, Footer
│   ├── kpi/                 # KpiCard
│   ├── alerts/              # AlertCard
│   ├── charts/              # ProjectionLineChart, PriorityBarChart
│   └── map/                 # RegionalMap
├── hooks/                   # useHome, useGestao, useAI, useAuth, useKPIs, useAlerts, useChat, useChartTheme, useWebSocket
├── store/                   # Zustand: authStore, kpiStore, riskStore, alertStore, chatStore
├── services/
│   ├── api/                 # API modules: client, auth, dashboard, insights
│   ├── websocket/           # WebSocket client: real-time events + auto-reconnect
│   └── mockData.ts          # Dados mockados para dev
├── __tests__/               # Vitest: formatters, stores, components, websocket
├── libs/                    # formatters, constants, LenisContext, chartRegistry
└── types/                   # index.ts (tipagens globais)
```

---

## Funcionalidades

### Dashboard Executivo (`/`)
- Cards de KPIs: Economia Potencial Mensal, Ganho de Produtividade, Potencial de Automação, ROI Estimado
- `ProjectionLineChart` — projeção de receita (Atual, 30, 90, 180, 360 dias)
- `PriorityBarChart` — impacto financeiro por departamento (barras horizontais)

- `RegionalMap` — mapa de performance regional com Leaflet
- `AiContextCard` — resumo do contexto da IA com comando rápido

### Gestão Principal (`/gestao`)
- Tabela de riscos com filtros por severidade, área e busca textual
- Botão "Detalhar" com painel expansível (problema, impacto, recomendação, data)
- Estados vazios com fluxo explicativo

### Alertas & Inteligência (`/alertas`)
- Painel de Alertas: lista de alertas categorizados por severidade
- Chatbot Executivo: perguntas e respostas com IA (com fallback offline)
- Monitoramento de receita, canais e KPIs

### Relatórios Executivos (`/relatorios`)
- Resumo analítico gerado por IA
- Tabela de projeções financeiras (90, 180, 360 dias)
- Gráfico radar comparativo "Antes vs Depois"

### Visualização Geográfica (`/geografica`)
- Mapa interativo com unidades de negócio
- Painel lateral com status por unidade (Estável, Atenção, Crítico) e impacto financeiro

---

## Comandos

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Servir build
npm run lint     # ESLint
npm run test     # Vitest
```

---

## Dependências

### Runtime
- `next`, `react`, `react-dom`
- `axios`
- `chart.js`, `react-chartjs-2`
- `leaflet`, `react-leaflet`
- `lenis`
- `zustand`
- `zod`

### Dev
- `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `@types/leaflet`
- `tailwindcss`, `@tailwindcss/postcss`
- `eslint`, `eslint-config-next`
- `babel-plugin-react-compiler`
- `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`
