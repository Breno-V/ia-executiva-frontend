"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import AlertCard from "@/components/alerts/AlertCard";
import SectionTitle from "@/components/ui/SectionTitle";
import styles from "./AiSection.module.css";

export default function IaSection() {
  const [summary, setSummary] = useState("");

  function handleGenerate() {
    setSummary("Analisando dados...");
  }

  return (
    <section id="ia" className={styles.section}>
      <SectionTitle title="Análise Automática da IA" />
      <div className={styles.alertGrid}>
        <AlertCard level="high" title="..." description="..." solution="..." />
        <AlertCard
          level="medium"
          title="..."
          description="..."
          solution="..."
        />
        <AlertCard level="low" title="..." description="..." solution="..." />
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
