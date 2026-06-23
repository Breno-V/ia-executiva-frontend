"use client";

import { useState } from "react";
import type { UnitRiskInfo } from "@/types";
import styles from "./UnitRiskChart.module.css";

interface UnitRiskChartProps {
  data: UnitRiskInfo[];
}

interface TooltipState {
  x: number;
  y: number;
  unitName: string;
  impactLevel: string;
  count: number;
  total: number;
}

const LEVELS = [
  { key: "ALTO" as const, label: "Alto", cls: "segmentHigh" },
  { key: "MEDIO" as const, label: "Médio", cls: "segmentMedium" },
  { key: "BAIXO" as const, label: "Baixo", cls: "segmentLow" },
] as const;

export default function UnitRiskChart({ data }: UnitRiskChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className={styles.wrapper}>
        <p style={{ opacity: 0.4, padding: "2rem 0", textAlign: "center" }}>
          Nenhum dado disponível.
        </p>
      </div>
    );
  }

  const maxTotal = Math.max(...data.map((u) => u.totalRisks), 1);

  const handleMouseEnter = (
    unit: UnitRiskInfo,
    level: (typeof LEVELS)[number],
    count: number,
  ) => {
    setTooltip({
      x: 0,
      y: 0,
      unitName: unit.name,
      impactLevel: level.label,
      count,
      total: unit.totalRisks,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip((prev) =>
      prev ? { ...prev, x: e.clientX + 12, y: e.clientY - 10 } : null,
    );
  };

  const handleMouseLeave = () => setTooltip(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.barsContainer}>
        {data.map((unit) => {
          const alto = (unit.byImpact.ALTO / maxTotal) * 100;
          const medio = (unit.byImpact.MEDIO / maxTotal) * 100;
          const baixo = (unit.byImpact.BAIXO / maxTotal) * 100;

          return (
            <div key={unit.id} className={styles.barCol}>
              <span className={styles.barLabel}>{unit.name}</span>
              <div className={styles.barTrack}>
                <div className={styles.barStack}>
                  {LEVELS.map((level) => {
                    const count = unit.byImpact[level.key];
                    if (count <= 0) return null;
                    const pctMap = {
                      ALTO: alto,
                      MEDIO: medio,
                      BAIXO: baixo,
                    };
                    return (
                      <div
                        key={level.key}
                        className={styles[level.cls]}
                        style={{ width: `${pctMap[level.key]}%` }}
                        onMouseEnter={() =>
                          handleMouseEnter(unit, level, count)
                        }
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                      />
                    );
                  })}
                </div>
              </div>
              <span className={styles.barTotal}>{unit.totalRisks}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotHigh}`} />
          Alto
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotMedium}`} />
          Médio
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotLow}`} />
          Baixo
        </span>
      </div>

      {tooltip && (
        <div
          className={styles.tooltip}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className={styles.tooltipTitle}>{tooltip.unitName}</p>
          <p className={styles.tooltipRow}>
            Impacto <strong>{tooltip.impactLevel}</strong>
          </p>
          <p className={styles.tooltipRow}>
            {tooltip.count} risco{tooltip.count !== 1 ? "s" : ""} (
            {tooltip.total > 0
              ? ((tooltip.count / tooltip.total) * 100).toFixed(0)
              : 0}
            %)
          </p>
        </div>
      )}
    </div>
  );
}
