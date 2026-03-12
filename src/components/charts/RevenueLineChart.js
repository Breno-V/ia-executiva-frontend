//Tendência 6 meses (Chart.js)

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

//dados a serem preenchidos depois no backend

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#F0F4F5",
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => ` R$ ${context.parsed.y.toFixed(2)}M`,
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#F0F4F5" },
      grid: { color: "rgba(255,255,255,0.05)" },
    },
    y: {
      ticks: { color: "#F0F4F5" },
      grid: { color: "rgba(255,255,255,0.05)" },
    },
  },
};

export default function RevenueLineChart({ kpisMonthly = [] }) {
  const labels = kpisMonthly.map((k) => MESES[k.month - 1]);
  const values = kpisMonthly.map((k) => (k.revenue / 1_000_000));

  const data = {
    labels,
    datasets: [
      {
        label: "Receita (R$ Milhões)",
        data: values,
        borderColor: "#2EB7D9",
        backgroundColor: "rgba(46, 183, 217, 0.1)",
        pointBackgroundColor: "#2EB7D9",
        pointRadius: 5,
        tension: 0.4,
        fill: true,
      },
    ],
  };
  
  return (
    <div className={styles.wrapper}>
      <Line data={data} options={options} />
    </div>
  );
}