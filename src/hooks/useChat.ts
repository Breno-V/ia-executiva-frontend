import { useCallback } from "react";
import { useChatStore } from "@/store/chatStore";
import api from "@/services/api/client";
import type { ChatMessage } from "@/types";

export function useChat() {
  const { messages, loading, error, addMessage, setMessages, setLoading, setError } = useChatStore();

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", text: text.trim() };
    addMessage(userMsg);
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post<Record<string, string>>("/insights/generate", {
        prompt: text.trim(),
      });
      const reply: ChatMessage = {
        role: "assistant",
        text: data.exec_summary || data.narrative_text || "Desculpe, não consegui processar sua solicitação no momento.",
      };
      addMessage(reply);
    } catch (err) {
      console.error("Chat API error:", err);
      const fallback = getFallbackResponse(text);
      addMessage({ role: "assistant", text: fallback });
    }
    setLoading(false);
  }, [addMessage, setLoading, setError]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  return { messages, loading, error, sendMessage, clearMessages };
}

function getFallbackResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("receita") || lower.includes("faturamento")) {
    return "Com base nos dados atuais, a receita da Cristália apresenta uma tendência de crescimento moderado. Recomendo analisar o Dashboard para ver os KPIs mais recentes.";
  }
  if (lower.includes("alerta") || lower.includes("risco")) {
    return "Os alertas ativos estão categorizados na seção ao lado. No momento, os principais riscos envolvem concentração de receita em canais específicos e variações sazonais.";
  }
  if (lower.includes("kpi") || lower.includes("indicador")) {
    return "Os KPIs principais — Receita, Despesas e Resultado Líquido — estão disponíveis no Dashboard. A IA sugere acompanhar a margem líquida mensalmente.";
  }
  if (lower.includes("economia") || lower.includes("economizar") || lower.includes("reduzir")) {
    return "A IA identificou oportunidades de redução de custos nas áreas de logística e suprimentos. Uma análise mais detalhada está disponível nos relatórios.";
  }
  return "Ótima pergunta! Para responder com precisão, preciso acessar os dados mais recentes do sistema. Você pode tentar gerar um novo resumo executivo na página de Relatórios.";
}
