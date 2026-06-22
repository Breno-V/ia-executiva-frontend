"use client";

import { Bar } from "react-chartjs-2";
import { type ChartOptions } from "chart.js";
import "@/libs/chartRegistry";
import styles from "./PriorityBarChart.module.css";
import { useChartTheme } from "@/hooks/useChartTheme";

interface DepartmentImpact {
  department: string;
  impact: number;
}

interface PriorityBarChartProps {
  data?: DepartmentImpact[];
}

export default function PriorityBarChart({
  data,
}: PriorityBarChartProps) {
  const c = useChartTheme();

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: c.tooltipBg,
        borderColor: c.tooltipBorder,
        borderWidth: 1,
        padding: 12,
        titleColor: c.accent,
        bodyColor: c.text,
        callbacks: {
          label: (context) =>
            `Impacto: R$ ${(context.parsed.x ?? 0).toFixed(0)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: c.muted,
          font: { size: 11 },
          callback: (value: string | number) =>
            `R$ ${Number(value).toFixed(0)}`,
        },
        grid: { color: c.grid },
        border: { color: c.tooltipBorder },
      },
      y: {
        ticks: { color: c.muted, font: { size: 12 } },
        grid: { display: false },
        border: { color: c.tooltipBorder },
      },
    },
  };

  if (!data || data.length === 0) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.chartTitle}>Prioridade por Área</p>
        <p className={styles.chartSub}>
          Impacto financeiro mensal por departamento
        </p>
        <p style={{ opacity: 0.4, padding: "2rem 0", textAlign: "center" }}>
          Nenhum dado disponível.
        </p>
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => b.impact - a.impact);

  const chartData = {
    labels: sorted.map((d) => d.department),
    datasets: [
      {
        data: sorted.map((d) => d.impact),
        backgroundColor: sorted.map((_, i) => c.barBg(i)),
        borderColor: c.accent,
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.chartTitle}>Prioridade por Área</p>
      <p className={styles.chartSub}>
        Impacto financeiro mensal por departamento
      </p>
      <div
        className={styles.chartArea}
        role="img"
        aria-label="Gráfico de barras mostrando impacto financeiro por departamento, ordenado do maior para o menor"
      >
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
