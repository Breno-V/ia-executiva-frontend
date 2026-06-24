import api from "./client";
import type { Alert, AnalyticalReport, InsightResponse } from "@/types";

const abortControllers = new Map<string, AbortController>();

function abortPrevious(key: string): AbortController {
  const prev = abortControllers.get(key);
  if (prev) prev.abort();
  const controller = new AbortController();
  abortControllers.set(key, controller);
  return controller;
}

/**
 * Busca alertas inteligentes gerados por IA via back-api.
 * Usa chave de abort separada para não conflitar com getAlertsForRisks.
 */
export async function getAlerts(): Promise<Alert[]> {
  const { signal } = abortPrevious("dashboardAlerts");
  const response = await api.get<{ data: Alert[] }>("/ai/alerts/intelligent", {
    signal,
  });
  return response.data.data || [];
}

/**
 * Busca alertas para a tela de gestão (riskStore).
 * Usa a mesma rota de alertas inteligentes com chave de abort separada.
 */
export async function getAlertsForRisks(): Promise<Alert[]> {
  const { signal } = abortPrevious("riskAlerts");
  const response = await api.get<{ data: Alert[] }>("/ai/alerts/intelligent", {
    signal,
  });
  return response.data.data || [];
}

export async function generateSummary(
  prompt?: string,
): Promise<InsightResponse> {
  const { signal } = abortPrevious("generateSummary");
  const response = await api.post<{ data: InsightResponse }>(
    "/insights/generate",
    { prompt },
    { signal },
  );
  return response.data.data || {};
}

export async function getAnalyticalReport(
  unitId?: string,
): Promise<AnalyticalReport> {
  const { signal } = abortPrevious("getAnalyticalReport");
  const response = await api.get<{ data: AnalyticalReport }>(
    "/ai/reports/analytical",
    {
      signal,
      params: unitId ? { unitId } : undefined,
    },
  );
  return response.data.data || {
    summary: "",
    keyFindings: [],
    recommendations: [],
    riskOverview: "",
    opportunityHighlights: [],
  };
}
