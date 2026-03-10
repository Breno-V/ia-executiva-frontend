//Receita por canal (Chart.js)

"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { COLORS } from "@/libs/constants.js";
import styles from "./ChannelPizzaChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Hospitalar", "Distribuidores", "E-commerce"],
  datasets: [
    {
      data: [72, 18, 10],
      backgroundColor: [COLORS.accent, COLORS.alertMedium, COLORS.alertLow],
      borderColor: "rgba(255, 255, 255, 0.08)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#F0F4F5",
        padding: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => ` ${context.label}: ${context.parsed}%`,
      },
    },
  },
};

export default function ChannelPieChart() {
  return (
    <div className={styles.wrapper}>
      <Pie data={data} options={options} />
    </div>
  );
}
