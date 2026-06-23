import { create } from "zustand";
import api from "@/services/api/client";
import type {
  KpiDaily,
  KpiMonthly,
  Alert,
  DashboardSummary,
  KpiComparison,
  UnitRiskInfo,
} from "@/types";

let abortController: AbortController | null = null;

interface KpiState {
  kpiDaily: KpiDaily | null;
  kpisMonthly: KpiMonthly[];
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  fetchKPIs: () => Promise<void>;

  summary: DashboardSummary | null;
  kpiComparisons: KpiComparison[];
  unitRisks: UnitRiskInfo[];
  fetchSummary: () => Promise<void>;
  fetchComparisons: () => Promise<void>;
  fetchUnitRisks: () => Promise<void>;
}

export const useKpiStore = create<KpiState>((set) => ({
  kpiDaily: null,
  kpisMonthly: [],
  alerts: [],
  loading: false,
  error: null,

  summary: null,
  kpiComparisons: [],
  unitRisks: [],

  fetchKPIs: async () => {
    abortController?.abort();
    abortController = new AbortController();
    const signal = abortController.signal;

    set({ loading: true, error: null });
    try {
      const [daily, monthly, alertsData] = await Promise.all([
        api.get<{ data: KpiDaily[] }>("/dashboard/kpis/daily", { signal }),
        api.get<{ data: KpiMonthly[] }>("/dashboard/kpis/monthly", { signal }),
        api.get<{ data: Alert[] }>("/dashboard/alerts", { signal }),
      ]);
      set({
        kpiDaily: daily.data.data?.[0] || null,
        kpisMonthly: [...(monthly.data.data || [])].reverse(),
        alerts: alertsData.data.data || [],
        loading: false,
      });
    } catch (err) {
      if ((err as Error)?.name === "CanceledError") return;
      set({ loading: false, error: null });
    }
  },

  fetchSummary: async () => {
    try {
      const res = await api.get<{ data: DashboardSummary }>(
        "/dashboard/summary",
      );
      set({ summary: res.data.data });
    } catch {
      set({ summary: null });
    }
  },

  fetchComparisons: async () => {
    try {
      const res = await api.get<{ data: KpiComparison[] }>("/kpis");
      set({ kpiComparisons: res.data.data || [] });
    } catch {
      set({ kpiComparisons: [] });
    }
  },

  fetchUnitRisks: async () => {
    try {
      const res = await api.get<{ data: UnitRiskInfo[] }>("/units/status");
      set({ unitRisks: res.data.data || [] });
    } catch {
      set({ unitRisks: [] });
    }
  },
}));
