"use client"

import { useEffect, useState } from "react";
import { useHome } from "@/hooks/useHome";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/libs/api.js";
import { formatCurrency } from "@/libs/formatters.js";
import SectionTitle from "@/components/ui/SectionTitle";
import KpiCard from "@/components/kpi/KpiCard";
import TopBar from "@/components/layout/TopBar";
import RegionalMap from "@/components/map/RegionalMap";
import IaSection from "@/components/ui/AiSection";
import RevenueLineChart from "@/components/charts/RevenueLineChart";
import ChannelPieChart from "@/components/charts/ChannelPizzaChart";
import Footer from "@/components/layout/Footer";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { kpiDaily, kpisMonthly, alerts, loading, error } = useHome();

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  if (!mounted) return null;
  if (!isAuthenticated()) return null;

  return (
    <>
      <main className={styles.main}>
        <TopBar />

        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <p style={{ textAlign: "center", marginTop: "4rem", color: "var(--color-alert-high)" }}>
            Erro ao carregar dados: {error}
          </p>
        ) : (
          <>
            <section id="kpis" className={styles.section}>
              <SectionTitle title="KPI's Principais" />
              <div className={styles.kpiContainer}>
                <div className={styles.kpiGrid}>
                  <KpiCard title="Receita" value={formatCurrency(kpiDaily?.revenue)} />
                  <KpiCard title="Despesas" value={formatCurrency(kpiDaily?.expenses)} />
                  <KpiCard
                    title="Resultado Líquido"
                    value={formatCurrency(kpiDaily?.net)}
                    fullWidth
                  />
                </div>
              </div>
            </section>

            <section id="tendencia" className={styles.section}>
              <SectionTitle title="Tendência da Receita (Últimos 6 meses)" />
              <div className={styles.tendenciaContainer}>
                <ChannelPieChart />
                <RevenueLineChart kpisMonthly={kpisMonthly} />
              </div>
            </section>

            <section id="mapa" className={styles.section}>
              <SectionTitle title="Mapa de Performance Regional" />
              <RegionalMap />
            </section>

            <IaSection alerts={alerts} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}