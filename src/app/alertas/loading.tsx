export default function AlertasLoading() {
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
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          background: "rgba(var(--surface-tint-rgb), 0.03)",
          border: "1px solid rgba(var(--surface-tint-rgb), 0.08)",
          borderRadius: "1rem",
          padding: "0.25rem",
          width: "fit-content",
        }}
      >
        <div
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "0.75rem",
            width: "120px",
            height: "36px",
            background: "rgba(var(--surface-tint-rgb), 0.06)",
          }}
        />
        <div
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "0.75rem",
            width: "120px",
            height: "36px",
            background: "rgba(var(--surface-tint-rgb), 0.06)",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
        }}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            style={{
              borderRadius: "1rem",
              padding: "1.5rem",
              background: "rgba(var(--surface-tint-rgb), 0.03)",
              border: "1px solid rgba(var(--surface-tint-rgb), 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(var(--surface-tint-rgb), 0.06)",
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: "16px",
                  borderRadius: "4px",
                  background: "rgba(var(--surface-tint-rgb), 0.06)",
                }}
              />
            </div>
            <div
              style={{
                height: "12px",
                borderRadius: "4px",
                background: "rgba(var(--surface-tint-rgb), 0.04)",
                marginBottom: "0.5rem",
              }}
            />
            <div
              style={{
                height: "12px",
                borderRadius: "4px",
                background: "rgba(var(--surface-tint-rgb), 0.04)",
                width: "80%",
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
