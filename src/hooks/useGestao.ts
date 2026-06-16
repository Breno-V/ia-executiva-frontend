import { useEffect } from "react";
import { useRiskStore } from "@/store/riskStore";

export function useGestao() {
  const { risks, loading, error, fetchRisks } = useRiskStore();

  useEffect(() => {
    fetchRisks();
  }, [fetchRisks]);

  return { risks, loading, error };
}
