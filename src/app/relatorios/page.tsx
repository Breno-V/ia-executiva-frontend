"use client";

import { useEffect } from "react";
import { Radar } from "react-chartjs-2";
import "@/libs/chartRegistry";
import { useAI } from "@/hooks/useAI";
import { useKPIs } from "@/hooks/useKPIs";
import { useChartTheme } from "@/hooks/useChartTheme";
import { formatCurrency } from "@/libs/formatters";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import { SkeletonRelatorios } from "@/components/ui/SkeletonLoader";
import styles from "./relatorios.module.css";

export default function RelatoriosPage() {
  const c = useChartTheme();
  const {
    summary,
    loading: aiLoading,
    error: aiError,
    generateSummary,
  } = useAI();
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
                  <p className={styles.summaryText}>{summary}</p>
                ) : (
                  <p className={styles.summaryPlaceholder}>
                    Clique no botão abaixo para gerar um resumo executivo com os
                    principais achados da IA.
                  </p>
                )}
                {aiError && (
                  <p
                    style={{
                      color: "var(--color-alert-high)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {aiError}
                  </p>
                )}
                <div className={styles.summaryBtn}>
                  <Button
                    label={aiLoading ? "Gerando..." : "Gerar Resumo Executivo"}
                    onClick={generateSummary}
                    disabled={aiLoading}
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
