export interface User {
  email: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      companyId: string | null;
      company: {
        id: string;
        name: string;
        address: string | null;
      } | null;
    };
  };
  timestamp: string;
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
  id: string;
  title: string;
  description: string;
  severity: Severity;
  category?: string;
  suggestedAction?: string;
  financialImpact?: number;
  relatedUnitId?: string;
  type?: string;
  problem?: string;
  impact?: number;
  recommendation?: string;
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

export interface AnalyticalReport {
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  riskOverview: string;
  opportunityHighlights: string[];
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

export interface DashboardSummary {
  totalCompanies: number;
  totalUnits: number;
  totalRisks: number;
  totalKpis: number;
  totalAlerts: number;
  totalReports: number;
}

export interface KpiComparison {
  id: string;
  name: string;
  targetValue: number | null;
  currentValue: number | null;
  unitId: string;
}

export interface UnitRiskInfo {
  id: string;
  name: string;
  totalRisks: number;
  averageProbability: number;
  byImpact: {
    ALTO: number;
    MEDIO: number;
    BAIXO: number;
  };
}
