"use client";

import { usePathname } from 'next/navigation';
import { AdminSidebar } from "@/components/ui/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Jangan render Sidebar pada halaman Login
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-white">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
