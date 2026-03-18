"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import styles from "./RevenueLineChart.module.css";
import {MESES} from '../../libs/constants'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(9, 17, 19, 0.92)",
      borderColor: "rgba(255,255,255,0.08)",
      borderWidth: 1,
      padding: 12,
      titleColor: "#9ACCD9",
      bodyColor: "#F0F4F5",
      callbacks: {
        title: (items) => items[0].label,
        label: (context) => `  Receita: R$ ${context.parsed.y.toFixed(1)}M`,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "rgba(240, 244, 245, 0.5)",
        font: { size: 12 },
      },
      grid: { color: "rgba(255,255,255,0.04)" },
      border: { color: "rgba(255,255,255,0.08)" },
    },
    y: {
      ticks: {
        color: "rgba(240, 244, 245, 0.5)",
        font: { size: 12 },
        callback: (value) => `R$ ${value}M`,
      },
      grid: { color: "rgba(255,255,255,0.04)" },
      border: { color: "rgba(255,255,255,0.08)" },
    },
  },
};

export default function RevenueLineChart({ kpisMonthly = [] }) {
  const labels = kpisMonthly.map((k) => MESES[k.month - 1]);
  const values = kpisMonthly.map((k) => k.revenue / 1_000_000);

  const data = {
    labels,
    datasets: [
      {
        label: "Receita",
        data: values,
        borderColor: "#2EB7D9",
        backgroundColor: (ctx) => {
          const canvas = ctx.chart.ctx;
          const gradient = canvas.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, "rgba(46, 183, 217, 0.18)");
          gradient.addColorStop(1, "rgba(46, 183, 217, 0.00)");
          return gradient;
        },
        pointBackgroundColor: "#2EB7D9",
        pointBorderColor: "rgba(9, 17, 19, 0.8)",
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
      <div className={styles.header}>
        <p className={styles.chartTitle}>Tendência de Receita</p>
        <span className={styles.badge}>Últimos 6 meses</span>
      </div>
      <div className={styles.chartArea}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}