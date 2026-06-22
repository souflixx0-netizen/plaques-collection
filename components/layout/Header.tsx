"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartContext } from "@/components/cart/CartContext";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/catalogue",     label: "Catalogue" },
  { href: "/configurateur", label: "Configurateur" },
  { href: "/a-propos",      label: "L'Atelier" },
  { href: "/faq",           label: "FAQ" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, setIsOpen } = useCartContext();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-30 transition-all duration-500",
        scrolled
          ? "bg-forge-dark/96 backdrop-blur-md border-b border-forge-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none gap-px">
          <span className="font-sans text-[11px] font-bold text-forge-text tracking-[0.45em] uppercase">
            Plaques Collection
          </span>
          <span className="font-sans text-[8px] text-forge-gold tracking-[0.14em] uppercase">
            Aluminium pochoir · France
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative font-sans text-[11px] tracking-widest uppercase transition-colors duration-200 py-1",
                "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left",
                "after:scale-x-0 after:bg-forge-gold after:transition-transform after:duration-300",
                "hover:text-forge-text hover:after:scale-x-100",
                pathname === href
                  ? "text-forge-gold after:scale-x-100"
                  : "text-forge-secondary"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-forge-secondary hover:text-forge-text transition-colors"
            aria-label="Panier"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-forge-gold text-forge-black text-[8px] font-bold font-sans rounded-full flex items-center justify-center">
                {count > 9 ? "9" : count}
              </span>
            )}
          </button>

          <Link
            href="/configurateur"
            className="hidden md:inline-flex btn-primary py-2 px-5 text-[11px]"
          >
            Configurer
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-forge-secondary hover:text-forge-text transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-b border-forge-border",
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-forge-dark/98 backdrop-blur-md px-6 py-5 space-y-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "block py-2.5 font-sans text-xs tracking-widest uppercase transition-colors",
                pathname === href ? "text-forge-gold" : "text-forge-secondary hover:text-forge-text"
              )}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3">
            <Link href="/configurateur" className="btn-primary w-full justify-center">
              Configurer ma plaque
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
