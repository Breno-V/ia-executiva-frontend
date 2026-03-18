"use client";

import styles from "./AlertCard.module.css";

const levelConfig = {
  high: {
    label: "Alto",
    color: "var(--color-alert-high)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L13 12H1L7 1Z" stroke="var(--color-alert-high)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 5.5V8" stroke="var(--color-alert-high)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="7" cy="10" r="0.75" fill="var(--color-alert-high)"/>
      </svg>
    ),
  },
  medium: {
    label: "Médio",
    color: "var(--color-alert-medium)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="var(--color-alert-medium)" strokeWidth="1.5"/>
        <path d="M7 4.5V7.5" stroke="var(--color-alert-medium)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="7" cy="9.5" r="0.75" fill="var(--color-alert-medium)"/>
      </svg>
    ),
  },
  low: {
    label: "Baixo",
    color: "var(--color-alert-low)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="var(--color-alert-low)" strokeWidth="1.5"/>
        <path d="M5 7L6.5 8.5L9 5.5" stroke="var(--color-alert-low)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

export default function AlertCard({ level = "medium", title, description, solution }) {
  const config = levelConfig[level];

  return (
    <div className={styles.card} style={{ borderLeftColor: config.color }}>
      <div className={styles.header}>
        <span className={styles.icon}>{config.icon}</span>
        <span className={styles.badge} style={{ color: config.color }}>
          {config.label}
        </span>
        <p className={styles.title}>{title}</p>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.solutionWrapper}>
        <span className={styles.solutionLabel}>Solução sugerida</span>
        <p className={styles.solution}>{solution}</p>
      </div>
    </div>
  );
}