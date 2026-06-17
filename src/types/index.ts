export interface User {
  email: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface KpiDaily {
  revenue: number;
  expenses: number;
  net: number;
}

export interface KpiMonthly {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

export type Severity = "high" | "medium" | "low";

export type RiskStatus = "open" | "in_progress" | "resolved";

export interface Alert {
  id: number;
  type?: string;
  title: string;
  problem: string;
  severity: Severity;
  impact: number;
  recommendation: string;
  date?: string;
  status?: RiskStatus;
}

export interface RegionRevenue {
  region: string;
  total: number;
}

export interface InsightResponse {
  exec_summary?: string;
  narrative_text?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export interface ProjectionData {
  period: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface KpiCards {
  economiaPotencial: number;
  ganhoProdutividade: number;
  potencialAutomacao: number;
  roiEstimado: number;
}

export interface UnitStatus {
  name: string;
  status: "stable" | "attention" | "critical";
  financialImpact: number;
}

export interface RadarMetric {
  label: string;
  before: number;
  after: number;
}
