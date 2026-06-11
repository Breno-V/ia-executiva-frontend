"use client";

import { useCallback } from "react";
import { useHome } from "@/hooks/useHome";
import { formatCurrency, formatPercent } from "@/libs/formatters";
import { getLenis } from "@/libs/LenisContext";
import AuthLayout from "@/components/layout/AuthLayout";
import SectionTitle from "@/components/ui/SectionTitle";
import KpiCard from "@/components/kpi/KpiCard";
import RegionalMap from "@/components/map/RegionalMap";
import IaSection from "@/components/ui/AiSection";
import ProjectionLineChart from "@/components/charts/ProjectionLineChart";
import PriorityBarChart from "@/components/charts/PriorityBarChart";
import Footer from "@/components/layout/Footer";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import styles from "./page.module.css";

export default function Home() {
  const { kpiDaily, alerts, loading, error } = useHome();

  const scrollTo = useCallback((id: string) => {
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

  const revenue = Number(kpiDaily?.revenue) || 1000000;
  const economiaPotencial = revenue * 0.12;
  const ganhoProdutividade = 34;
  const potencialAutomacao = 58;
  const roiEstimado = 312;

  return (
    <AuthLayout title="Dashboard Executivo">
      <div className={styles.main}>
        <div className={styles.sectionNav}>
          <button onClick={() => scrollTo("kpis")} className={styles.sectionLink}>KPIs</button>
          <button onClick={() => scrollTo("projecao")} className={styles.sectionLink}>Projeção</button>
          <button onClick={() => scrollTo("prioridade")} className={styles.sectionLink}>Prioridade</button>
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
          <div className={styles.dashboardGrid}>
            <section id="kpis" className={styles.section}>
              <SectionTitle title="Indicadores-Chave" />
              <div className={styles.kpiContainer}>
                <div className={styles.kpiGrid}>
                  <KpiCard title="ROI Estimado" value={`${roiEstimado}%`} trend={roiEstimado} fullWidth />
                  <KpiCard title="Economia Potencial Mensal" value={formatCurrency(economiaPotencial)} trend={8.2} />
                  <KpiCard title="Ganho de Produtividade" value={formatPercent(ganhoProdutividade)} trend={12.5} />
                  <KpiCard title="Potencial de Automação" value={formatPercent(potencialAutomacao)} fullWidth />
                </div>
              </div>
            </section>

            <section id="projecao" className={styles.section}>
              <SectionTitle title="Projeção de Crescimento" />
              <ProjectionLineChart currentRevenue={revenue} />
            </section>

            <section id="prioridade" className={styles.section}>
              <SectionTitle title="Prioridade por Área" />
              <PriorityBarChart />
            </section>

            <section id="mapa" className={styles.section}>
              <SectionTitle title="Mapa de Performance Regional" />
              <RegionalMap />
            </section>

            <IaSection alerts={alerts} />
          </div>
        )}
      </div>
      <Footer />
    </AuthLayout>
  );
}
