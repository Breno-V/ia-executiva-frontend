import { useEffect } from "react";
import { useAlertStore } from "@/store/alertStore";

export function useAlerts() {
  const { alerts, loading, error, fetchAlerts } = useAlertStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return { alerts, loading, error };
}
