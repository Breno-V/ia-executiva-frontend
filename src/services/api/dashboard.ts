import api from "./client";
import type { KpiDaily, KpiMonthly, RegionRevenue } from "@/types";

const abortControllers = new Map<string, AbortController>();

function abortPrevious(key: string): AbortController {
  const prev = abortControllers.get(key);
  if (prev) prev.abort();
  const controller = new AbortController();
  abortControllers.set(key, controller);
  return controller;
}

export async function getKpisDaily(): Promise<KpiDaily[]> {
  const { signal } = abortPrevious("getKpisDaily");
  const response = await api.get<KpiDaily[]>("/dashboard/kpis/daily", { signal });
  return response.data;
}

export async function getKpisMonthly(): Promise<KpiMonthly[]> {
  const { signal } = abortPrevious("getKpisMonthly");
  const response = await api.get<KpiMonthly[]>("/dashboard/kpis/monthly", { signal });
  return response.data;
}

export async function getRevenueByRegion(): Promise<RegionRevenue[]> {
  const { signal } = abortPrevious("getRevenueByRegion");
  const response = await api.get<RegionRevenue[]>("/dashboard/kpis/regional", { signal });
  return response.data;
}
