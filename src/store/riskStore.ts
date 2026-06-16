import { create } from "zustand";
import * as insightsApi from "@/services/api/insights";
import type { Alert } from "@/types";

interface RiskState {
  risks: Alert[];
  loading: boolean;
  error: string | null;
  fetchRisks: () => Promise<void>;
}

export const useRiskStore = create<RiskState>((set) => ({
  risks: [],
  loading: false,
  error: null,

  fetchRisks: async () => {
    set({ loading: true, error: null });
    try {
      const alertsData = await insightsApi.getAlerts();
      set({ risks: alertsData, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
  // FIXME: riskStore e alertStore são idênticos porque o backend ainda
  // não expõe um endpoint /risks separado. Quando existir, trocar
  // insightsApi.getAlerts() por um insightsApi.getRisks().
}));
