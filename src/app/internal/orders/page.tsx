import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "@/lib/admin-auth";
import { listOrders } from "@/lib/db";
import { AdminLoginForm } from "@/components/internal/admin-login-form";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const authed = isValidSessionToken(token);

  if (!authed) {
    return (
      <div className="container-gem flex min-h-[60vh] items-center justify-center py-20">
        <AdminLoginForm />
      </div>
    );
  }

  let orders: Awaited<ReturnType<typeof listOrders>> = [];
  let loadError: string | null = null;
  try {
    orders = await listOrders();
  } catch {
    loadError = "Could not load orders. Check that the database is connected (POSTGRES_URL).";
  }

  return (
    <div className="container-gem py-10">
      <h1 className="font-display text-3xl text-ink-900">Orders</h1>
      <p className="mt-1 text-sm text-ink-500">
        {loadError ? " " : `${orders.length} order${orders.length === 1 ? "" : "s"}`}
      </p>

      {loadError && (
        <p className="mt-6 rounded-lg bg-error/10 px-4 py-3 text-sm text-error">{loadError}</p>
      )}

      {!loadError && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-beige">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-ivory text-ink-500">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Address</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Payment ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-ink-600">
                    {new Date(o.created_at).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 font-medium text-ink-900">{o.full_name}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-ink-600">{o.phone}</td>
                  <td className="px-4 py-3 text-ink-600">
                    {o.address}, {o.city} {o.pin_code}
                  </td>
                  <td className="px-4 py-3 text-ink-600">
                    {o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-900">
                    {formatPrice(o.total)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-ink-400">
                    {o.razorpay_payment_id}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-ink-400">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
