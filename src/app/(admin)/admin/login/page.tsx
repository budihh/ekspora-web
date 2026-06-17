"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Kredensial tidak valid. Silakan coba lagi.');
      } else {
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('Terjadi kesalahan sistem.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010102] flex items-center justify-center p-4">
      {/* Background Decorative */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-text-primary/10 blur-[100px] rounded-full mix-blend-screen opacity-50"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <h1 className="text-h2 font-display font-bold text-text-primary tracking-tight mb-2">
            Ekspora<span className="text-accent">.ai</span> Portal
          </h1>
          <p className="text-small text-text-secondary">
            Sistem Manajemen Katalog & Knowledge Base
          </p>
        </div>

        <div className="bg-surface border border-border-hairline rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle grid pattern in the card */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(var(--color-text-primary) 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
          
          <form onSubmit={handleLogin} className="relative z-10 flex flex-col gap-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-micro font-medium text-red-500 text-center">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-2.5">
              <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Email Administrator</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ekspora.com"
                className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Password Akses</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-4 w-full bg-text-primary text-base hover:opacity-90 text-[#08090A] px-4 py-3.5 rounded-xl font-bold transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-micro font-medium text-text-muted uppercase tracking-widest">
          Akses Terbatas — Khusus Tim Ekspora
        </div>
      </div>
    </div>
  );
}
