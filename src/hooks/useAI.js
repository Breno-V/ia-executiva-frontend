// Resposta da IA
import { useState } from "react";
import api from "@/libs/api";

export function useAI() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateSummary() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/insights/generate");
      setSummary(response.data.exec_summary || response.data.narrative_text);
    } catch (err) {
      setError("Erro ao gerar resumo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return { summary, loading, error, generateSummary };
}