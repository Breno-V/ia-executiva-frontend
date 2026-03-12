//Receita por canal (Chart.js)

"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { COLORS } from "@/libs/constants.js";
import { getRevenueByChannel } from "@/libs/api.js";
import styles from "./ChannelPizzaChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

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

const CHANNEL_COLORS = [
  COLORS.accent,
  COLORS.alertMedium,
  COLORS.alertLow,
  COLORS.alertHigh,
];

export default function ChannelPieChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const channels = await getRevenueByChannel();

        setChartData({
          labels: channels.map((c) => c.channel),
          datasets: [
            {
              data: channels.map((c) => c.percent),
              backgroundColor: channels.map((_, i) => CHANNEL_COLORS[i % CHANNEL_COLORS.length]),
              borderColor: "rgba(255, 255, 255, 0.08)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Erro ao buscar canais:", err);
      }
    }

    fetchData();
  }, []);

  if (!chartData) return <p style={{ color: "#F0F4F5", opacity: 0.5 }}>Carregando gráfico...</p>;


  return (
    <div className={styles.wrapper}>
      <Pie data={chartData} options={options} />
    </div>
  );
}
