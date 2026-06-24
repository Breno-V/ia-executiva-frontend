"use client";

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "@/libs/chartRegistry";
import { useKPIs } from "@/hooks/useKPIs";
import { useAnalyticalReport } from "@/hooks/useAnalyticalReport";
import { formatCurrency } from "@/libs/formatters";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import { SkeletonRelatorios } from "@/components/ui/SkeletonLoader";
import styles from "./relatorios.module.css";

export default function RelatoriosPage() {
  const {
    summary,
    loading: reportLoading,
    error: reportError,
    generateReport,
  } = useAnalyticalReport();
  const { kpiDaily, loading, error: fetchError } = useKPIs();

  useEffect(() => {
    document.title = "Relatórios Executivos | IA Executiva";
  }, []);

  return (
    <AuthLayout title="Relatórios Executivos">
      <div className={styles.wrapper}>
        {loading ? (
          <SkeletonRelatorios />
        ) : fetchError ? (
          <p
            style={{
              color: "var(--color-alert-high)",
              textAlign: "center",
              padding: "4rem 2rem",
            }}
          >
            {fetchError}
          </p>
        ) : (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Resumo Analítico</h2>
              <div className={styles.summaryBox}>
                {summary ? (
                  <div className={styles.summaryText}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
                  </div>
                ) : (
                  <p className={styles.summaryPlaceholder}>
                    Clique no botão abaixo para gerar o relatório analítico com
                    os principais achados da IA.
                  </p>
                )}
                {reportError && (
                  <p
                    style={{
                      color: "var(--color-alert-high)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {reportError}
                  </p>
                )}
                <div className={styles.summaryBtn}>
                  <Button
                    label={
                      reportLoading ? "Gerando..." : "Gerar Relatório Analítico"
                    }
                    onClick={generateReport}
                    disabled={reportLoading}
                  />
                </div>
              </div>
            </section>

            {kpiDaily && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Indicadores Atuais</h2>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Indicador</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Receita</td>
                        <td>{formatCurrency(kpiDaily.revenue)}</td>
                      </tr>
                      <tr>
                        <td>Despesas</td>
                        <td>{formatCurrency(kpiDaily.expenses)}</td>
                      </tr>
                      <tr>
                        <td>Resultado Líquido</td>
                        <td>{formatCurrency(kpiDaily.net)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </AuthLayout>
  );
}
