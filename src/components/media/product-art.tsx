import { cn } from "@/lib/utils";
import { JewelryShape, Tone } from "@/lib/data/types";

const TONE_GRADIENTS: Record<Tone, string> = {
  gold: "radial-gradient(circle at 32% 24%, #fbf1dc 0%, #ecd9ae 34%, #d8b978 68%, #b8924f 100%)",
  rose: "radial-gradient(circle at 32% 24%, #fbeae2 0%, #f0d2c4 34%, #e0ab93 68%, #c98d78 100%)",
  silver: "radial-gradient(circle at 32% 24%, #ffffff 0%, #eeeae2 34%, #d7d0c2 68%, #b7ae9c 100%)",
  ivory: "radial-gradient(circle at 32% 24%, #fffdf8 0%, #f7f0e2 34%, #ecdfc7 68%, #ddccac 100%)",
};

const TONE_STROKE: Record<Tone, string> = {
  gold: "#8a6c39",
  rose: "#a56b56",
  silver: "#6b6151",
  ivory: "#ab8847",
};

function ShapeIcon({ shape, stroke }: { shape: JewelryShape; stroke: string }) {
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (shape) {
    case "ring":
      return (
        <svg viewBox="0 0 100 100" className="h-[46%] w-[46%]" aria-hidden>
          <circle cx="50" cy="58" r="24" {...common} />
          <path d="M42 32 L50 16 L58 32 Z" {...common} />
          <circle cx="50" cy="26" r="4.5" {...common} />
        </svg>
      );
    case "pendant":
      return (
        <svg viewBox="0 0 100 100" className="h-[46%] w-[46%]" aria-hidden>
          <path d="M20 26 Q50 6 80 26" {...common} />
          <path d="M50 26 L50 46" {...common} />
          <path d="M50 46 L38 62 Q50 76 62 62 Z" {...common} />
        </svg>
      );
    case "stud":
      return (
        <svg viewBox="0 0 100 100" className="h-[40%] w-[40%]" aria-hidden>
          <circle cx="50" cy="50" r="14" {...common} />
          <circle cx="50" cy="50" r="26" stroke={stroke} strokeOpacity={0.35} strokeWidth={1} fill="none" />
        </svg>
      );
    case "hoop":
      return (
        <svg viewBox="0 0 100 100" className="h-[46%] w-[46%]" aria-hidden>
          <circle cx="50" cy="46" r="28" {...common} />
          <path d="M50 18 a4 4 0 1 1 -0.1 0" {...common} />
        </svg>
      );
    case "drop":
      return (
        <svg viewBox="0 0 100 100" className="h-[48%] w-[48%]" aria-hidden>
          <circle cx="50" cy="22" r="6" {...common} />
          <path d="M50 28 L50 44" {...common} />
          <path d="M50 44 C 34 52, 34 76, 50 82 C 66 76, 66 52, 50 44 Z" {...common} />
        </svg>
      );
    case "bracelet":
      return (
        <svg viewBox="0 0 100 100" className="h-[50%] w-[50%]" aria-hidden>
          <ellipse cx="50" cy="50" rx="34" ry="14" {...common} />
          <ellipse cx="50" cy="50" rx="34" ry="14" transform="rotate(18 50 50)" stroke={stroke} strokeOpacity={0.4} strokeWidth={1} fill="none" />
        </svg>
      );
    case "set":
      return (
        <svg viewBox="0 0 100 100" className="h-[52%] w-[52%]" aria-hidden>
          <path d="M22 22 Q50 8 78 22" {...common} />
          <path d="M50 22 L50 38" {...common} />
          <circle cx="50" cy="46" r="9" {...common} />
          <circle cx="24" cy="70" r="7" {...common} />
          <circle cx="76" cy="70" r="7" {...common} />
        </svg>
      );
    default:
      return null;
  }
}

export function ProductArt({
  shape,
  tone,
  className,
  ringClassName,
}: {
  shape: JewelryShape;
  tone: Tone;
  className?: string;
  ringClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className,
      )}
      style={{ background: TONE_GRADIENTS[tone] }}
    >
      <div
        className={cn(
          "absolute inset-6 rounded-full border border-white/40 opacity-70",
          ringClassName,
        )}
      />
      <ShapeIcon shape={shape} stroke={TONE_STROKE[tone]} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_78%,rgba(255,255,255,0.35),transparent_55%)]" />
    </div>
  );
}
