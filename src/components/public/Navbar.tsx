import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-border-hairline h-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl h-full flex items-center justify-between">
        <Link href="/" className="text-body font-display font-bold tracking-tight text-text-primary">
          Ekspora<span className="text-accent">.</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-small font-medium text-text-secondary">
          <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-text-primary transition-colors">About</Link>
          <Link href="/commodities" className="hover:text-text-primary transition-colors">Commodities</Link>
          <Link href="/catalog" className="hover:text-text-primary transition-colors">Catalog</Link>
          <Link href="/news" className="hover:text-text-primary transition-colors">News</Link>
          <Link href="/contact" className="hover:text-text-primary transition-colors">Contact</Link>
        </div>

        <Link href="/contact" className="hidden md:inline-flex px-4 py-2 bg-text-primary text-[#08090A] text-small font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-white/5">
          Hubungi Kami
        </Link>

        {/* Mobile menu button placeholder */}
        <button className="md:hidden text-text-secondary hover:text-text-primary">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
