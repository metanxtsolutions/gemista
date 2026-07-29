"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  slug: string;
  name: string;
  price: number;
  variant: string;
  qty: number;
}

interface GemistaState {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addToCart: (line: Omit<CartLine, "qty">, qty?: number) => void;
  removeFromCart: (slug: string, variant: string) => void;
  setQty: (slug: string, variant: string, qty: number) => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  pushRecentlyViewed: (slug: string) => void;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  cartCount: () => number;
  cartSubtotal: () => number;
}

export const useGemista = create<GemistaState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      isCartOpen: false,
      isSearchOpen: false,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      addToCart: (line, qty = 1) =>
        set((state) => {
          const existing = state.cart.find(
            (c) => c.slug === line.slug && c.variant === line.variant,
          );
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c === existing ? { ...c, qty: c.qty + qty } : c,
              ),
              isCartOpen: true,
            };
          }
          return {
            cart: [...state.cart, { ...line, qty }],
            isCartOpen: true,
          };
        }),

      removeFromCart: (slug, variant) =>
        set((state) => ({
          cart: state.cart.filter(
            (c) => !(c.slug === slug && c.variant === variant),
          ),
        })),

      setQty: (slug, variant, qty) =>
        set((state) => ({
          cart: state.cart
            .map((c) =>
              c.slug === slug && c.variant === variant ? { ...c, qty } : c,
            )
            .filter((c) => c.qty > 0),
        })),

      toggleWishlist: (slug) =>
        set((state) => ({
          wishlist: state.wishlist.includes(slug)
            ? state.wishlist.filter((s) => s !== slug)
            : [...state.wishlist, slug],
        })),

      isWishlisted: (slug) => get().wishlist.includes(slug),

      pushRecentlyViewed: (slug) =>
        set((state) => ({
          recentlyViewed: [
            slug,
            ...state.recentlyViewed.filter((s) => s !== slug),
          ].slice(0, 8),
        })),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),

      cartCount: () => get().cart.reduce((sum, c) => sum + c.qty, 0),
      cartSubtotal: () =>
        get().cart.reduce((sum, c) => sum + c.qty * c.price, 0),
    }),
    {
      name: "gemista-store",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
