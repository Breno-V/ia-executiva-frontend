import { useCallback } from "react";
import { useChatStore } from "@/store/chatStore";
import { useKpiStore } from "@/store/kpiStore";
import { generateSummary as apiGenerateSummary } from "@/services/api/insights";

export function useAI() {
  const { summary, loading, error, setSummary, setLoading, setError } =
    useChatStore();
  const { kpiDaily, summary: dashSummary, alerts } = useKpiStore();

  const generateSummary = useCallback(async () => {
    setLoading(true);
    setError(null);

    const parts: string[] = [];
    if (kpiDaily) {
      parts.push(`Receita: R$ ${kpiDaily.revenue}`);
      parts.push(`Despesas: R$ ${kpiDaily.expenses}`);
      parts.push(`Resultado Líquido: R$ ${kpiDaily.net}`);
    }
    if (dashSummary) {
      parts.push(`Empresas: ${dashSummary.totalCompanies}`);
      parts.push(`Unidades: ${dashSummary.totalUnits}`);
      parts.push(`Riscos: ${dashSummary.totalRisks}`);
      parts.push(`Alertas: ${dashSummary.totalAlerts}`);
    }
    if (alerts.length > 0) {
      parts.push(`Alertas Recentes: ${alerts.length}`);
    }

    const prompt =
      parts.length > 0
        ? `Gere um resumo executivo com base nestes dados do dashboard:\n${parts.join("\n")}`
        : undefined;

    try {
      const response = await apiGenerateSummary(prompt);
      setSummary(response.exec_summary || response.narrative_text || "");
    } catch {
      setError("Erro ao gerar resumo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [kpiDaily, dashSummary, alerts, setSummary, setLoading, setError]);

  return { summary, loading, error, generateSummary };
}
