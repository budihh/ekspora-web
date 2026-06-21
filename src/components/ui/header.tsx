"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronRight } from "lucide-react";
import { useScroll } from "./use-scroll";
import { MenuToggleIcon } from "./menu-toggle-icon";

export function Header() {
  const isScrolled = useScroll(20);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: "Discover", href: "/" },
    { name: "Heritage", href: "/heritage" },
    { name: "Sectors", href: "/sectors" },
    { name: "Trade Portfolio", href: "/portfolio" },
    { name: "Insights", href: "/insights" },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
          isScrolled ? "top-0 md:top-4" : "top-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ease-in-out ${
            isScrolled ? "max-w-5xl px-4 md:px-0" : "container px-4 md:px-6"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? "bg-zinc-950/70 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50 px-6 py-3 rounded-full"
                : "bg-transparent border-transparent px-0 py-6 rounded-none"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Globe className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
              <span className="text-xl font-display font-bold tracking-tight text-white">
                EKSPORA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/inquiries"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-sm font-medium text-white transition-all"
              >
                Inquire Now
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                className="md:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <MenuToggleIcon isOpen={mobileMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-zinc-950 pt-32 px-6"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium text-white hover:text-zinc-300 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/inquiries"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 mx-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-800 text-white font-semibold border border-white/10"
              >
                Inquire Now
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
