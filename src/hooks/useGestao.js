import { useState, useEffect } from "react";
import { getAlerts } from "@/libs/api";

export function useGestao() {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [alertsData] = await Promise.all([
          getAlerts(),
        ]);
        setRisks(alertsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { risks, loading, error };
}
