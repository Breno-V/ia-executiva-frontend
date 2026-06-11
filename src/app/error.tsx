"use client";
import style from "./error.module.css";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={style.errorContainer}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-high)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1.5rem" }}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <h1 className={style.errorTitle}>Algo inesperado aconteceu</h1>
      <p className={style.errorDescription}>O sistema encontrou um erro ao processar sua solicitação. Tente novamente.</p>
      <button onClick={reset} className={style.errorButton}>
        Tentar novamente
      </button>
    </div>
  );
}
