// Skeleton loader exibido enquanto os dados do dashboard carregam
import styles from "./SkeletonLoader.module.css";

export default function SkeletonLoader() {
  return (
    <>
      {/* KPIs */}
      <section className={styles.section} style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ height: "1.5rem", width: "180px", marginBottom: "1.5rem" }}
          className={styles.skeleton} />
        <div className={styles.kpiContainer}>
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonValue} />
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonValue} />
            </div>
            <div className={`${styles.kpiCard} ${styles.fullWidth}`}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonValue} />
            </div>
          </div>
        </div>
      </section>

      {/* Gráficos */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ height: "1.5rem", width: "300px", marginBottom: "1.5rem" }}
          className={styles.skeleton} />
        <div className={styles.chartContainer}>
          <div className={styles.chartBox}>
            <div className={styles.chartPie} />
          </div>
          <div className={styles.chartBox}>
            <div className={styles.chartLine} />
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ height: "1.5rem", width: "260px", marginBottom: "1.5rem" }}
          className={styles.skeleton} />
        <div className={styles.mapBox} />
      </section>

      {/* Alertas */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ height: "1.5rem", width: "120px", marginBottom: "1.5rem" }}
          className={styles.skeleton} />
        <div className={styles.alertGrid}>
          <div className={styles.alertCard} />
          <div className={styles.alertCard} />
          <div className={styles.alertCard} />
        </div>
      </section>
    </>
  );
}