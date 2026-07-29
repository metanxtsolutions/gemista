import { Breadcrumbs, Crumb } from "@/components/ui/breadcrumbs";

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
}) {
  return (
    <div className="container-gem pb-4 pt-10 sm:pt-14">
      <Breadcrumbs items={crumbs} />
      <div className="mt-4 max-w-2xl">
        {eyebrow && <p className="eyebrow text-gold-600">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-4xl text-ink-900 sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 text-ink-500">{description}</p>}
      </div>
    </div>
  );
}
