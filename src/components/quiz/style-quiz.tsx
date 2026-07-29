"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CollectionSlug } from "@/lib/data/types";
import { collections } from "@/lib/data/collections";
import { Photo } from "@/components/media/photo";
import { photos } from "@/lib/data/photos";

interface Question {
  question: string;
  options: { label: string; value: CollectionSlug }[];
}

const questions: Question[] = [
  {
    question: "What's their everyday style?",
    options: [
      { label: "Minimal & understated", value: "everyday-elegance" },
      { label: "Bold & glamorous", value: "party-glam" },
      { label: "Soft & romantic", value: "valentine" },
      { label: "Sparkly & fun", value: "crystal" },
    ],
  },
  {
    question: "What's the occasion?",
    options: [
      { label: "Just because", value: "everyday-elegance" },
      { label: "A date night", value: "date-night" },
      { label: "A wedding or celebration", value: "wedding-guest" },
      { label: "Work / office", value: "office" },
    ],
  },
  {
    question: "Pick a finish",
    options: [
      { label: "Warm gold", value: "everyday-elegance" },
      { label: "Cool silver", value: "crystal" },
      { label: "Soft rose gold", value: "valentine" },
      { label: "Mixed / statement", value: "party-glam" },
    ],
  },
];

export function StyleQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<CollectionSlug[]>([]);

  function choose(value: CollectionSlug) {
    const next = [...answers, value];
    setAnswers(next);
    setStep(step + 1);
  }

  function restart() {
    setAnswers([]);
    setStep(0);
  }

  if (step >= questions.length) {
    const counts: Record<string, number> = {};
    answers.forEach((a) => (counts[a] = (counts[a] ?? 0) + 1));
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as CollectionSlug;
    const result = collections.find((c) => c.slug === winner) ?? collections[0];

    return (
      <div className="mx-auto max-w-lg text-center [animation:fade-up_0.5s_ease]">
        <p className="eyebrow text-gold-600">Your Match</p>
        <h2 className="mt-3 font-display text-3xl text-ink-900">{result.name}</h2>
        <div className="relative mx-auto mt-6 aspect-[4/3] max-w-sm overflow-hidden rounded-xl">
          <Photo photo={photos[result.photo]} className="absolute inset-0" sizes="400px" />
        </div>
        <p className="mt-5 text-ink-600">{result.description}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href={`/collections/${result.slug}`}>Shop {result.name}</Link>
          </Button>
          <Button variant="secondary" onClick={restart}>
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  const current = questions[step];

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8 flex gap-1.5">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-ink-900" : "bg-beige"}`}
          />
        ))}
      </div>

      <div key={step} className="[animation:fade-up_0.4s_ease]">
        <h2 className="text-center font-display text-2xl text-ink-900">{current.question}</h2>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {current.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => choose(opt.value)}
              className="rounded-lg border border-beige px-5 py-4 text-left text-sm font-medium text-ink-800 transition-colors hover:border-ink-900 hover:bg-ivory"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
