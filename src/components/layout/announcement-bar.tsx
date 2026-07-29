"use client";

import { useEffect, useState } from "react";

const messages = [
  "Free shipping across India on orders above ₹999",
  "New: The Butterfly Collection has landed",
  "Complimentary gift wrapping on every order",
  "Use code SHINE10 for 10% off your first order",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex h-9 items-center justify-center overflow-hidden bg-ink-900 px-4 text-center">
      <p
        key={index}
        className="animate-[fade-up_0.5s_ease] text-[11px] font-medium tracking-wide text-cream sm:text-xs"
      >
        {messages[index]}
      </p>
    </div>
  );
}
