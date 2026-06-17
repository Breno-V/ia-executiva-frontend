import { create } from "zustand";
import api from "@/services/api/client";
import { getMockKpiData } from "@/services/mockData";
import type { KpiDaily, KpiMonthly, Alert } from "@/types";

let abortController: AbortController | null = null;

interface KpiState {
  kpiDaily: KpiDaily | null;
  kpisMonthly: KpiMonthly[];
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  fetchKPIs: () => Promise<void>;
}

export const useKpiStore = create<KpiState>((set) => ({
  kpiDaily: null,
  kpisMonthly: [],
  alerts: [],
  loading: false,
  error: null,

  fetchKPIs: async () => {
    abortController?.abort();
    abortController = new AbortController();
    const signal = abortController.signal;

    set({ loading: true, error: null });
    try {
      const [daily, monthly, alertsData] = await Promise.all([
        api.get<KpiDaily[]>("/dashboard/kpis/daily", { signal }),
        api.get<KpiMonthly[]>("/dashboard/kpis/monthly", { signal }),
        api.get<Alert[]>("/dashboard/alerts", { signal }),
      ]);
      set({
        kpiDaily: daily.data[0] || null,
        kpisMonthly: [...monthly.data].reverse(),
        alerts: alertsData.data,
        loading: false,
      });
    } catch (err) {
      if ((err as Error)?.name === "CanceledError") return;
      const mock = getMockKpiData();
      set({
        kpiDaily: mock.kpiDaily,
        kpisMonthly: mock.kpisMonthly,
        alerts: mock.alerts,
        loading: false,
        error: null,
      });
    }
  },
}));
