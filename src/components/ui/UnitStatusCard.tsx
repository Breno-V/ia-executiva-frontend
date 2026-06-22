"use client";

import { formatCurrency } from "@/libs/formatters";
import type { UnitStatus } from "@/types";
import styles from "./UnitStatusCard.module.css";

const statusConfig: Record<string, { label: string; color: string }> = {
  stable: { label: "Estável", color: "var(--color-alert-low)" },
  attention: { label: "Atenção", color: "var(--color-alert-medium)" },
  critical: { label: "Crítico", color: "var(--color-alert-high)" },
};

interface UnitStatusCardProps {
  unit: UnitStatus;
}

export default function UnitStatusCard({ unit }: UnitStatusCardProps) {
  const config = statusConfig[unit.status] || statusConfig.stable;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.unitName}>{unit.name}</span>
        <span
          className={styles.badge}
          style={{ color: config.color, borderColor: config.color }}
        >
          {config.label}
        </span>
      </div>
      <p className={styles.impact}>{formatCurrency(unit.financialImpact)}</p>
      <p className={styles.impactLabel}>Impacto financeiro</p>
    </div>
  );
}
