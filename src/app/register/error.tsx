"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      background: "var(--background)",
    }}>
      <p style={{ color: "var(--color-alert-high)" }}>Erro ao carregar página de registro.</p>
      <button
        onClick={() => reset()}
        style={{
          background: "var(--color-accent)",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.75rem 1.5rem",
          cursor: "pointer",
        }}
      >
        Tentar novamente
      </button>
    </div>
  );
}
