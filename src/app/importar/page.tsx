"use client";

import { useEffect } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import FileDropZone from "@/components/upload/FileDropZone";
import ParsedDataPreview from "@/components/upload/ParsedDataPreview";
import { useFileUpload } from "@/hooks/useFileUpload";
import styles from "./importar.module.css";

export default function ImportarPage() {
  const {
    file,
    handleFileSelect,
    state,
    result,
    error,
    validate,
    upload,
    reset,
  } = useFileUpload();

  useEffect(() => {
    document.title = "Importar Dados | IA Executiva";
  }, []);

  return (
    <AuthLayout title="Importar Dados">
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Upload de Arquivo</h2>
          <p className={styles.sectionDesc}>
            Envie planilhas, PDFs ou XMLs para alimentar o sistema com dados
            financeiros e operacionais.
          </p>

          <FileDropZone
            file={file}
            onFileSelect={handleFileSelect}
            validate={validate}
            disabled={state === "uploading"}
          />

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          {file && state !== "done" && (
            <div className={styles.actions}>
              <button
                className={styles.uploadBtn}
                onClick={upload}
                disabled={state === "uploading"}
                type="button"
              >
                {state === "uploading" ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Processando...
                  </>
                ) : (
                  "Extrair Dados"
                )}
              </button>
            </div>
          )}
        </div>

        {state === "done" && result && (
          <div className={styles.section}>
            <ParsedDataPreview data={result} onReset={reset} />
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
