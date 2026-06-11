import styles from "./KpiCard.module.css";

interface KpiCardProps {
  title: string;
  value: string;
  fullWidth?: boolean;
  trend?: number | null;
}

export default function KpiCard({ title, value, fullWidth = false, trend = null }: KpiCardProps) {
  const trendPositive = trend !== null && trend > 0;
  const trendNeutral = trend === null;

  return (
    <div className={`${styles.card} ${fullWidth ? styles.fullWidth : ""}`}>
      <p className={styles.title}>{title}</p>
      <div className={styles.valueRow}>
        <p className={styles.value}>{value}</p>
        {!trendNeutral && (
          <span className={`${styles.badge} ${trendPositive ? styles.badgeUp : styles.badgeDown}`}>
            {trendPositive ? "\u25B2" : "\u25BC"} {Math.abs(trend as number).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}
