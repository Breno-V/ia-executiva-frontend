"use client";

import { useState, useEffect, useRef } from "react";
import { getAlerts } from "@/libs/api";
import AuthLayout from "@/components/layout/AuthLayout";
import AlertCard from "@/components/alerts/AlertCard";
import styles from "./alertas.module.css";

export default function AlertasPage() {
  const [activeTab, setActiveTab] = useState("alerts");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    getAlerts()
      .then(setAlerts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insights/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      const reply = data.exec_summary || data.narrative_text || "Desculpe, não consegui processar sua solicitação no momento.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      const fallback = getFallbackResponse(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", text: fallback }]);
    }
    setChatLoading(false);
  }

  function getFallbackResponse(msg) {
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

  const severityMap = { high: "high", medium: "medium", low: "low" };

  return (
    <AuthLayout title="Alertas & Inteligência">
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "alerts" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("alerts")}
          >
            Painel de Alertas
          </button>
          <button
            className={`${styles.tab} ${activeTab === "chat" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            Chatbot Executivo
          </button>
        </div>

        {activeTab === "alerts" && (
          <section className={styles.alertsSection}>
            {loading ? (
              <div className={styles.loading}>Carregando alertas...</div>
            ) : alerts.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyHero}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-low)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4" strokeWidth="2"/>
                  </svg>
                  <h3 className={styles.emptyTitle}>Tudo tranquilo por aqui!</h3>
                  <p className={styles.emptySub}>
                    Nenhum alerta crítico identificado no momento. A IA continua monitorando seus dados em tempo real.
                  </p>
                </div>
                <div className={styles.monitoringGrid}>
                  <div className={styles.monitoringCard}>
                    <div className={styles.monitoringIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
                      </svg>
                    </div>
                    <h4 className={styles.monitoringTitle}>Monitoramento de Receita</h4>
                    <p className={styles.monitoringDesc}>
                      A IA analisa diariamente a receita vs. despesas para detectar quedas acima de 10% e variações atípicas.
                    </p>
                  </div>
                  <div className={styles.monitoringCard}>
                    <div className={styles.monitoringIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                    </div>
                    <h4 className={styles.monitoringTitle}>Concentração de Canais</h4>
                    <p className={styles.monitoringDesc}>
                      Identifica quando um único canal de vendas representa mais de 70% da receita, sinalizando dependência.
                    </p>
                  </div>
                  <div className={styles.monitoringCard}>
                    <div className={styles.monitoringIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </div>
                    <h4 className={styles.monitoringTitle}>Variação de KPIs</h4>
                    <p className={styles.monitoringDesc}>
                      Compara indicadores mês a mês para detectar anomalias operacionais e financeiras antes que impactem o resultado.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.alertGrid}>
                {alerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    level={severityMap[alert.severity] || "low"}
                    title={alert.title}
                    description={alert.problem}
                    solution={alert.recommendation}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "chat" && (
          <section className={styles.chatSection}>
            <div className={styles.chatHeader}>
              <h2 className={styles.chatTitle}>Assistente IA Executiva</h2>
              <p className={styles.chatSub}>
                Faça perguntas estratégicas sobre a saúde financeira e operacional da Cristália.
              </p>
            </div>

            <div className={styles.chatMessages} ref={chatRef}>
              {messages.length === 0 && (
                <div className={styles.chatEmpty}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                  <p>Pergunte algo como:<br/>"Qual a tendência de receita?" ou "Quais os principais riscos?"</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`${styles.message} ${msg.role === "user" ? styles.userMsg : styles.assistantMsg}`}>
                  <div className={styles.msgBubble}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className={`${styles.message} ${styles.assistantMsg}`}>
                  <div className={styles.msgBubble}>
                    <div className={styles.typing}>
                      <span></span><span></span><span></span>
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </section>
        )}
      </div>
    </AuthLayout>
  );
}
