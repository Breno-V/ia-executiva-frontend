import { useCallback } from "react";
import { useChatStore } from "@/store/chatStore";
import { generateSummary as apiGenerateSummary } from "@/services/api/insights";

export function useAI() {
  const { summary, loading, error, setSummary, setLoading, setError } =
    useChatStore();

  const generateSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiGenerateSummary();
      setSummary(response.exec_summary || response.narrative_text || "");
    } catch {
      setError("Erro ao gerar resumo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [setSummary, setLoading, setError]);

  return { summary, loading, error, generateSummary };
}
