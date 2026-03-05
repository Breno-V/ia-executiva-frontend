import SectionTitle from "@/components/ui/SectionTitle";
import KpiCard from "@/components/kpi/KpiCard";
import TopBar from "@/components/layout/TopBar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <TopBar />
      <section id="kpis" className={styles.section}>
        <SectionTitle title="KPI's Principais" />
        <div className={styles.kpiContainer}>
          <div className={styles.kpiGrid}>
          <KpiCard title="Receita" value="R$ 4.850.000" />
          <KpiCard title="Despesas" value="R$ 3.920.000" />
          <KpiCard title="Resultado Líquido" value="R$ 930.000" fullWidth />
        </div>
        </div>
      </section>
      <section id="tendencia" className={styles.section}>
        <SectionTitle title="Tendência da Receita (Últimos 6 meses)" />
      </section>
      <section id="mapa" className={styles.section}>
        <SectionTitle title="Mapa de Performance Regional" />
      </section>
      <section id="ia" className={styles.section}>
        <SectionTitle title="Análise Automática da IA" />
      </section>
    </main>
  );
}
