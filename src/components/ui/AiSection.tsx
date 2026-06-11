"use client";

import { useAI } from "@/hooks/useAI";
import Button from "@/components/ui/Button";
import AlertCard from "@/components/alerts/AlertCard";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Alert, Severity } from "@/types";
import styles from "./AiSection.module.css";

interface IaSectionProps {
  alerts?: Alert[];
}

export default function IaSection({ alerts = [] }: IaSectionProps) {
  const { summary, loading, error, generateSummary } = useAI();

  const severityMap: Record<string, Severity> = { high: "high", medium: "medium", low: "low" };

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
      {error && (
        <p style={{ color: "var(--color-alert-high)", textAlign: "center" }}>
          {error}
        </p>
      )}
      <div className={styles.buttonWrapper}>
        <Button
          label={loading ? "Gerando..." : "Gerar Resumo Executivo"}
          onClick={generateSummary}
          disabled={loading}
        />
      </div>
    </section>
  );
}
