import type { Metadata } from "next";
import { cookies } from "next/headers";
import { PageHeader } from "@/components/ui/page-header";
import { OtpLoginForm } from "@/components/account/otp-login-form";
import { AccountDashboard } from "@/components/account/account-dashboard";
import { CUSTOMER_COOKIE_NAME, getCustomerIdFromToken } from "@/lib/customer-auth";
import { getCustomerById, listOrdersForCustomer } from "@/lib/db";

export const metadata: Metadata = {
  title: "My Account",
  description: "Sign in to your Gemista account to track orders, manage your wishlist and rewards.",
  alternates: { canonical: "/account" },
};

export default async function AccountPage() {
  const cookieStore = await cookies();
  const customerId = getCustomerIdFromToken(cookieStore.get(CUSTOMER_COOKIE_NAME)?.value);

  let customer = null;
  let orders: Awaited<ReturnType<typeof listOrdersForCustomer>> = [];
  if (customerId) {
    try {
      customer = await getCustomerById(customerId);
      if (customer) orders = await listOrdersForCustomer(customerId);
    } catch {
      customer = null;
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow={customer ? "My Account" : "Welcome"}
        title={customer ? "My Account" : "Sign In"}
        crumbs={[{ label: "Home", href: "/" }, { label: "Account" }]}
      />
      <div className="container-gem py-10">
        {customer ? (
          <AccountDashboard customer={customer} orders={orders} />
        ) : (
          <div className="flex justify-center">
            <OtpLoginForm />
          </div>
        )}
      </div>
    </div>
  );
}
