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
      const alertsData = await insightsApi.getAlertsForRisks();
      set({ risks: alertsData, loading: false });
    } catch (err) {
      if (
        (err as Error)?.name === "CanceledError" ||
        (err as Error)?.name === "AbortError"
      ) {
        return;
      }
      set({ loading: false, error: "Erro ao carregar riscos" });
    }
  },
  // FIXME: riskStore e alertStore (src/store/alertStore.ts) compartilham a
  // mesma implementação porque o backend ainda não expõe um endpoint /risks
  // separado. Ambas chamam insightsApi.getAlerts(). Quando /risks existir,
  // trocar a chamada em fetchRisks para insightsApi.getRisks() e remover
  // esta store se quiser, ou mantê-la como alias semântico para riscos.
  // Nota: alertStore tem assinatura WebSocket (wsClient.on("alert:new"))
  // que riskStore não possui — manter sync se adicionar ao riskStore.
}));
