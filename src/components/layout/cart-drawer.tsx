"use client";

import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useGemista } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import { ProductArt } from "@/components/media/product-art";
import { products } from "@/lib/data/products";
import { Button } from "@/components/ui/button";

const FREE_SHIPPING_THRESHOLD = 999;

export function CartDrawer() {
  const isOpen = useGemista((s) => s.isCartOpen);
  const closeCart = useGemista((s) => s.closeCart);
  const cart = useGemista((s) => s.cart);
  const setQty = useGemista((s) => s.setQty);
  const removeFromCart = useGemista((s) => s.removeFromCart);
  const subtotal = useGemista((s) => s.cartSubtotal());

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] transition-opacity duration-300",
        isOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
      )}
      aria-hidden={!isOpen}
    >
      <div onClick={closeCart} className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" />
      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-lifted transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-beige px-6 py-5">
          <h2 className="font-display text-xl text-ink-900">
            Your Bag ({cart.reduce((n, c) => n + c.qty, 0)})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ivory"
          >
            <X size={18} />
          </button>
        </div>

        {cart.length > 0 && (
          <div className="border-b border-beige bg-ivory px-6 py-3">
            <p className="text-xs text-ink-600">
              {remaining > 0 ? (
                <>
                  You&apos;re <strong>{formatPrice(remaining)}</strong> away from free
                  shipping
                </>
              ) : (
                "You've unlocked free shipping!"
              )}
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-beige">
              <div
                className="h-full rounded-full bg-gold-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag size={40} className="text-ink-300" />
              <div>
                <p className="font-medium text-ink-900">Your bag is empty</p>
                <p className="mt-1 text-sm text-ink-500">
                  Add something beautiful to it.
                </p>
              </div>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/collections/new-arrivals" onClick={closeCart}>
                  Shop New Arrivals
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map((line) => {
                const product = products.find((p) => p.slug === line.slug);
                return (
                  <li key={`${line.slug}-${line.variant}`} className="flex gap-4">
                    <Link
                      href={`/products/${line.slug}`}
                      onClick={closeCart}
                      className="h-24 w-20 shrink-0 overflow-hidden rounded-md"
                    >
                      {product && (
                        <ProductArt shape={product.art.shape} tone={product.art.tone} />
                      )}
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${line.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-ink-900"
                        >
                          {line.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(line.slug, line.variant)}
                          className="text-ink-400 hover:text-error"
                          aria-label="Remove item"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-ink-500">{line.variant}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-beige">
                          <button
                            onClick={() => setQty(line.slug, line.variant, line.qty - 1)}
                            className="flex h-7 w-7 items-center justify-center text-ink-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs">{line.qty}</span>
                          <button
                            onClick={() => setQty(line.slug, line.variant, line.qty + 1)}
                            className="flex h-7 w-7 items-center justify-center text-ink-600"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-ink-900">
                          {formatPrice(line.price * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-beige px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-ink-500">Subtotal</span>
              <span className="font-semibold text-ink-900">{formatPrice(subtotal)}</span>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout" onClick={closeCart} className="flex w-full items-center justify-center">
                Checkout · {formatPrice(subtotal)}
              </Link>
            </Button>
            <p className="mt-3 text-center text-[11px] text-ink-400">
              Shipping, taxes & gift wrap calculated at checkout
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
