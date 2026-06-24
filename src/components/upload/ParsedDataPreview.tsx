"use client";

import type { ParsedFile } from "@/types";
import styles from "./ParsedDataPreview.module.css";

interface ParsedDataPreviewProps {
  data: ParsedFile;
  onReset: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function CsvPreview({ data }: { data: Record<string, unknown> }) {
  const rows = (data?.data as Record<string, unknown>[]) || [];
  const metadata = data?.metadata as Record<string, unknown> | undefined;
  const columns = (metadata?.columns as string[]) || [];

  if (!rows.length) {
    return <p className={styles.empty}>Nenhum dado encontrado no arquivo.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 200).map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col}>{row[col] != null ? String(row[col]) : "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > 200 && (
        <p className={styles.truncated}>
          Exibindo 200 de {rows.length} linhas
        </p>
      )}
    </div>
  );
}

function XlsxPreview({ data }: { data: Record<string, unknown> }) {
  const sheets = data?.data as Record<
    string,
    { rows: number; columns: string[]; data: Record<string, unknown>[] }
  > | null;

  if (!sheets) {
    return <p className={styles.empty}>Nenhuma aba encontrada.</p>;
  }

  const sheetNames = Object.keys(sheets);

  return (
    <div className={styles.sheetsWrap}>
      {sheetNames.map((name) => {
        const sheet = sheets[name];
        return (
          <details key={name} className={styles.sheet} open={sheetNames.length === 1}>
            <summary className={styles.sheetSummary}>
              <span>{name}</span>
              <span className={styles.sheetMeta}>
                {sheet.rows} linha{sheet.rows !== 1 ? "s" : ""},{" "}
                {sheet.columns.length} coluna{sheet.columns.length !== 1 ? "s" : ""}
              </span>
            </summary>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {sheet.columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sheet.data.slice(0, 200).map((row, i) => (
                    <tr key={i}>
                      {sheet.columns.map((col) => (
                        <td key={col}>
                          {row[col] != null ? String(row[col]) : "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {sheet.data.length > 200 && (
                <p className={styles.truncated}>
                  Exibindo 200 de {sheet.data.length} linhas
                </p>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

function PdfPreview({ data }: { data: Record<string, unknown> }) {
  const pdfData = data?.data as
    | { text?: string; tables?: unknown[][] }
    | undefined;
  const text = pdfData?.text || "";
  const tables = pdfData?.tables || [];

  return (
    <div className={styles.pdfWrap}>
      {text && (
        <section>
          <h4 className={styles.sectionTitle}>Texto Extraído</h4>
          <pre className={styles.pdfText}>{text}</pre>
        </section>
      )}
      {tables.length > 0 && (
        <section>
          <h4 className={styles.sectionTitle}>
            Tabelas Extraídas ({tables.length})
          </h4>
                  {(tables as unknown[][]).map((table, i) => (
            <div key={i} className={styles.tableWrap}>
              <table className={styles.table}>
                <tbody>
                  {(table as unknown[]).map((row, ri) => (
                    <tr key={ri}>
                      {(row as unknown[]).map((cell, ci) => (
                        <td key={ci}>
                          {cell != null ? String(cell) : "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>
      )}
      {!text && tables.length === 0 && (
        <p className={styles.empty}>Nenhum conteúdo extraído do PDF.</p>
      )}
    </div>
  );
}

function XmlPreview({ data }: { data: Record<string, unknown> }) {
  return (
    <pre className={styles.xmlPre}>
      {JSON.stringify(data?.data || data, null, 2)}
    </pre>
  );
}

export default function ParsedDataPreview({
  data,
  onReset,
}: ParsedDataPreviewProps) {
  const result = data.result_json || {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{data.filename}</h3>
          <p className={styles.subtitle}>
            {data.file_type.toUpperCase()} &middot;{" "}
            {new Date(data.created_at).toLocaleString("pt-BR")}
          </p>
        </div>
        <button className={styles.resetBtn} onClick={onReset} type="button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Novo Upload
        </button>
      </div>

      <div className={styles.content}>
        {data.file_type === "csv" && <CsvPreview data={result} />}
        {data.file_type === "xlsx" && <XlsxPreview data={result} />}
        {data.file_type === "pdf" && <PdfPreview data={result} />}
        {data.file_type === "xml" && <XmlPreview data={result} />}
      </div>
    </div>
  );
}
