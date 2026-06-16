import { useEffect, useRef } from "react";
import { useKpiStore } from "@/store/kpiStore";

const POLL_INTERVAL = 30000;

export function useHome() {
  const { kpiDaily, kpisMonthly, alerts, loading, error, fetchKPIs } = useKpiStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetchKPIs();
    intervalRef.current = setInterval(fetchKPIs, POLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchKPIs]);

  return { kpiDaily, kpisMonthly, alerts, loading, error };
}
