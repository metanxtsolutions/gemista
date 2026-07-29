import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { AccountForm } from "@/components/forms/account-form";

export const metadata: Metadata = {
  title: "My Account",
  description: "Sign in to your Gemista account to track orders, manage your wishlist and rewards.",
  alternates: { canonical: "/account" },
};

export default function AccountPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Welcome Back"
        title="My Account"
        crumbs={[{ label: "Home", href: "/" }, { label: "Account" }]}
      />
      <div className="container-gem max-w-md py-10">
        <AccountForm />
      </div>
    </div>
  );
}
