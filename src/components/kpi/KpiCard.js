//Card individual de KPI
import styles from "./KpiCard.module.css";

export default function KpiCard({ title, value, fullWidth = false }) {
  return (
    <div className={`${styles.card} ${fullWidth ? styles.fullWidth : ""}`}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}