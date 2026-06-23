import { useEffect, useRef } from "react";
import { useKpiStore } from "@/store/kpiStore";
import { wsClient } from "@/services/websocket";
import type { KpiDaily, KpiMonthly, DashboardSummary, KpiComparison, UnitRiskInfo } from "@/types";

const POLL_INTERVAL = 30000;

export function useHome() {
  const {
    kpiDaily,
    kpisMonthly,
    alerts,
    loading,
    error,
    fetchKPIs,
    summary,
    kpiComparisons,
    unitRisks,
    fetchSummary,
    fetchComparisons,
    fetchUnitRisks,
  } = useKpiStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetchKPIs();
    fetchSummary();
    fetchComparisons();
    fetchUnitRisks();

    const unsubKpi = wsClient.on("kpi:updated", (data: unknown) => {
      const d = data as { daily: KpiDaily; monthly: KpiMonthly[] } | null;
      if (d) {
        useKpiStore.setState({
          kpiDaily: d.daily,
          kpisMonthly: d.monthly,
          loading: false,
        });
      }
    });

    const unsubReconnect = wsClient.onStatus((status) => {
      if (status === "connected") {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else if (status === "disconnected" && !intervalRef.current) {
        intervalRef.current = setInterval(fetchKPIs, POLL_INTERVAL);
      }
    });

    if (wsClient.getStatus() !== "connected") {
      intervalRef.current = setInterval(fetchKPIs, POLL_INTERVAL);
    }

    return () => {
      unsubKpi();
      unsubReconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchKPIs, fetchSummary, fetchComparisons, fetchUnitRisks]);

  return { kpiDaily, kpisMonthly, alerts, loading, error, summary, kpiComparisons, unitRisks };
}
