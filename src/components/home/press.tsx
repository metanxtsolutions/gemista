import { press } from "@/lib/data/misc";
import { Reveal } from "@/components/motion/reveal";

export function Press() {
  return (
    <section className="border-y border-beige bg-cream py-14">
      <div className="container-gem">
        <Reveal className="text-center">
          <p className="eyebrow text-ink-400">As Seen In</p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {press.map((p) => (
            <span
              key={p.name}
              className="font-display text-lg text-ink-400 transition-colors hover:text-ink-800 sm:text-xl"
              title={p.quote}
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
