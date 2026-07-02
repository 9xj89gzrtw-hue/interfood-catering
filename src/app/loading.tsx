export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Загрузка страницы"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: "2px solid var(--color-cream-dark, #F0EBE3)",
          borderTopColor: "var(--color-brand, #A07D3F)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span
        className="sr-only"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          border: 0,
        }}
      >
        Загрузка...
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
