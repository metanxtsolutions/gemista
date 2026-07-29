export function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-beige py-8 first:pt-0 last:border-none">
      <h2 className="font-display text-xl text-ink-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-600">{children}</div>
    </div>
  );
}
