import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useChatStore } from "@/store/chatStore";
import api from "@/services/api/client";
import { useAnalyticalReport } from "@/hooks/useAnalyticalReport";

vi.mock("@/services/api/client", () => ({
  default: { get: vi.fn() },
}));

afterEach(() => cleanup());

beforeEach(() => {
  useChatStore.setState({
    summary: "",
    messages: [],
    loading: false,
    error: null,
  });
});

describe("useAnalyticalReport", () => {
  it("busca o relatório analítico no endpoint correto e monta o texto exibido", async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: {
        data: {
          summary: "Resumo consolidado.",
          keyFindings: ["Ponto 1", "Ponto 2"],
          recommendations: ["Ação 1"],
          riskOverview: "Risco controlado.",
          opportunityHighlights: ["Oportunidade 1"],
        },
      },
    });

    const { result } = renderHook(() => useAnalyticalReport());

    await act(async () => {
      await result.current.generateReport();
    });

    expect(api.get).toHaveBeenCalledWith("/ai/reports/analytical", {
      signal: expect.any(AbortSignal),
      params: undefined,
    });
    expect(result.current.summary).toContain("Resumo executivo:");
    expect(result.current.summary).toContain("Resumo consolidado.");
    expect(result.current.summary).toContain("Achados principais:");
    expect(result.current.summary).toContain("- Ponto 1");
    expect(result.current.summary).toContain("Recomendações:");
    expect(result.current.summary).toContain("- Ação 1");
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("define erro quando a busca do relatório falha", async () => {
    vi.mocked(api.get).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAnalyticalReport());

    await act(async () => {
      await result.current.generateReport();
    });

    expect(result.current.summary).toBe("");
    expect(result.current.error).toBe("Erro ao gerar relatório. Tente novamente.");
    expect(result.current.loading).toBe(false);
  });
});
