"use client";

import { useCallback } from "react";
import { useChatStore } from "@/store/chatStore";
import { getAnalyticalReport } from "@/services/api/insights";
import type { AnalyticalReport } from "@/types";

/**
 * Converte o relatório analítico estruturado em um texto pronto para exibição.
 */
function formatAnalyticalReport(report: AnalyticalReport): string {
  const sections = [
    report.summary ? `Resumo executivo:\n${report.summary}` : "",
    report.riskOverview ? `Visão de riscos:\n${report.riskOverview}` : "",
    report.keyFindings.length
      ? `Achados principais:\n${report.keyFindings.map((item) => `- ${item}`).join("\n")}`
      : "",
    report.recommendations.length
      ? `Recomendações:\n${report.recommendations.map((item) => `- ${item}`).join("\n")}`
      : "",
    report.opportunityHighlights.length
      ? `Oportunidades:\n${report.opportunityHighlights.map((item) => `- ${item}`).join("\n")}`
      : "",
  ].filter(Boolean);

  return sections.join("\n\n");
}

/**
 * Gerencia a busca e o estado do relatório analítico exibido na tela de relatórios.
 */
export function useAnalyticalReport() {
  const { summary, loading, error, setSummary, setLoading, setError } =
    useChatStore();

  const generateReport = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const report = await getAnalyticalReport();
      setSummary(formatAnalyticalReport(report));
    } catch {
      setError("Erro ao gerar relatório. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [setSummary, setLoading, setError]);

  return { summary, loading, error, generateReport };
}
