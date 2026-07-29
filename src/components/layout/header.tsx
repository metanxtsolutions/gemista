"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { useGemista } from "@/lib/store";

const navItems = [
  { label: "Earrings", href: "/collections/earrings", mega: true },
  { label: "Necklaces", href: "/collections/necklaces", mega: true },
  { label: "Bracelets", href: "/collections/bracelets", mega: true },
  { label: "Rings", href: "/collections/rings", mega: true },
  { label: "Sets", href: "/collections/jewellery-sets", mega: true },
  { label: "Gift Guide", href: "/gift-guide", mega: false },
  { label: "Sale", href: "/collections/sale", mega: false },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openCart = useGemista((s) => s.openCart);
  const openSearch = useGemista((s) => s.openSearch);
  const hasHydrated = useGemista((s) => s.hasHydrated);
  const cartCount = useGemista((s) => s.cartCount());
  const wishlistCount = useGemista((s) => s.wishlist.length);
  const showCartBadge = hasHydrated && cartCount > 0;
  const showWishlistBadge = hasHydrated && wishlistCount > 0;

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-beige bg-paper/95 backdrop-blur"
        onMouseLeave={() => setMenuOpen(false)}
      >
      <div className="container-gem flex h-16 items-center justify-between lg:h-20">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center text-ink-800"
          >
            <Menu size={22} />
          </button>
        </div>

        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-ink-900 lg:text-[1.75rem]"
        >
          Gemista
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              onMouseEnter={() => item.mega && setMenuOpen(true)}
              className="relative"
            >
              <Link
                href={item.href}
                className="text-sm font-medium text-ink-700 link-underline transition-colors hover:text-ink-900"
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center text-ink-700 hover:text-ink-900"
          >
            <Search size={19} />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center text-ink-700 hover:text-ink-900 sm:flex"
          >
            <User size={19} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center text-ink-700 hover:text-ink-900"
          >
            <Heart size={19} />
            {showWishlistBadge && (
              <span className="absolute right-0.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-ink-950">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={openCart}
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center text-ink-700 hover:text-ink-900"
          >
            <ShoppingBag size={19} />
            {showCartBadge && (
              <span className="absolute right-0.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink-900 text-[9px] font-bold text-cream">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

        <MegaMenu open={menuOpen} />
      </header>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
