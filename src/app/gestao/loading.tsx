export default function GestaoLoading() {
  return (
    <div style={{ padding: "2rem", maxWidth: "80rem", margin: "0 auto", width: "100%", boxSizing: "border-box", background: "var(--background)", minHeight: "100vh" }}>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}>
        <div style={{ width: "140px", height: "38px", borderRadius: "0.5rem", background: "rgba(var(--surface-tint-rgb), 0.06)" }} />
        <div style={{ width: "140px", height: "38px", borderRadius: "0.5rem", background: "rgba(var(--surface-tint-rgb), 0.06)" }} />
        <div style={{ flex: 1, height: "38px", borderRadius: "0.5rem", background: "rgba(var(--surface-tint-rgb), 0.06)" }} />
      </div>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ display: "flex", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(var(--surface-tint-rgb), 0.06)" }}>
          <div style={{ width: "40px", height: "20px", borderRadius: "4px", background: "rgba(var(--surface-tint-rgb), 0.06)" }} />
          <div style={{ width: "80px", height: "20px", borderRadius: "4px", background: "rgba(var(--surface-tint-rgb), 0.06)" }} />
          <div style={{ flex: 1, height: "20px", borderRadius: "4px", background: "rgba(var(--surface-tint-rgb), 0.06)" }} />
          <div style={{ width: "60px", height: "20px", borderRadius: "4px", background: "rgba(var(--surface-tint-rgb), 0.06)" }} />
          <div style={{ width: "100px", height: "20px", borderRadius: "4px", background: "rgba(var(--surface-tint-rgb), 0.06)" }} />
          <div style={{ width: "70px", height: "20px", borderRadius: "4px", background: "rgba(var(--surface-tint-rgb), 0.06)" }} />
        </div>
      ))}
      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.15; } }`}</style>
      <style>{`
        div[style*="rgba(var(--surface-tint-rgb), 0.06)"] { animation: pulse 1.5s ease-in-out infinite; }
        div[style*="rgba(var(--surface-tint-rgb), 0.06)"]:nth-child(2) { animation-delay: 0.1s; }
        div[style*="rgba(var(--surface-tint-rgb), 0.06)"]:nth-child(3) { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
