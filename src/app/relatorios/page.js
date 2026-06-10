"use client";

import { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { getKpisDaily, getKpisMonthly, getAlerts } from "@/libs/api";
import { useAI } from "@/hooks/useAI";
import { formatCurrency } from "@/libs/formatters";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import styles from "./relatorios.module.css";

ChartJS.register(
  RadarController, RadialLinearScale, PointElement, LineElement,
  Filler, Tooltip, Legend, CategoryScale, LinearScale
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: { color: "rgba(255,255,255,0.06)" },
      grid: { color: "rgba(255,255,255,0.06)" },
      pointLabels: {
        color: "rgba(240,244,245,0.6)",
        font: { size: 11 },
      },
      ticks: {
        backdropColor: "transparent",
        color: "rgba(240,244,245,0.3)",
        font: { size: 9 },
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#F0F4F5",
        padding: 16,
        boxWidth: 12,
        boxHeight: 12,
        font: { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: "rgba(9,17,19,0.95)",
      borderColor: "rgba(255,255,255,0.08)",
      borderWidth: 1,
      padding: 12,
      titleColor: "#9ACCD9",
      bodyColor: "#F0F4F5",
    },
  },
};

const metrics = ["Produtividade", "Integração", "Controle", "Velocidade", "Previsibilidade"];

export default function RelatoriosPage() {
  const { summary, loading: aiLoading, error: aiError, generateSummary } = useAI();
  const [kpiDaily, setKpiDaily] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [daily] = await Promise.all([getKpisDaily()]);
        setKpiDaily(daily[0] || null);
      } catch (_) {}
      setLoading(false);
    }
    fetchData();
  }, []);

  const revenue = Number(kpiDaily?.revenue) || 1000000;
  const expenses = Number(kpiDaily?.expenses) || 700000;
  const net = Number(kpiDaily?.net) || 300000;

  const projections = [
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
        pointBorderColor: "rgba(9,17,19,0.8)",
        pointBorderWidth: 1,
        borderWidth: 2,
      },
      {
        label: "Depois",
        data: afterData,
        borderColor: "#2EB7D9",
        backgroundColor: "rgba(46, 183, 217, 0.08)",
        pointBackgroundColor: "#2EB7D9",
        pointBorderColor: "rgba(9,17,19,0.8)",
        pointBorderWidth: 1,
        borderWidth: 2,
      },
    ],
  };

  return (
    <AuthLayout title="Relatórios Executivos">
      <div className={styles.wrapper}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Resumo Analítico</h2>
          <div className={styles.summaryBox}>
            {summary ? (
              <p className={styles.summaryText}>{summary}</p>
            ) : (
              <p className={styles.summaryPlaceholder}>
                Clique no botão abaixo para gerar um resumo executivo com os principais achados da IA.
              </p>
            )}
            {aiError && (
              <p style={{ color: "var(--color-alert-high)", fontSize: "0.85rem" }}>{aiError}</p>
            )}
            <div className={styles.summaryBtn}>
              <Button
                label={aiLoading ? "Gerando..." : "Gerar Resumo Executivo"}
                onClick={generateSummary}
                disabled={aiLoading}
              />
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
          <p className={styles.radarSub}>
            Comparativo da evolução esperada com a implementação das recomendações da IA.
          </p>
          <div className={styles.radarWrapper}>
            <Radar data={radarData} options={options} />
          </div>
        </section>
      </div>
    </AuthLayout>
  );
}
