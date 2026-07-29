"use client";

import { useEffect } from "react";
import { useGemista } from "@/lib/store";

export function TrackView({ slug }: { slug: string }) {
  const pushRecentlyViewed = useGemista((s) => s.pushRecentlyViewed);

  useEffect(() => {
    pushRecentlyViewed(slug);
  }, [slug, pushRecentlyViewed]);

  return null;
}
