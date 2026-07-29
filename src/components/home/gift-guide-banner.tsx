import Link from "next/link";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { photos } from "@/lib/data/photos";

export function GiftGuideBanner() {
  return (
    <section className="pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div className="container-gem">
        <Reveal className="relative overflow-hidden rounded-xl bg-rose-200">
          <div className="grid grid-cols-1 items-center gap-8 px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-2">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-rose-500">
                <Gift size={20} />
              </div>
              <h2 className="mt-6 text-balance font-display text-3xl text-ink-900 sm:text-4xl">
                Not sure what to gift?
              </h2>
              <p className="mt-4 max-w-md text-balance text-ink-600">
                Take our 60-second Style Quiz and we&apos;ll match them with a piece they&apos;ll
                actually wear, or browse our curated gift guide by occasion and budget.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/gift-guide/quiz">Take the Style Quiz</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/gift-guide">Browse Gift Guide</Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-4">
              <Photo
                photo={photos.jewelryBox}
                className="aspect-square translate-y-6 rounded-lg shadow-lifted"
                sizes="200px"
              />
              <Photo
                photo={photos.necklaceProduct}
                className="aspect-square rounded-lg shadow-lifted"
                sizes="200px"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
