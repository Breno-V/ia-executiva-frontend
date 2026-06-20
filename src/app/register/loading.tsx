export default function Loading() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--background)",
    }}>
      <p style={{ opacity: 0.5 }}>Carregando...</p>
    </div>
  );
}
