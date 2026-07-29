"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useGemista } from "@/lib/store";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { Photo } from "@/components/media/photo";
import { photos, categoryGallery } from "@/lib/data/photos";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

export default function CartPage() {
  const cart = useGemista((s) => s.cart);
  const setQty = useGemista((s) => s.setQty);
  const removeFromCart = useGemista((s) => s.removeFromCart);
  const subtotal = useGemista((s) => s.cartSubtotal());
  const mounted = useGemista((s) => s.hasHydrated);

  return (
    <div>
      <PageHeader
        eyebrow="Your Bag"
        title="Shopping Bag"
        crumbs={[{ label: "Home", href: "/" }, { label: "Bag" }]}
      />
      <div className="container-gem py-10">
        {mounted && cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag size={36} className="text-ink-300" />
            <p className="mt-4 font-display text-xl text-ink-900">Your bag is empty</p>
            <Button className="mt-6" asChild>
              <Link href="/collections/all">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-beige">
              {cart.map((line) => {
                const product = products.find((p) => p.slug === line.slug);
                const photoKey = product ? categoryGallery[product.category]?.[0] : undefined;
                return (
                  <li key={`${line.slug}-${line.variant}`} className="flex gap-5 py-6">
                    <Link href={`/products/${line.slug}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-md">
                      {photoKey && <Photo photo={photos[photoKey]} sizes="96px" />}
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link href={`/products/${line.slug}`} className="font-medium text-ink-900">
                            {line.name}
                          </Link>
                          <p className="mt-0.5 text-sm text-ink-500">{line.variant}</p>
                        </div>
                        <button onClick={() => removeFromCart(line.slug, line.variant)} className="text-ink-400 hover:text-error">
                          <X size={16} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border border-beige">
                          <button onClick={() => setQty(line.slug, line.variant, line.qty - 1)} className="flex h-8 w-8 items-center justify-center text-ink-600">
                            <Minus size={13} />
                          </button>
                          <span className="w-7 text-center text-sm">{line.qty}</span>
                          <button onClick={() => setQty(line.slug, line.variant, line.qty + 1)} className="flex h-8 w-8 items-center justify-center text-ink-600">
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="font-semibold text-ink-900">{formatPrice(line.price * line.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="h-fit rounded-lg border border-beige p-6">
              <h2 className="font-display text-lg text-ink-900">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-ink-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Shipping</span>
                  <span>{subtotal >= 999 ? "Free" : formatPrice(79)}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-t border-beige pt-4 font-semibold text-ink-900">
                <span>Total</span>
                <span>{formatPrice(subtotal + (subtotal >= 999 || subtotal === 0 ? 0 : 79))}</span>
              </div>
              <Button className="mt-6 w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
