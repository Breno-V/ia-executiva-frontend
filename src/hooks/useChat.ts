import { useCallback, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import { wsClient } from "@/services/websocket";
import api from "@/services/api/client";
import type { ChatMessage } from "@/types";

export function useChat() {
  const {
    messages,
    loading,
    error,
    addMessage,
    setMessages,
    setLoading,
    setError,
  } = useChatStore();
  const bufferRef = useRef("");

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      const userMsg: ChatMessage = { role: "user", text: text.trim() };
      addMessage(userMsg);
      setLoading(true);
      setError(null);

      if (wsClient.getStatus() === "connected") {
        bufferRef.current = "";
        let done = false;

        const unsubToken = wsClient.on<string>("chat:token", (token) => {
          bufferRef.current += token;
          useChatStore.setState((s) => {
            const msgs = [...s.messages];
            const last = msgs[msgs.length - 1];
            if (last?.role === "assistant") {
              msgs[msgs.length - 1] = { ...last, text: bufferRef.current };
            } else {
              msgs.push({ role: "assistant", text: bufferRef.current });
            }
            return { messages: msgs };
          });
        });

        const unsubDone = wsClient.on("chat:done", () => {
          done = true;
          setLoading(false);
        });

        wsClient.send("chat:message", { text: text.trim() });

        const timeout = setTimeout(() => {
          if (!done) {
            unsubToken();
            unsubDone();
            setLoading(false);
            addMessage({
              role: "assistant",
              text: "Desculpe, a resposta demorou mais que o esperado. Tente novamente.",
            });
          }
        }, 30000);

        const waiter = setInterval(() => {
          if (done) {
            clearInterval(waiter);
            clearTimeout(timeout);
            unsubToken();
            unsubDone();
          }
        }, 100);
      } else {
        try {
          const { data } = await api.post<{
            data: { reply: string; conversationId: string };
          }>("/ai/chat", {
            message: text.trim(),
          });
          const reply: ChatMessage = {
            role: "assistant",
            text:
              data.data?.reply ||
              "Desculpe, não consegui processar sua solicitação no momento.",
          };
          addMessage(reply);
        } catch (err) {
          console.error("Chat API error:", err);
          setError("Erro ao processar mensagem. Tente novamente.");
        }
        setLoading(false);
      }
    },
    [addMessage, setLoading, setError],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  return { messages, loading, error, sendMessage, clearMessages };
}
