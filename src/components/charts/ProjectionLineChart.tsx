"use client";

import { Line } from "react-chartjs-2";
import { type ChartOptions } from "chart.js";
import "@/libs/chartRegistry";
import styles from "./ProjectionLineChart.module.css";
import { useChartTheme } from "@/hooks/useChartTheme";

interface ProjectionLineChartProps {
  currentRevenue?: number;
}

export default function ProjectionLineChart({ currentRevenue = 1000000 }: ProjectionLineChartProps) {
  const c = useChartTheme();

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: { color: c.text, boxWidth: 12, padding: 16, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: c.tooltipBg,
        borderColor: c.tooltipBorder,
        borderWidth: 1,
        padding: 12,
        titleColor: c.accent,
        bodyColor: c.text,
        callbacks: {
          label: (context) => `${context.dataset.label}: R$ ${(context.parsed.y ?? 0).toFixed(0)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: c.muted, font: { size: 12 } },
        grid: { color: c.grid },
        border: { color: c.tooltipBorder },
      },
      y: {
        ticks: {
          color: c.muted,
          font: { size: 12 },
          callback: (value: string | number) => `R$ ${Number(value).toFixed(0)}`,
        },
        grid: { color: c.grid },
        border: { color: c.tooltipBorder },
      },
    },
  };

  const labels = ["Atual", "30 dias", "90 dias", "180 dias", "360 dias"];
  const values = [
    currentRevenue,
    currentRevenue * 1.3,
    currentRevenue * 3.1,
    currentRevenue * 6.4,
    currentRevenue * 13.5,
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Receita Projetada",
        data: values,
        borderColor: c.accent,
        backgroundColor: c.accentLight,
        pointBackgroundColor: c.accent,
        pointBorderColor: c.background,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.chartTitle}>Projeção de Crescimento com IA</p>
      <div className={styles.chartArea} role="img" aria-label="Gráfico de linha mostrando projeção de crescimento da receita nos próximos 360 dias">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
