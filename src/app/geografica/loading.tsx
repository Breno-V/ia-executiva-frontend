export default function GeograficaLoading() {
  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem", maxWidth: "80rem", margin: "0 auto", width: "100%", boxSizing: "border-box", background: "var(--background)", minHeight: "100vh" }}>
      <div style={{ flex: 1, borderRadius: "1rem", background: "rgba(var(--surface-tint-rgb), 0.03)", border: "1px solid rgba(var(--surface-tint-rgb), 0.08)", minHeight: "400px" }} />
      <div style={{ width: "300px" }}>
        <div style={{ width: "140px", height: "20px", borderRadius: "4px", background: "rgba(var(--surface-tint-rgb), 0.06)", marginBottom: "1rem" }} />
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{ borderRadius: "0.75rem", padding: "1rem", background: "rgba(var(--surface-tint-rgb), 0.03)", border: "1px solid rgba(var(--surface-tint-rgb), 0.08)", marginBottom: "0.75rem" }}>
            <div style={{ width: "100px", height: "14px", borderRadius: "4px", background: "rgba(var(--surface-tint-rgb), 0.06)", marginBottom: "0.5rem" }} />
            <div style={{ width: "60px", height: "12px", borderRadius: "4px", background: "rgba(var(--surface-tint-rgb), 0.04)" }} />
          </div>
        ))}
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.15; } }
        div[style*=\"rgba(var(--surface-tint-rgb), 0.06)\"] { animation: pulse 1.5s ease-in-out infinite; }
        div[style*=\"rgba(var(--surface-tint-rgb), 0.04)\"] { animation: pulse 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
