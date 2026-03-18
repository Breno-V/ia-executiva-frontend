"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { COLORS } from "@/libs/constants.js";
import { getRevenueByChannel } from "@/libs/api.js";
import styles from "./ChannelPizzaChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const CHANNEL_COLORS = [
  COLORS.accent,
  COLORS.alertMedium,
  COLORS.alertLow,
  COLORS.alertHigh,
];

const options = {
  responsive: true,
  cutout: "68%",
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#F0F4F5",
        padding: 16,
        boxWidth: 10,
        boxHeight: 10,
        borderRadius: 4,
        useBorderRadius: true,
        font: { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: "rgba(9, 17, 19, 0.92)",
      borderColor: "rgba(255,255,255,0.08)",
      borderWidth: 1,
      padding: 12,
      titleColor: "#9ACCD9",
      bodyColor: "#F0F4F5",
      callbacks: {
        label: (context) => `${context.label}: ${context.parsed.toFixed(1)}%`,
      },
    },
  },
};

export default function ChannelPieChart() {
  const [chartData, setChartData] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const channels = await getRevenueByChannel();

        const totalRevenue = channels.reduce((acc, c) => acc + c.total, 0);
        setTotal(
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(totalRevenue)
        );

        setChartData({
          labels: channels.map((c) => c.channel),
          datasets: [
            {
              data: channels.map((c) => c.percent),
              backgroundColor: channels.map((_, i) => CHANNEL_COLORS[i % CHANNEL_COLORS.length]),
              borderColor: "rgba(9, 17, 19, 0.8)",
              borderWidth: 2,
              hoverOffset: 6,
            },
          ],
        });
      } catch (err) {
        console.error("Erro ao buscar canais:", err);
      }
    }

    fetchData();
  }, []);

  if (!chartData) return null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.chartTitle}>Receita por Canal</p>
      <div className={styles.donutWrapper}>
        <Doughnut data={chartData} options={options} />
        {total && (
          <div className={styles.centerLabel}>
            <span className={styles.centerValue}>{total}</span>
            <span className={styles.centerSub}>total</span>
          </div>
        )}
      </div>
    </div>
  );
}