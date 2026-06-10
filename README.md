# IA Executiva — Frontend

Cockpit estratégico para CEO e liderança executiva da **Cristália**. Consome a API FastAPI do repositório `ia-executiva-backend` e exibe KPIs, riscos, alertas, relatórios e análises geradas por IA.

## Resumo

Painel web moderno que centraliza indicadores financeiros, diagnósticos de risco, alertas inteligentes e relatórios executivos em uma única interface. A IA processa dados de DFC (fluxo de caixa) e vendas para gerar insights acionáveis para a tomada de decisão.

## Objetivo

Fornecer ao CEO e à liderança uma visão unificada e em tempo real da saúde financeira da empresa, eliminando a necessidade de planilhas manuais e relatórios dispersos. O sistema:

- Consolida KPIs diários e mensais de receita, despesas e resultado líquido
- Detecta riscos e anomalias automaticamente via regras de negócio
- Gera alertas proativos sobre concentração de canais e variação de KPIs
- Produz relatórios executivos com projeções financeiras e cenários comparativos
- Disponibiliza um chatbot com IA para tirar dúvidas sobre os dados

## Tecnologias

| Frontend | Backend (API) |
|----------|---------------|
| [Next.js 16 (App Router)](https://nextjs.org/docs) | FastAPI (Python) |
| [React 19](https://react.dev/learn) | PostgreSQL |
| [Leaflet](https://leafletjs.com/) / react-leaflet | Redis (Celery) |
| [Chart.js](https://www.chartjs.org/) / react-chartjs-2 | JWT Auth |
| [Lenis (scroll suave)](https://www.lenis.dev/) | SQLAlchemy + Alembic |
| [Axios](https://axios.rest/pages/getting-started/first-steps.html) | Celery + Celery Beat |
| [Tailwind CSS v4](https://tailwindcss.com/docs/installation/framework-guides) | Pydantic v2 |

## Telas

### Login (`/login`)

Tela de autenticação via email e senha. Após o login bem-sucedido, um token JWT é armazenado no `localStorage` e enviado automaticamente em todas as requisições seguintes.

**O que resolve:** Protege o acesso aos dados estratégicos da empresa, garantindo que apenas usuários autenticados possam visualizar o painel.

---

### Dashboard (`/`)

Página principal com visão geral dos indicadores da empresa. Dividida em seções navegáveis por botões de âncora no topo:

- **KPIs Principais** — cartões de Receita, Despesas e Resultado Líquido do dia
- **Tendência da Receita** — gráfico de linha (6 meses) + pizza por canal de venda
- **Mapa de Performance Regional** — mapa do Brasil com marcadores interativos por região (Leaflet)
- **Análise IA** — seção com alerts atuais e acesso ao chatbot

**O que resolve:** Dá ao CEO uma visão de helicóptero do negócio em segundos, sem precisar abrir múltiplas planilhas ou sistemas.

---

### Gestão (`/gestao`)

Tabela de diagnósticos/riscos identificados pela IA. Cada risco exibe:

- ID, área, descrição, nível de severidade (Alto/Médio/Baixo), impacto financeiro e status
- Filtros por severidade e área + busca textual
- Painel de detalhes expansível com problema, impacto, recomendação e data

**Estados de vazio:**
- **Sem dados:** hero explicando o fluxo (upload → IA processa → diagnósticos aparecem) + 3 cards de como funciona
- **Filtro sem resultado:** mensagem + botão "Limpar Filtros"

**O que resolve:** Centraliza todos os diagnósticos de risco em um só lugar, permitindo priorizar ações corretivas com base na severidade e no impacto financeiro.

---

### Alertas & IA (`/alertas`)

Painel de alertas com dois modos:

- **Modo Grid** — cards de alerta com severidade (Alta/Média/Baixa), mensagem e data
- **Modo Chat** — chatbot executivo que responde perguntas sobre os dados da empresa usando IA generativa

**Estado de vazio:** hero positivo ("Tudo tranquilo por aqui!") + 3 cards explicando o que a IA monitora (receita, canais, KPIs).

**O que resolve:** Mantém a liderança informada sobre eventos críticos em tempo real e oferece um canal direto para consultar a IA sobre qualquer aspecto do negócio.

---

### Relatórios (`/relatorios`)

Página de relatórios executivos com:

- **Resumo Analítico** — geração sob demanda de um resumo executivo via IA (botão "Gerar Resumo Executivo")
- **Projeções Financeiras** — tabela com projeções de receita, despesas e resultado líquido em 90, 180 e 360 dias
- **Cenário Antes vs Depois** — gráfico radar comparando métricas (Produtividade, Integração, Controle, Velocidade, Previsibilidade) antes e depois das recomendações da IA

**O que resolve:** Transforma dados brutos em narrativa executiva, projeta cenários futuros e quantifica o impacto das recomendações da IA, facilitando a comunicação com o conselho e investidores.

---

## Como iniciar o projeto

### Pré-requisitos

- Node.js 18+
- Backend `ia-executiva-backend` rodando (FastAPI + PostgreSQL + Redis)

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variável de ambiente
# Crie ou edite .env.local com:
NEXT_PUBLIC_API_URL=http://localhost:8000

# 3. Iniciar em modo dev
npm run dev

# 4. Acessar
# http://localhost:3000
```

### Credenciais de teste

```
Email: ceo@cristalia.com.br
Senha: 123
```

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Compila para produção |
| `npm start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint |

### Build

```bash
npm run build
```

A build compila sem erros e gera páginas estáticas para todas as 5 rotas (`/`, `/login`, `/gestao`, `/alertas`, `/relatorios`).
