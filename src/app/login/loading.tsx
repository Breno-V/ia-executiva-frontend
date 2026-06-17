export default function LoginLoading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1rem", background: "var(--background)" }}>
      <div style={{ width: "2rem", height: "2rem", border: "2px solid rgba(var(--surface-tint-rgb), 0.12)", borderTopColor: "var(--color-accent)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
