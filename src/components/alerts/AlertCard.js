//Card de alerta da IA
import styles from "./AlertCard.module.css";

const levelConfig = {
  high: {
    label: "Alto",
    color: "var(--color-alert-high)",
    icon: "⚠️",
  },
  medium: {
    label: "Médio",
    color: "var(--color-alert-medium)",
    icon: "🔔",
  },
  low: {
    label: "Baixo",
    color: "var(--color-alert-low)",
    icon: "ℹ️",
  },
};

export default function AlertCard({ level = "medium", title, description, solution }) {
  const config = levelConfig[level];

  return (
    <div
      className={styles.card}
      style={{ borderLeftColor: config.color }}
    >
      <div className={styles.header}>
        <span className={styles.icon}>{config.icon}</span>
        <span className={styles.badge} style={{ color: config.color }}>
          {config.label}
        </span>
        <p className={styles.title}>{title}</p>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.solutionWrapper}>
        <span className={styles.solutionLabel}>Solução</span>
        <p className={styles.solution}>{solution}</p>
      </div>
    </div>
  );
}