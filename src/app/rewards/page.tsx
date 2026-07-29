import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Gift, Cake, Repeat, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Rewards & Referrals",
  description: "Earn points on every purchase, get a birthday gift, and earn credit for referring friends to Gemista.",
  alternates: { canonical: "/rewards" },
};

const ways = [
  { icon: Repeat, title: "Earn on every order", body: "Get 1 point for every ₹100 spent, redeemable for discounts on future orders." },
  { icon: UserPlus, title: "Refer a friend", body: "Give ₹300, get ₹300. You both save when they place their first order." },
  { icon: Cake, title: "Birthday reward", body: "A surprise discount code, delivered to your inbox on your birthday." },
  { icon: Gift, title: "Milestone rewards", body: "Unlock free gifts and early access as you reach new spending tiers." },
];

export default function RewardsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Gemista Rewards"
        title="Rewards & Referrals"
        description="A little something back, every time you shop or share."
        crumbs={[{ label: "Home", href: "/" }, { label: "Rewards" }]}
      />
      <div className="container-gem py-10">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {ways.map((w) => (
            <RevealItem key={w.title} className="flex gap-4 rounded-lg border border-beige p-6">
              <w.icon size={22} className="mt-0.5 shrink-0 text-gold-600" />
              <div>
                <h3 className="font-medium text-ink-900">{w.title}</h3>
                <p className="mt-1.5 text-sm text-ink-600">{w.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
