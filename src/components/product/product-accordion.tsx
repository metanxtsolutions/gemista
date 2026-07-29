"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Product } from "@/lib/data/types";

function Item({ value, title, children }: { value: string; title: string; children: React.ReactNode }) {
  return (
    <Accordion.Item value={value} className="border-b border-beige">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-ink-900">
          {title}
          <ChevronDown size={16} className="text-ink-400 transition-transform group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden pb-4 text-sm leading-relaxed text-ink-600 data-[state=open]:animate-[fade-up_0.3s_ease]">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  );
}

export function ProductAccordion({ product }: { product: Product }) {
  return (
    <Accordion.Root type="multiple" defaultValue={["details"]} className="mt-4">
      <Item value="details" title="Details & Materials">
        <ul className="list-disc space-y-1.5 pl-4">
          {product.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
          <li>Made with {product.materials.join(", ")}</li>
        </ul>
      </Item>
      <Item value="care" title="Jewellery Care">
        Avoid contact with perfume, lotion and water where possible. Store in the pouch
        provided, away from direct sunlight. Gently wipe with a soft, dry cloth after wear to
        keep the finish looking new.
      </Item>
      <Item value="shipping" title="Shipping & Delivery">
        Free shipping across India on orders above ₹999. Standard delivery in 3–5 business
        days; express delivery available at checkout. Cash on delivery available on orders
        under ₹5,000. We also ship worldwide, with international delivery in 7–12 business days.
      </Item>
      <Item value="returns" title="Returns & Exchanges">
        Not the one? We offer 15-day free returns and exchanges on unworn items in original
        packaging. Refunds are processed within 5–7 business days of receiving your return.
      </Item>
      <Item value="gifting" title="Gift Wrapping">
        Every order can be wrapped in signature Gemista packaging with a handwritten note, at
        no extra cost, just select it before checkout.
      </Item>
    </Accordion.Root>
  );
}
