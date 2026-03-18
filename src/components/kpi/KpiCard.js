// Card individual de KPI com indicador de tendência
import styles from "./KpiCard.module.css";

export default function KpiCard({ title, value, fullWidth = false, trend = null }) {
  // trend: número positivo = alta, negativo = queda, null = sem indicador
  const trendPositive = trend > 0;
  const trendNeutral = trend === null;

  return (
    <div className={`${styles.card} ${fullWidth ? styles.fullWidth : ""}`}>
      <p className={styles.title}>{title}</p>
      <div className={styles.valueRow}>
        <p className={styles.value}>{value}</p>
        {!trendNeutral && (
          <span className={`${styles.badge} ${trendPositive ? styles.badgeUp : styles.badgeDown}`}>
            {trendPositive ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}