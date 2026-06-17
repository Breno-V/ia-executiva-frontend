"use client";
import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GestaoError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="errorContainer">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-alert-high)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1.5rem" }}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <h1 className="errorTitle">Erro na página de Gestão</h1>
      <p className="errorDescription">Não foi possível carregar os dados de gestão. Tente novamente ou volte ao Dashboard.</p>
      <div className="actions">
        <button onClick={reset} className="errorButton">Tentar novamente</button>
        <Link href="/" className="backLink">Voltar ao Dashboard</Link>
      </div>
      <style jsx>{`
        .errorContainer { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; text-align: center; background: var(--background); color: var(--foreground); }
        .errorTitle { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        .errorDescription { opacity: 0.6; margin-bottom: 2rem; max-width: 24rem; line-height: 1.6; }
        .actions { display: flex; gap: 1rem; align-items: center; }
        .errorButton { padding: 0.75rem 2rem; border-radius: 2rem; border: none; background: var(--color-accent); color: var(--background); font-weight: 600; cursor: pointer; font-size: 0.875rem; }
        .backLink { font-size: 0.875rem; color: var(--color-accent); text-decoration: none; font-weight: 500; }
        .backLink:hover { text-decoration: underline; }
        @media (max-width: 480px) { .errorTitle { font-size: 1.25rem; } .errorContainer { padding: 1.5rem; } .actions { flex-direction: column; } }
      `}</style>
    </div>
  );
}
