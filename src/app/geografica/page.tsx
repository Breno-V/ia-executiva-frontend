"use client";

import { useState, useEffect } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import RegionalMap from "@/components/map/RegionalMap";
import UnitStatusCard from "@/components/ui/UnitStatusCard";
import SectionTitle from "@/components/ui/SectionTitle";
import type { UnitStatus } from "@/types";
import styles from "./geografica.module.css";

const mockUnits: UnitStatus[] = [
  { name: "Campinas", status: "critical", financialImpact: 520000 },
  { name: "São Paulo", status: "attention", financialImpact: 310000 },
  { name: "Interior", status: "stable", financialImpact: 85000 },
  { name: "São Bernardo", status: "attention", financialImpact: 190000 },
  { name: "São José dos Campos", status: "stable", financialImpact: 45000 },
];

export default function GeograficaPage() {
  const [units, setUnits] = useState<UnitStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { document.title = "Visualização Geográfica | IA Executiva"; }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUnits(mockUnits);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthLayout title="Visualização Geográfica">
      <div className={styles.wrapper}>
        <section className={styles.mapSection}>
          <SectionTitle title="Mapa de Impacto Financeiro" />
          <RegionalMap />
        </section>

        <aside className={styles.sidePanel}>
          <SectionTitle title="Indicadores" />
          {loading ? (
            <div style={{ padding: "2rem 0", textAlign: "center", opacity: 0.4, fontSize: "0.875rem" }}>
              Carregando indicadores...
            </div>
          ) : error ? (
            <p style={{ color: "var(--color-alert-high)", textAlign: "center", padding: "2rem 0", fontSize: "0.85rem" }}>
              {error}
            </p>
          ) : units.length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem 0", opacity: 0.4, fontSize: "0.85rem" }}>
              Nenhuma unidade disponível.
            </p>
          ) : (
            <div className={styles.unitList}>
              {units.map((unit) => (
                <UnitStatusCard key={unit.name} unit={unit} />
              ))}
            </div>
          )}
        </aside>
      </div>
    </AuthLayout>
  );
}
