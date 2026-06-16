import api from "./client";
import type { Alert, InsightResponse } from "@/types";

export async function getAlerts(): Promise<Alert[]> {
  const response = await api.get<Alert[]>("/dashboard/alerts");
  return response.data;
}

export async function generateSummary(): Promise<InsightResponse> {
  const response = await api.post<InsightResponse>("/insights/generate");
  return response.data;
}
