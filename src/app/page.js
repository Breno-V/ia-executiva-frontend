"use client"

import { useCallback } from "react";
import { useHome } from "@/hooks/useHome";
import { formatCurrency } from "@/libs/formatters.js";
import { getLenis } from "@/libs/LenisContext";
import AuthLayout from "@/components/layout/AuthLayout";
import SectionTitle from "@/components/ui/SectionTitle";
import KpiCard from "@/components/kpi/KpiCard";
import RegionalMap from "@/components/map/RegionalMap";
import IaSection from "@/components/ui/AiSection";
import RevenueLineChart from "@/components/charts/RevenueLineChart";
import ChannelPieChart from "@/components/charts/ChannelPizzaChart";
import Footer from "@/components/layout/Footer";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import styles from "./page.module.css";

export default function Home() {
  const { kpiDaily, kpisMonthly, alerts, loading, error } = useHome();

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(top, { duration: 1.2 });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <AuthLayout title="Dashboard Executivo">
      <div className={styles.main}>
        <div className={styles.sectionNav}>
          <button onClick={() => scrollTo("kpis")} className={styles.sectionLink}>KPIs</button>
          <button onClick={() => scrollTo("tendencia")} className={styles.sectionLink}>Tendência</button>
          <button onClick={() => scrollTo("mapa")} className={styles.sectionLink}>Mapa</button>
          <button onClick={() => scrollTo("ia")} className={styles.sectionLink}>Análise IA</button>
        </div>

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
      </div>
      <Footer />
    </AuthLayout>
  );
}