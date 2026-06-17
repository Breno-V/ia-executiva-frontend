import type { KpiDaily, KpiMonthly, Alert, RegionRevenue, ProjectionData, UnitStatus, RadarMetric, InsightResponse } from "@/types";

export const mockKpiDaily: KpiDaily = {
  revenue: 4_250_000,
  expenses: 3_200_000,
  net: 1_050_000,
};

export const mockKpisMonthly: KpiMonthly[] = [
  { month: "01/2024", revenue: 3_200_000, expenses: 2_600_000, net: 600_000 },
  { month: "02/2024", revenue: 3_400_000, expenses: 2_700_000, net: 700_000 },
  { month: "03/2024", revenue: 3_600_000, expenses: 2_800_000, net: 800_000 },
  { month: "04/2024", revenue: 3_500_000, expenses: 2_900_000, net: 600_000 },
  { month: "05/2024", revenue: 3_800_000, expenses: 3_000_000, net: 800_000 },
  { month: "06/2024", revenue: 4_000_000, expenses: 3_100_000, net: 900_000 },
  { month: "07/2024", revenue: 3_900_000, expenses: 3_050_000, net: 850_000 },
  { month: "08/2024", revenue: 4_100_000, expenses: 3_150_000, net: 950_000 },
  { month: "09/2024", revenue: 4_200_000, expenses: 3_200_000, net: 1_000_000 },
  { month: "10/2024", revenue: 4_150_000, expenses: 3_180_000, net: 970_000 },
  { month: "11/2024", revenue: 4_300_000, expenses: 3_250_000, net: 1_050_000 },
  { month: "12/2024", revenue: 4_250_000, expenses: 3_200_000, net: 1_050_000 },
];

export const mockAlerts: Alert[] = [
  {
    id: 1,
    type: "Financeiro",
    title: "Concentração de receita em canal único",
    problem: "O canal 'Especialidades' representa 74% da receita total do mês, ultrapassando o limite de 70%.",
    severity: "high",
    impact: 1_200_000,
    recommendation: "Diversificar canais de venda. Acionar equipe comercial para novos mercados.",
    date: "17/06/2026",
    status: "open",
  },
  {
    id: 2,
    type: "Operacional",
    title: "Queda de produtividade acima do esperado",
    problem: "Indicador de produtividade caiu 12% no trimestre, superando a meta máxima de 10%.",
    severity: "medium",
    impact: 580_000,
    recommendation: "Revisar escala de turnos e identificar gargalos na linha de produção.",
    date: "15/06/2026",
    status: "in_progress",
  },
  {
    id: 3,
    type: "Financeiro",
    title: "Despesas operacionais acima do orçado",
    problem: "Despesas do mês superaram o orçado em 8%, principalmente na rubrica de logística.",
    severity: "high",
    impact: 890_000,
    recommendation: "Auditar contratos de frete e renegociar com transportadoras.",
    date: "14/06/2026",
    status: "open",
  },
  {
    id: 4,
    type: "RH",
    title: "Rotatividade acima do threshold",
    problem: "Turnover mensal atingiu 5.2%, acima do limite aceitável de 3%.",
    severity: "low",
    impact: 120_000,
    recommendation: "Aplicar pesquisa de clima e revisar pacote de benefícios.",
    date: "12/06/2026",
    status: "resolved",
  },
  {
    id: 5,
    type: "TI",
    title: "Latência elevada no sistema de vendas",
    problem: "Tempo médio de resposta do ERP comercial subiu para 4.8s (meta: <2s).",
    severity: "medium",
    impact: 340_000,
    recommendation: "Escalar infraestrutura e otimizar consultas críticas no banco de dados.",
    date: "10/06/2026",
    status: "in_progress",
  },
];

export const mockRegionRevenue: RegionRevenue[] = [
  { region: "Sudeste", total: 2_150_000 },
  { region: "Sul", total: 980_000 },
  { region: "Nordeste", total: 620_000 },
  { region: "Centro-Oeste", total: 350_000 },
  { region: "Norte", total: 150_000 },
] as RegionRevenue[];

export const mockProjections: ProjectionData[] = [
  { period: "Atual", revenue: 4_250_000, expenses: 3_200_000, net: 1_050_000 },
  { period: "30 dias", revenue: 4_450_000, expenses: 3_250_000, net: 1_200_000 },
  { period: "90 dias", revenue: 4_800_000, expenses: 3_350_000, net: 1_450_000 },
  { period: "180 dias", revenue: 5_200_000, expenses: 3_500_000, net: 1_700_000 },
  { period: "360 dias", revenue: 6_100_000, expenses: 3_800_000, net: 2_300_000 },
];

export const mockUnitStatuses: UnitStatus[] = [
  { name: "Campinas", status: "stable", financialImpact: 420_000 },
  { name: "São Paulo", status: "stable", financialImpact: 380_000 },
  { name: "Interior", status: "attention", financialImpact: 280_000 },
  { name: "São Bernardo", status: "critical", financialImpact: 180_000 },
  { name: "São José dos Campos", status: "stable", financialImpact: 340_000 },
];

export const mockRadarMetrics: RadarMetric[] = [
  { label: "Produtividade", before: 45, after: 78 },
  { label: "Integração", before: 30, after: 85 },
  { label: "Controle", before: 50, after: 72 },
  { label: "Velocidade", before: 35, after: 68 },
  { label: "Previsibilidade", before: 40, after: 80 },
];

export const mockInsightResponse: InsightResponse = {
  exec_summary: "A receita acumulada no ano apresenta crescimento consistente de 8.2% em relação ao semestre anterior. A concentração no canal de especialidades requer atenção, mas o ROI de 312% sobre investimentos em automação indica retorno expressivo. A redução de custos operacionais projetada para os próximos 180 dias pode gerar economia adicional de R$ 1,7 milhão.",
  narrative_text: "Análise gerada com base nos dados financeiros disponíveis.",
};

export const mockKpiCards = {
  economiaPotencial: 510_000,
  ganhoProdutividade: 34,
  potencialAutomacao: 58,
  roiEstimado: 312,
};

export function getMockKpiData() {
  return {
    kpiDaily: mockKpiDaily,
    kpisMonthly: mockKpisMonthly,
    alerts: mockAlerts,
  };
}

export function getMockKpiCards() {
  return mockKpiCards;
}
