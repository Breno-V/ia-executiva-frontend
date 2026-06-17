import { create } from "zustand";
import * as insightsApi from "@/services/api/insights";
import { mockAlerts } from "@/services/mockData";
import { wsClient } from "@/services/websocket";
import type { Alert } from "@/types";

interface AlertState {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  fetchAlerts: () => Promise<void>;
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  loading: false,
  error: null,

  fetchAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const alertsData = await insightsApi.getAlerts();
      set({ alerts: alertsData, loading: false });
    } catch (err) {
      set({ alerts: mockAlerts, loading: false, error: null });
    }
  },
}));

wsClient.on<Alert>("alert:new", (alert) => {
  useAlertStore.setState((s) => ({ alerts: [alert, ...s.alerts] }));
});
