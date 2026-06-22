import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          marginBottom: "0.5rem",
          opacity: 0.3,
        }}
      >
        404
      </h1>
      <h2
        style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}
      >
        Página não encontrada
      </h2>
      <p style={{ opacity: 0.5, marginBottom: "2rem" }}>
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 2rem",
          borderRadius: "2rem",
          border: "none",
          background: "var(--color-accent)",
          color: "var(--background)",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "0.875rem",
          textDecoration: "none",
        }}
      >
        Voltar ao Dashboard
      </Link>
    </div>
  );
}
