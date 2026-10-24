export function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-sm font-bold uppercase tracking-wider text-[var(--accent)] border-b-2 border-[var(--accent)] pb-1 mb-3 ${className}`}
    >
      {children}
    </h2>
  );
}
