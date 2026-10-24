export function FormSection({
  title,
  footer,
  children,
}: {
  title?: string;
  footer?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5">
      {title && <h3 className="section-header">{title}</h3>}
      <div className="grouped-inset">{children}</div>
      {footer && <p className="section-footer">{footer}</p>}
    </section>
  );
}
