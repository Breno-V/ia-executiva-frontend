export default function ImportarLoading() {
  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "80rem",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        background: "var(--background)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          borderRadius: "1rem",
          padding: "2rem",
          background: "rgba(var(--surface-tint-rgb), 0.03)",
          border: "1px solid rgba(var(--surface-tint-rgb), 0.08)",
        }}
      >
        <div
          style={{
            width: "180px",
            height: "20px",
            borderRadius: "4px",
            background: "rgba(var(--surface-tint-rgb), 0.06)",
            marginBottom: "0.75rem",
          }}
        />
        <div
          style={{
            width: "320px",
            height: "14px",
            borderRadius: "4px",
            background: "rgba(var(--surface-tint-rgb), 0.04)",
            marginBottom: "2rem",
          }}
        />
        <div
          style={{
            width: "100%",
            height: "140px",
            borderRadius: "1rem",
            border: "2px dashed rgba(var(--surface-tint-rgb), 0.08)",
            background: "rgba(var(--surface-tint-rgb), 0.02)",
            marginBottom: "1rem",
          }}
        />
        <div
          style={{
            width: "140px",
            height: "36px",
            borderRadius: "2rem",
            background: "rgba(var(--surface-tint-rgb), 0.06)",
            marginLeft: "auto",
          }}
        />
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.15; } }
        div[style*="rgba(var(--surface-tint-rgb), 0.06)"] { animation: pulse 1.5s ease-in-out infinite; }
        div[style*="rgba(var(--surface-tint-rgb), 0.04)"] { animation: pulse 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
