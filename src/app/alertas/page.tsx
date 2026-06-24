"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AuthLayout from "@/components/layout/AuthLayout";
import AlertCard from "@/components/alerts/AlertCard";
import { useChat } from "@/hooks/useChat";
import { useAlerts } from "@/hooks/useAlerts";
import type { Severity } from "@/types";
import styles from "./alertas.module.css";

export default function AlertasPage() {
  const [activeTab, setActiveTab] = useState<"alerts" | "chat">("alerts");
  const { alerts, loading, error } = useAlerts();
  const { messages, loading: chatLoading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Alertas & Inteligência | IA Executiva";
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  const severityMap: Record<string, Severity> = {
    critical: "critical",
    high: "high",
    medium: "medium",
    low: "low",
  };

  return (
    <AuthLayout title="Alertas &amp; Inteligência">
      <div className={styles.wrapper}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Seções de alertas e chat"
        >
          <button
            role="tab"
            aria-selected={activeTab === "alerts"}
            aria-controls="panel-alerts"
            id="tab-alerts"
            className={`${styles.tab} ${activeTab === "alerts" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("alerts")}
          >
            Painel de Alertas
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "chat"}
            aria-controls="panel-chat"
            id="tab-chat"
            className={`${styles.tab} ${activeTab === "chat" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            Chatbot Executivo
          </button>
        </div>

        {activeTab === "alerts" && (
          <section
            className={styles.alertsSection}
            role="tabpanel"
            id="panel-alerts"
            aria-labelledby="tab-alerts"
          >
            {loading ? (
              <div className={styles.loading}>Carregando alertas...</div>
            ) : error ? (
              <p
                style={{
                  color: "var(--color-alert-high)",
                  textAlign: "center",
                  padding: "4rem 2rem",
                }}
              >
                {error}
              </p>
            ) : alerts.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyHero}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-alert-low)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" strokeWidth="2" />
                  </svg>
                  <h3 className={styles.emptyTitle}>
                    Tudo tranquilo por aqui!
                  </h3>
                  <p className={styles.emptySub}>
                    Nenhum alerta crítico identificado no momento. A IA continua
                    monitorando seus dados em tempo real.
                  </p>
                </div>
                <div className={styles.monitoringGrid}>
                  <div className={styles.monitoringCard}>
                    <div className={styles.monitoringIcon}>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="20" x2="12" y2="10" />
                        <line x1="18" y1="20" x2="18" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="16" />
                      </svg>
                    </div>
                    <h4 className={styles.monitoringTitle}>
                      Monitoramento de Receita
                    </h4>
                    <p className={styles.monitoringDesc}>
                      A IA analisa diariamente a receita vs. despesas para
                      detectar quedas acima de 10% e variações atípicas.
                    </p>
                  </div>
                  <div className={styles.monitoringCard}>
                    <div className={styles.monitoringIcon}>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                    <h4 className={styles.monitoringTitle}>
                      Concentração de Canais
                    </h4>
                    <p className={styles.monitoringDesc}>
                      Identifica quando um único canal de vendas representa mais
                      de 70% da receita, sinalizando dependência.
                    </p>
                  </div>
                  <div className={styles.monitoringCard}>
                    <div className={styles.monitoringIcon}>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <h4 className={styles.monitoringTitle}>Variação de KPIs</h4>
                    <p className={styles.monitoringDesc}>
                      Compara indicadores mês a mês para detectar anomalias
                      operacionais e financeiras antes que impactem o resultado.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.alertGrid}>
                {alerts.map((alert, i) => (
                  <AlertCard
                    key={alert.id || i}
                    level={severityMap[alert.severity] || "low"}
                    title={alert.title}
                    description={alert.description}
                    solution={alert.suggestedAction || "Consulte a equipe responsável"}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "chat" && (
          <section
            className={styles.chatSection}
            role="tabpanel"
            id="panel-chat"
            aria-labelledby="tab-chat"
          >
            <div className={styles.chatHeader}>
              <h2 className={styles.chatTitle}>Assistente IA Executiva</h2>
              <p className={styles.chatSub}>
                Faça perguntas estratégicas sobre a saúde financeira e
                operacional da Cristália.
              </p>
            </div>

            <div
              className={styles.chatMessages}
              ref={chatRef}
              role="log"
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className={styles.chatEmpty}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: 0.4 }}
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <p>
                    Pergunte algo como:
                    <br />
                    &quot;Qual a tendência de receita?&quot; ou &quot;Quais os
                    principais riscos?&quot;
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${styles.message} ${msg.role === "user" ? styles.userMsg : styles.assistantMsg}`}
                >
                  <div className={`${styles.msgBubble} ${msg.role === "assistant" ? styles.assistantBubble : ""}`}>
                    {msg.role === "assistant" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className={`${styles.message} ${styles.assistantMsg}`}>
                  <div className={styles.msgBubble}>
                    <div className={styles.typing}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.chatInput}>
              <input
                className={styles.input}
                type="text"
                placeholder="Digite sua pergunta..."
                maxLength={500}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={chatLoading}
              />
              <button
                className={styles.sendBtn}
                onClick={handleSend}
                disabled={chatLoading || !input.trim()}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </section>
        )}
      </div>
    </AuthLayout>
  );
}
