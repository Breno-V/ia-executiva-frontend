import styles from "./SkeletonLoader.module.css";

export default function SkeletonLoader() {
  return (
    <>
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

      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ height: "1.5rem", width: "260px", marginBottom: "1.5rem" }}
          className={styles.skeleton} />
        <div className={styles.mapBox} />
      </section>

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

export function SkeletonRelatorios() {
  const section = { maxWidth: "80rem", margin: "0 auto" as const, padding: "0 2rem" };
  return (
    <div style={section}>
      <div style={{ height: "1.5rem", width: "200px", marginBottom: "1.5rem" }} className={styles.skeleton} />
      <div style={{ height: "120px", marginBottom: "2rem", borderRadius: "0.75rem" }} className={styles.skeleton} />
      <div style={{ height: "1.5rem", width: "260px", marginBottom: "1.5rem" }} className={styles.skeleton} />
      <div className={styles.chartContainer}>
        <div className={styles.chartBox}>
          <div className={styles.chartPie} />
        </div>
        <div className={styles.chartBox}>
          <div className={styles.chartLine} />
        </div>
      </div>
    </div>
  );
}
