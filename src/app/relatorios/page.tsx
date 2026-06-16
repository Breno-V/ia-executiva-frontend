"use client";

import { useEffect } from "react";
import { Radar } from "react-chartjs-2";
import "@/libs/chartRegistry";
import { useAI } from "@/hooks/useAI";
import { useKPIs } from "@/hooks/useKPIs";
import { useChartTheme } from "@/hooks/useChartTheme";
import { formatCurrency } from "@/libs/formatters";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import { SkeletonRelatorios } from "@/components/ui/SkeletonLoader";
import type { ProjectionData } from "@/types";
import styles from "./relatorios.module.css";

const metrics = ["Produtividade", "Integração", "Controle", "Velocidade", "Previsibilidade"];

export default function RelatoriosPage() {
  const c = useChartTheme();
  const { summary, loading: aiLoading, error: aiError, generateSummary } = useAI();
  const { kpiDaily, loading, error: fetchError } = useKPIs();

  useEffect(() => { document.title = "Relatórios Executivos | IA Executiva"; }, []);

  const revenue = Number(kpiDaily?.revenue) || 1000000;
  const expenses = Number(kpiDaily?.expenses) || 700000;
  const net = Number(kpiDaily?.net) || 300000;

  const projections: ProjectionData[] = [
    { period: "90 dias", revenue: revenue * 3.1, expenses: expenses * 2.9, net: net * 3.5 },
    { period: "180 dias", revenue: revenue * 6.4, expenses: expenses * 5.8, net: net * 7.2 },
    { period: "360 dias", revenue: revenue * 13.5, expenses: expenses * 11.5, net: net * 16.0 },
  ];

  const beforeData = [45, 35, 50, 40, 55];
  const afterData = [82, 75, 88, 78, 92];

  const radarData = {
    labels: metrics,
    datasets: [
      {
        label: "Antes",
        data: beforeData,
        borderColor: "rgba(228, 104, 104, 0.6)",
        backgroundColor: "rgba(228, 104, 104, 0.08)",
        pointBackgroundColor: "rgba(228, 104, 104, 0.8)",
        pointBorderColor: c.background,
        pointBorderWidth: 1,
        borderWidth: 2,
      },
      {
        label: "Depois",
        data: afterData,
        borderColor: c.accent,
        backgroundColor: c.accentLight,
        pointBackgroundColor: c.accent,
        pointBorderColor: c.background,
        pointBorderWidth: 1,
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: c.grid },
        grid: { color: c.grid },
        pointLabels: { color: c.muted, font: { size: 11 } },
        ticks: { backdropColor: "transparent", color: c.muted, font: { size: 9 } },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: c.text, padding: 16, boxWidth: 12, boxHeight: 12, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: c.tooltipBg,
        borderColor: c.tooltipBorder,
        borderWidth: 1,
        padding: 12,
        titleColor: c.accent,
        bodyColor: c.text,
      },
    },
  };

  return (
    <AuthLayout title="Relatórios Executivos">
      <div className={styles.wrapper}>
        {loading ? (
          <SkeletonRelatorios />
        ) : fetchError ? (
          <p style={{ color: "var(--color-alert-high)", textAlign: "center", padding: "4rem 2rem" }}>{fetchError}</p>
        ) : (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Resumo Analítico</h2>
              <div className={styles.summaryBox}>
                {summary ? (
                  <p className={styles.summaryText}>{summary}</p>
                ) : (
                  <p className={styles.summaryPlaceholder}>Clique no botão abaixo para gerar um resumo executivo com os principais achados da IA.</p>
                )}
                {aiError && <p style={{ color: "var(--color-alert-high)", fontSize: "0.85rem" }}>{aiError}</p>}
                <div className={styles.summaryBtn}>
                  <Button label={aiLoading ? "Gerando..." : "Gerar Resumo Executivo"} onClick={generateSummary} disabled={aiLoading} />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Projeções Financeiras</h2>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Período</th>
                      <th>Receita Projetada</th>
                      <th>Despesas Projetadas</th>
                      <th>Resultado Líquido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projections.map((p) => (
                      <tr key={p.period}>
                        <td className={styles.period}>{p.period}</td>
                        <td>{formatCurrency(p.revenue)}</td>
                        <td>{formatCurrency(p.expenses)}</td>
                        <td className={styles.net}>{formatCurrency(p.net)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Cenário Antes vs Depois</h2>
              <p className={styles.radarSub}>Comparativo da evolução esperada com a implementação das recomendações da IA.</p>
              <div className={styles.radarWrapper}>
                <Radar data={radarData} options={radarOptions} />
              </div>
            </section>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
