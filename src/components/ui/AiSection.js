"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import AlertCard from "@/components/alerts/AlertCard";
import SectionTitle from "@/components/ui/SectionTitle";
import styles from "./AiSection.module.css";

export default function IaSection({ alerts = [] }) {
  const [summary, setSummary] = useState("");

  function handleGenerate() {
    setSummary("Analisando dados...");
  }

  // Mapeia severidade do backend para o level do AlertCard
  const severityMap = { high: "high", medium: "medium", low: "low" };

  return (
    <section id="ia" className={styles.section}>
      <SectionTitle title="Análise Automática da IA" />
      <div className={styles.alertGrid}>
        {alerts.length === 0 ? (
          <p style={{ color: "var(--foreground)", opacity: 0.6 }}>
            Nenhum alerta encontrado.
          </p>
        ) : (
          alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              level={severityMap[alert.severity] || "low"}
              title={alert.title}
              description={alert.problem}
              solution={alert.recommendation}
            />
          ))
        )}
      </div>
      {summary && (
        <div className={styles.summaryWrapper}>
          <p className={styles.summary}>{summary}</p>
        </div>
      )}
      <div className={styles.buttonWrapper}>
        <Button label="Gerar Resumo Executivo" onClick={handleGenerate} />
      </div>
    </section>
  );
}