"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface FaqSection {
  category: string;
  items: { q: string; a: string }[];
}

export function FaqAccordion({ sections }: { sections: FaqSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.category}>
          <h2 className="font-display text-xl text-ink-900">{section.category}</h2>
          <Accordion.Root type="multiple" className="mt-3">
            {section.items.map((item, i) => (
              <Accordion.Item
                key={item.q}
                value={`${section.category}-${i}`}
                className="border-b border-beige"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-ink-900">
                    {item.q}
                    <ChevronDown
                      size={16}
                      className="shrink-0 text-ink-400 transition-transform group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-4 text-sm leading-relaxed text-ink-600">
                  {item.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      ))}
    </div>
  );
}
