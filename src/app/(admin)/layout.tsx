import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Produk', path: '/produk' },
    { name: 'Kategori', path: '/kategori' },
    { name: 'Profil', path: '/profil' },
    { name: 'AI Sync', path: '/ai-sync' }
  ];

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      {/* Sidebar - Fixed Left */}
      <aside className="w-64 bg-surface border-r border-border-hairline flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border-hairline">
          <span className="font-display font-bold text-text-primary text-lg tracking-tight">Ekspora Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={`/admin${item.path}`}
              className="flex items-center px-3 py-2.5 rounded-lg text-small font-medium text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border-hairline">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-hairline flex items-center justify-center text-micro font-bold text-text-primary">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-small font-medium text-text-primary">Admin User</span>
              <span className="text-micro text-text-muted">admin@ekspora.com</span>
            </div>
          </div>
          <Link href="/admin/login" className="mt-2 flex items-center px-3 py-2 rounded-lg text-small font-medium text-error hover:bg-error/10 transition-colors">
            Log out
          </Link>
        </div>
      </aside>

      {/* Main Content Area - Right */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar for mobile or additional header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-border-hairline bg-surface/50 backdrop-blur-md">
          <div className="md:hidden font-display font-bold text-text-primary">Ekspora Admin</div>
          <div className="hidden md:flex flex-1"></div>
          <div className="flex items-center gap-4">
             {/* Action items could go here */}
             <span className="text-micro text-text-muted">v1.0.0</span>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
