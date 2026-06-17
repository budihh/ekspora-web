"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Jangan render Sidebar dan Topbar pada halaman Login
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-base text-text-primary">
      {/* Sidebar - Fixed Left (240px) */}
      <aside className="w-[240px] flex-shrink-0 bg-surface border-r border-border-hairline flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border-hairline">
          <Link href="/admin/dashboard" className="text-body font-display font-bold tracking-tight text-text-primary">
            Ekspora<span className="text-accent">.ai</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            <SidebarItem href="/admin/dashboard" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" label="Dashboard" active={pathname === '/admin/dashboard'} />
            <SidebarItem href="/admin/products" icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" label="Produk" active={pathname?.startsWith('/admin/products')} />
            <SidebarItem href="/admin/categories" icon="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" label="Kategori" active={pathname?.startsWith('/admin/categories')} />
            <SidebarItem href="/admin/company" icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" label="Profil Perusahaan" active={pathname?.startsWith('/admin/company')} />
            <SidebarItem href="/admin/ai-sync" icon="M13 10V3L4 14h7v7l9-11h-7z" label="Sinkronisasi AI" active={pathname?.startsWith('/admin/ai-sync')} />
          </nav>
        </div>
        
        <div className="p-4 border-t border-border-hairline">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-small text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Keluar Akses
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-base">
        {/* Topbar (Breadcrumb) */}
        <header className="h-16 flex-shrink-0 border-b border-border-hairline bg-surface flex items-center px-6 md:px-8 z-10">
          <div className="flex items-center gap-2 text-micro font-semibold uppercase tracking-widest text-text-secondary">
            <span>Admin Portal</span>
            <span className="text-border-hairline">/</span>
            <span className="text-text-primary">
              {pathname?.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </span>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ href, icon, label, active }: { href: string; icon: string; label: string; active: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-small font-medium transition-all ${
        active 
          ? 'bg-accent/10 text-accent' 
          : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
      }`}
    >
      <svg className={`w-5 h-5 ${active ? 'opacity-100' : 'opacity-70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d={icon} />
      </svg>
      {label}
    </Link>
  );
}
