"use client";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="errorContainer">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-alert-high)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: "1.5rem" }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <h1 className="errorTitle">Algo inesperado aconteceu</h1>
      <p className="errorDescription">
        O sistema encontrou um erro ao processar sua solicitação. Tente
        novamente.
      </p>
      <button onClick={reset} className="errorButton">
        Tentar novamente
      </button>
      <style jsx>{`
        .errorContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          text-align: center;
          background-color: var(--background);
          color: var(--foreground);
        }
        .errorTitle {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .errorDescription {
          opacity: 0.6;
          margin-bottom: 2rem;
          max-width: 24rem;
        }
        .errorButton {
          padding: 0.75rem 2rem;
          border-radius: 2rem;
          border: none;
          background: var(--color-accent);
          color: var(--background);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.875rem;
        }
        @media (max-width: 480px) {
          .errorTitle {
            font-size: 1.25rem;
          }
          .errorContainer {
            padding: 1.5rem;
          }
        }
        @media (max-width: 390px) {
          .errorTitle {
            font-size: 1.1rem;
          }
          .errorDescription {
            font-size: 0.85rem;
          }
          .errorButton {
            padding: 0.6rem 1.5rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
