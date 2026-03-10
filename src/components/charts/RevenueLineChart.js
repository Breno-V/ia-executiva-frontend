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

//dados a serem preenchidos depois no backend
const data = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Receita (R$ Milhões)",
      data: [3.8, 4.1, 4.3, 4.6, 4.9, 4.85],
      borderColor: "var(--color-accent)",
      backgroundColor: "rgba(46, 183, 217, 0.1)",
      pointBackgroundColor: "var(--color-accent)",
      pointRadius: 5,
      tension: 0.4,
      fill: true,
    },
  ],
};

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
        label: (context) => ` R$ ${context.parsed.y}M`,
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

export default function RevenueLineChart() {
  return (
    <div className={styles.wrapper}>
      <Line data={data} options={options} />
    </div>
  );
}