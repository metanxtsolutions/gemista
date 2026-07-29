"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Photo as PhotoData } from "@/lib/data/photos";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: PhotoData[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border transition-colors sm:h-20 sm:w-20",
              active === i ? "border-ink-900" : "border-beige",
            )}
            aria-label={`View image ${i + 1}`}
          >
            <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <div
        className="relative flex-1 aspect-square cursor-zoom-in overflow-hidden rounded-lg bg-ivory sm:aspect-[4/5]"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <Image
          src={images[active].url}
          alt={images[active].alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            zoomed && "scale-125",
          )}
        />
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink-700 shadow-soft">
          <ZoomIn size={16} />
        </div>
      </div>
    </div>
  );
}
