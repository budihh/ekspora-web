"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Globe, ChevronRight } from "lucide-react";

export function FloatingNavbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Discover", href: "/" },
    { name: "Heritage", href: "/heritage" },
    { name: "Sectors", href: "/sectors" },
    { name: "Trade Portfolio", href: "/portfolio" },
    { name: "Insights", href: "/insights" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 border -mx-6 ${
              isScrolled
                ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50"
                : "bg-transparent border-transparent"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Globe className="w-6 h-6 text-accent group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
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
                  className="text-sm font-medium text-text-secondary hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/inquiries"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-medium text-white transition-all backdrop-blur-md"
              >
                Inquire Now
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                className="md:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl pt-32 px-6"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium text-white hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/inquiries"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 mx-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold"
              >
                Inquire Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
