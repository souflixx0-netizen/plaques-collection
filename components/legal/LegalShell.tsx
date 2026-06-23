export default function LegalShell({
  title,
  updated = "juin 2026",
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="font-sans text-xs text-forge-secondary tracking-[0.17em] uppercase mb-3">
            Légal
          </p>
          <h1 className="heading-display text-4xl md:text-5xl font-bold mb-3 text-balance">
            {title}
          </h1>
          <p className="font-sans text-[10px] text-forge-dim">
            Dernière mise à jour : {updated}
          </p>
          <div className="gold-line mt-6" />
        </div>
        <div className="legal-prose text-forge-secondary font-body leading-relaxed text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
