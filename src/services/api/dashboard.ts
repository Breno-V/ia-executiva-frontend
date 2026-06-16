import api from "./client";
import type { KpiDaily, KpiMonthly, RegionRevenue } from "@/types";

export async function getKpisDaily(): Promise<KpiDaily[]> {
  const response = await api.get<KpiDaily[]>("/dashboard/kpis/daily");
  return response.data;
}

export async function getKpisMonthly(): Promise<KpiMonthly[]> {
  const response = await api.get<KpiMonthly[]>("/dashboard/kpis/monthly");
  return response.data;
}

export async function getRevenueByRegion(): Promise<RegionRevenue[]> {
  const response = await api.get<RegionRevenue[]>("/dashboard/kpis/regional");
  return response.data;
}
