export default function RelatoriosLoading() {
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
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "20px",
            borderRadius: "4px",
            background: "rgba(var(--surface-tint-rgb), 0.06)",
            marginBottom: "1rem",
          }}
        />
        <div
          style={{
            height: "14px",
            borderRadius: "4px",
            background: "rgba(var(--surface-tint-rgb), 0.04)",
            marginBottom: "0.5rem",
          }}
        />
        <div
          style={{
            height: "14px",
            borderRadius: "4px",
            background: "rgba(var(--surface-tint-rgb), 0.04)",
            width: "90%",
            marginBottom: "0.5rem",
          }}
        />
        <div
          style={{
            height: "14px",
            borderRadius: "4px",
            background: "rgba(var(--surface-tint-rgb), 0.04)",
            width: "60%",
            marginBottom: "1.5rem",
          }}
        />
        <div
          style={{
            width: "160px",
            height: "38px",
            borderRadius: "2rem",
            background: "rgba(var(--surface-tint-rgb), 0.06)",
          }}
        />
      </div>
      <div
        style={{
          borderRadius: "1rem",
          padding: "1.5rem",
          background: "rgba(var(--surface-tint-rgb), 0.03)",
          border: "1px solid rgba(var(--surface-tint-rgb), 0.08)",
        }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "0.75rem 0",
              borderBottom:
                i < 3
                  ? "1px solid rgba(var(--surface-tint-rgb), 0.06)"
                  : "none",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "18px",
                borderRadius: "4px",
                background: "rgba(var(--surface-tint-rgb), 0.06)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: "18px",
                borderRadius: "4px",
                background: "rgba(var(--surface-tint-rgb), 0.06)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: "18px",
                borderRadius: "4px",
                background: "rgba(var(--surface-tint-rgb), 0.06)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: "18px",
                borderRadius: "4px",
                background: "rgba(var(--surface-tint-rgb), 0.04)",
              }}
            />
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
