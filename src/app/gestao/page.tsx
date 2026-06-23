"use client";

import { useState, useEffect, useRef } from "react";
import { useGestao } from "@/hooks/useGestao";
import { formatCurrency } from "@/libs/formatters";
import Link from "next/link";
import AuthLayout from "@/components/layout/AuthLayout";
import { z } from "zod";
import type { Severity } from "@/types";
import styles from "./gestao.module.css";

const severityConfig: Record<Severity, { label: string; color: string }> = {
  high: { label: "Alto", color: "var(--color-alert-high)" },
  medium: { label: "Médio", color: "var(--color-alert-medium)" },
  low: { label: "Baixo", color: "var(--color-alert-low)" },
};

export default function GestaoPage() {
  const { risks, loading, error } = useGestao();
  useEffect(() => {
    document.title = "Gestão Principal | IA Executiva";
  }, []);
  const [filterSeverity, setFilterSeverity] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      const raw =
        new URLSearchParams(window.location.search).get("search") || "";
      const result = z.string().max(200).safeParse(raw);
      return result.success ? result.data : "";
    }
    return "";
  });
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const lastButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setExpandedId(null);
        lastButtonRef.current?.focus();
        lastButtonRef.current = null;
      }
    }
    if (expandedId !== null) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [expandedId]);

  useEffect(() => {
    if (expandedId !== null) {
      detailPanelRef.current?.focus();
    }
  }, [expandedId]);

  const areas = [...new Set(risks.map((risk) => risk.type || "Geral"))];

  const filtered = risks.filter((risk) => {
    const matchSeverity = !filterSeverity || risk.severity === filterSeverity;
    const matchArea = !filterArea || (risk.type || "Geral") === filterArea;
    const matchSearch =
      !searchQuery ||
      (risk.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (risk.problem || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchSeverity && matchArea && matchSearch;
  });

  const [page, setPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function handleFilterChange(setter: (v: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  function toggleExpand(id: string, buttonRef?: HTMLButtonElement | null) {
    if (expandedId === id) {
      setExpandedId(null);
      buttonRef?.focus();
    } else {
      lastButtonRef.current = buttonRef || null;
      setExpandedId(id);
    }
  }

  function clearFilters() {
    setFilterSeverity("");
    setFilterArea("");
    setSearchQuery("");
    setPage(1);
  }

  return (
    <AuthLayout title="Gestão Principal">
      <div className={styles.wrapper}>
        <div className={styles.filters}>
          <select
            className={styles.select}
            value={filterSeverity}
            onChange={(e) =>
              handleFilterChange(setFilterSeverity, e.target.value)
            }
          >
            <option value="">Todos os riscos</option>
            <option value="high">Alto</option>
            <option value="medium">Médio</option>
            <option value="low">Baixo</option>
          </select>
          <select
            className={styles.select}
            value={filterArea}
            onChange={(e) => handleFilterChange(setFilterArea, e.target.value)}
          >
            <option value="">Todas as áreas</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar na tabela..."
            maxLength={200}
            value={searchQuery}
            onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
          />
        </div>

        {loading ? (
          <div className={styles.loading}>Carregando riscos...</div>
        ) : error ? (
          <p style={{ color: "var(--color-alert-high)", textAlign: "center" }}>
            Erro ao carregar dados. Tente novamente mais tarde.
          </p>
        ) : risks.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyHero}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M11 8v6" />
                <path d="M8 11h6" />
              </svg>
              <h3 className={styles.emptyTitle}>
                Nenhum diagnóstico disponível
              </h3>
              <p className={styles.emptySub}>
                Os riscos são gerados automaticamente pela IA após o upload de
                dados financeiros.
              </p>
            </div>
            <div className={styles.flowSteps}>
              <div className={styles.flowCard}>
                <div className={styles.flowIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <h4 className={styles.flowTitle}>Upload de Dados</h4>
                <p className={styles.flowDesc}>
                  Faça upload de planilhas DFC e vendas para alimentar o sistema
                  com informações financeiras.
                </p>
              </div>
              <div className={styles.flowCard}>
                <div className={styles.flowIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h4 className={styles.flowTitle}>Processamento IA</h4>
                <p className={styles.flowDesc}>
                  A IA executa regras de negócio para identificar riscos,
                  anomalias e oportunidades.
                </p>
              </div>
              <div className={styles.flowCard}>
                <div className={styles.flowIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <h4 className={styles.flowTitle}>Diagnósticos Gerados</h4>
                <p className={styles.flowDesc}>
                  Os resultados aparecem nesta tabela com nível de severidade,
                  impacto financeiro e recomendações.
                </p>
              </div>
            </div>
            <div className={styles.emptyActions}>
              <p className={styles.emptyHint}>
                Enquanto isso, você pode explorar o{" "}
                <Link href="/">Dashboard</Link> com KPIs atuais ou conversar com
                o <Link href="/alertas">Chatbot Executivo</Link>.
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyFilter}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.3 }}
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            <h4 className={styles.emptyFilterTitle}>
              Nenhum resultado para essa combinação
            </h4>
            <p className={styles.emptyFilterSub}>
              Tente ajustar os filtros ou limpar a busca.
            </p>
            <button className={styles.clearBtn} onClick={clearFilters}>
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Área</th>
                  <th>Descrição</th>
                  <th>Nível</th>
                  <th>Impacto</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((risk) => {
                  const config =
                    severityConfig[risk.severity] || severityConfig.low;
                  const isExpanded = expandedId === risk.id;
                  return (
                    <tr key={risk.id} className={styles.row}>
                      <td className={styles.id}>#{risk.id}</td>
                      <td className={styles.area}>{risk.type || "Geral"}</td>
                      <td className={styles.desc}>{risk.title}</td>
                      <td>
                        <span
                          className={styles.badge}
                          style={{
                            color: config.color,
                            borderColor: config.color,
                          }}
                        >
                          {config.label}
                        </span>
                      </td>
                      <td className={styles.impact}>
                        {risk.impact
                          ? formatCurrency(Number(risk.impact))
                          : "—"}
                      </td>
                      <td className={styles.status}>
                        <span
                          className={`${styles.statusBadge} ${styles[risk.status || "open"] as string}`}
                        >
                          {risk.status || "open"}
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles.detailBtn}
                          onClick={(e) =>
                            toggleExpand(risk.id, e.currentTarget)
                          }
                          aria-expanded={isExpanded}
                          aria-controls={`risk-detail-${risk.id}`}
                        >
                          {isExpanded ? "Fechar" : "Detalhar"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {expandedId &&
              (() => {
                const risk = paginated.find((r) => r.id === expandedId);
                if (!risk) return null;
                const config =
                  severityConfig[risk.severity] || severityConfig.low;
                return (
                  <div
                    id={`risk-detail-${risk.id}`}
                    className={styles.detailPanel}
                    ref={detailPanelRef}
                    tabIndex={-1}
                    style={{ borderLeftColor: config.color }}
                  >
                    <div className={styles.detailGrid}>
                      <div>
                        <span className={styles.detailLabel}>Problema</span>
                        <p className={styles.detailText}>
                          {risk.problem || "—"}
                        </p>
                      </div>
                      <div>
                        <span className={styles.detailLabel}>
                          Impacto Financeiro
                        </span>
                        <p className={styles.detailText}>
                          {risk.impact
                            ? formatCurrency(Number(risk.impact)) + "/mês"
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <span className={styles.detailLabel}>Recomendação</span>
                        <p className={styles.detailText}>
                          {risk.recommendation || "—"}
                        </p>
                      </div>
                      <div>
                        <span className={styles.detailLabel}>Data</span>
                        <p className={styles.detailText}>{risk.date || "—"}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1.5rem 0",
                }}
              >
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={styles.pageBtn}
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ""}`}
                    >
                      {n}
                    </button>
                  ),
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={styles.pageBtn}
                >
                  Próximo
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
