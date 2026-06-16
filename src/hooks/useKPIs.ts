import { useEffect } from "react";
import { useKpiStore } from "@/store/kpiStore";

export function useKPIs() {
  const { kpiDaily, kpisMonthly, loading, error, fetchKPIs } = useKpiStore();

  useEffect(() => {
    fetchKPIs();
  }, [fetchKPIs]);

  return { kpiDaily, kpisMonthly, loading, error };
}
