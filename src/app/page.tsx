"use client";

import { useCallback, useEffect } from "react";
import { useHome } from "@/hooks/useHome";
import { getLenis } from "@/libs/LenisContext";
import { useKpiStore } from "@/store/kpiStore";
import AuthLayout from "@/components/layout/AuthLayout";
import SectionTitle from "@/components/ui/SectionTitle";
import KpiCard from "@/components/kpi/KpiCard";
import RegionalMap from "@/components/map/RegionalMap";
import AiSection from "@/components/ui/AiSection";
import ProjectionLineChart from "@/components/charts/ProjectionLineChart";
import PriorityBarChart from "@/components/charts/PriorityBarChart";
import UnitRiskChart from "@/components/charts/UnitRiskChart";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import styles from "./page.module.css";

export default function Home() {
  const { kpiDaily, summary, kpiComparisons, unitRisks, alerts, loading, error } =
    useHome();
  const { fetchKPIs, loading: refreshLoading } = useKpiStore();

  useEffect(() => {
    document.title = "Dashboard | IA Executiva";
  }, []);

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

  const barData = kpiComparisons?.map((k) => ({
    department: k.name,
    impact: k.currentValue ?? 0,
  }));

  const summaryCards = summary
    ? [
        { title: "Empresas", value: String(summary.totalCompanies) },
        { title: "Unidades", value: String(summary.totalUnits) },
        { title: "Riscos", value: String(summary.totalRisks) },
        { title: "KPIs", value: String(summary.totalKpis) },
        { title: "Alertas", value: String(summary.totalAlerts) },
        { title: "Relatórios", value: String(summary.totalReports) },
      ]
    : [];

  const sectionNav = (
    <>
      <button onClick={() => scrollTo("kpis")} className={styles.sectionLink}>
        KPIs
      </button>
      <button onClick={() => scrollTo("projecao")} className={styles.sectionLink}>
        Projeção
      </button>
      <button onClick={() => scrollTo("comparativo")} className={styles.sectionLink}>
        Comparativo
      </button>
      <button onClick={() => scrollTo("risco")} className={styles.sectionLink}>
        Risco
      </button>
      <button onClick={() => scrollTo("mapa")} className={styles.sectionLink}>
        Mapa
      </button>
      <button onClick={() => scrollTo("ia")} className={styles.sectionLink}>
        Análise IA
      </button>
      <button
        onClick={fetchKPIs}
        className={styles.refreshBtn}
        disabled={refreshLoading}
        aria-label="Atualizar dados da IA"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={refreshLoading ? styles.spinning : ""}
        >
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
        {refreshLoading ? "Atualizando..." : "Atualizar IA"}
      </button>
    </>
  );

  return (
    <AuthLayout title="Dashboard Executivo" sectionNav={sectionNav}>
      <div className={styles.main}>
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <p
            style={{
              textAlign: "center",
              marginTop: "4rem",
              color: "var(--color-alert-high)",
            }}
          >
            Erro ao carregar dados: {error}
          </p>
        ) : (
          <div className={styles.dashboardGrid}>
            <section id="kpis" className={styles.section}>
              <SectionTitle title="Indicadores-Chave" />
              <div className={styles.kpiContainer}>
                <div className={styles.kpiGrid}>
                  {summaryCards.length > 0
                    ? summaryCards.map((card) => (
                        <KpiCard
                          key={card.title}
                          title={card.title}
                          value={card.value}
                        />
                      ))
                    : Array.from({ length: 6 }).map((_, i) => (
                        <KpiCard key={i} title="-" value="-" />
                      ))}
                </div>
              </div>
            </section>

            <section id="projecao" className={styles.section}>
              <SectionTitle title="Projeção de Crescimento" />
              <ProjectionLineChart currentRevenue={kpiDaily?.revenue} />
            </section>

            <section id="comparativo" className={styles.section}>
              <SectionTitle title="Comparativo de KPIs" />
              <PriorityBarChart
                data={barData}
                title="Comparativo de KPIs"
                subtitle="Valores atuais por indicador"
              />
            </section>

            <section id="risco" className={styles.section}>
              <SectionTitle title="Risco por Unidade" />
              <UnitRiskChart data={unitRisks} />
            </section>

            <section id="mapa" className={styles.section}>
              <SectionTitle title="Mapa de Performance Regional" />
              <RegionalMap />
            </section>

            <AiSection alerts={alerts} />
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
