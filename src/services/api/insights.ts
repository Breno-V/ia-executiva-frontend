import api from "./client";
import type { Alert, InsightResponse } from "@/types";

const abortControllers = new Map<string, AbortController>();

function abortPrevious(key: string): AbortController {
  const prev = abortControllers.get(key);
  if (prev) prev.abort();
  const controller = new AbortController();
  abortControllers.set(key, controller);
  return controller;
}

export async function getAlerts(): Promise<Alert[]> {
  const { signal } = abortPrevious("getAlerts");
  const response = await api.get<{ data: Alert[] }>("/dashboard/alerts", { signal });
  return response.data.data || [];
}

export async function generateSummary(): Promise<InsightResponse> {
  const { signal } = abortPrevious("generateSummary");
  const response = await api.post<{ data: InsightResponse }>("/insights/generate", null, { signal });
  return response.data.data || {};
}
