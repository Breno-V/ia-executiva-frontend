// responsável por buscar os dados do backend para popular a página home — KPIs, tendência de receita e dados do mapa regional.
import { useState, useEffect } from "react";
import { getKpisDaily, getKpisMonthly, getAlerts } from "@/libs/api.js";

export function useHome() {
  const [kpiDaily, setKpiDaily] = useState(null);
  const [kpisMonthly, setKpisMonthly] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [daily, monthly, alertsData] = await Promise.all([
          getKpisDaily(),
          getKpisMonthly(),
          getAlerts(),
        ]);

        // Pega o KPI mais recente do array
        setKpiDaily(daily[0] || null);
        // Ordena do mais antigo para o mais recente (para o gráfico)
        setKpisMonthly([...monthly].reverse());
        setAlerts(alertsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { kpiDaily, kpisMonthly, alerts, loading, error };
}