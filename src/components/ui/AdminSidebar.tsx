"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Package, Tags, MessageSquare, Bot, User, LogOut, Loader2 } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function AdminSidebar() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <>
      <div className="w-64 flex-shrink-0 h-full bg-zinc-950 border-r border-white/10 flex flex-col text-zinc-300 relative z-10">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Ekspora Admin</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-zinc-900 hover:text-white transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-zinc-900 hover:text-white transition-colors">
            <Package size={20} />
            <span className="font-medium text-sm">Products</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-zinc-900 hover:text-white transition-colors">
            <Tags size={20} />
            <span className="font-medium text-sm">Categories</span>
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-zinc-900 hover:text-white transition-colors">
            <MessageSquare size={20} />
            <span className="font-medium text-sm">Inquiries</span>
          </Link>
          <Link href="/admin/ai-sync" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-zinc-900 hover:text-white transition-colors">
            <Bot size={20} />
            <span className="font-medium text-sm">AI Sync</span>
          </Link>
          <Link href="/admin/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-zinc-900 hover:text-white transition-colors">
            <User size={20} />
            <span className="font-medium text-sm">Profile</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-md hover:bg-zinc-900 hover:text-red-400 text-zinc-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !isLoggingOut && setIsLogoutModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-white">Sign Out</h3>
            <p className="text-zinc-400 mt-2 mb-6">
              Are you sure you want to sign out? You will need to log in again to access the admin dashboard.
            </p>
            
            <div className="flex flex-row justify-end gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                disabled={isLoggingOut}
                className="px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2 min-w-[100px] justify-center disabled:opacity-80 disabled:cursor-not-allowed shadow-sm"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing out...
                  </>
                ) : (
                  'Sign Out'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
