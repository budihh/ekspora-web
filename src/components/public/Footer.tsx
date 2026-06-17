import Link from "next/link";
import { Globe, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50 pt-20 pb-10 overflow-hidden relative">
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto w-full px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Globe className="w-8 h-8 text-white" />
              <span className="text-2xl font-display font-bold text-white tracking-tight">EKSPORA</span>
            </Link>
            <p className="text-zinc-400 leading-relaxed text-sm mb-8">
              Empowering Indonesian agricultural excellence. We are your premium global supply chain partner, delivering quality commodities to the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tight mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Discover', 'Heritage', 'Sectors', 'Trade Portfolio', 'Insights'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tight mb-6">Global Desks</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400 leading-relaxed text-sm">
                <MapPin className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                <span>SCBD District, District 8<br/>Jakarta, Indonesia 12190</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Mail className="w-5 h-5 text-zinc-500 shrink-0" />
                <a href="mailto:trade@ekspora.com" className="hover:text-white transition-colors duration-300">trade@ekspora.com</a>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Phone className="w-5 h-5 text-zinc-500 shrink-0" />
                <a href="tel:+622112345678" className="hover:text-white transition-colors duration-300">+62 21 1234 5678</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tight mb-6">Market Insights</h4>
            <p className="text-zinc-400 leading-relaxed text-sm mb-4">Subscribe to our latest global trade reports and commodity updates.</p>
            <form className="relative flex items-center w-full max-w-sm">
              <input 
                type="email" 
                placeholder="Business Email" 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-3 pl-4 pr-12 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all text-sm"
              />
              <button 
                type="submit"
                className="absolute right-1.5 p-1.5 bg-zinc-800 text-zinc-300 rounded-md hover:bg-zinc-700 hover:text-white transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} Ekspora Global. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Trade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
