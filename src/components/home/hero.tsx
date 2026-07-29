"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/data/photos";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative flex min-h-[94vh] items-end overflow-hidden bg-ink-950">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[10%] h-[120%] w-full">
        <Image
          src={photos.neckJewelry.url}
          alt={photos.neckJewelry.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_30%] opacity-90"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />

      <div className="container-gem relative z-10 pb-16 pt-40 sm:pb-24">
        <div className="max-w-2xl">
          <p
            className="eyebrow mb-5 text-gold-400 opacity-0 [animation:fade-up_0.6s_ease_0.1s_forwards]"
          >
            Affordable Luxury Jewellery
          </p>

          <h1
            className="text-balance font-display text-[2.75rem] font-medium leading-[1.05] text-cream opacity-0 [animation:fade-up_0.7s_ease_0.22s_forwards] sm:text-6xl lg:text-[5rem]"
          >
            Jewellery That
            <br />
            <span className="italic text-gold-400">Celebrates You.</span>
          </h1>

          <p
            className="mt-6 max-w-md text-balance text-base leading-relaxed text-ink-200 opacity-0 [animation:fade-up_0.7s_ease_0.36s_forwards] sm:text-lg"
          >
            Elegant jewellery for every moment, every outfit, every version of you.
            Made to be worn daily, priced so you actually will.
          </p>

          <div
            className="mt-9 flex flex-col items-start gap-3 opacity-0 [animation:fade-up_0.7s_ease_0.5s_forwards] sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link href="/collections/all" className="flex items-center gap-2">
                Shop Collection <ArrowRight size={16} />
              </Link>
            </Button>
            <Button variant="outline-light" size="lg" asChild>
              <Link href="/collections/new-arrivals">New Arrivals</Link>
            </Button>
          </div>

          <div
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-medium uppercase tracking-wider text-ink-300 opacity-0 [animation:fade-up_0.7s_ease_0.64s_forwards]"
          >
            <span>Worldwide Shipping</span>
            <span className="hidden h-1 w-1 rounded-full bg-ink-500 sm:block" />
            <span>Hypoallergenic Materials</span>
            <span className="hidden h-1 w-1 rounded-full bg-ink-500 sm:block" />
            <span>COD Available</span>
            <span className="hidden h-1 w-1 rounded-full bg-ink-500 sm:block" />
            <span>Free Gift Wrapping</span>
          </div>
        </div>
      </div>
    </section>
  );
}
