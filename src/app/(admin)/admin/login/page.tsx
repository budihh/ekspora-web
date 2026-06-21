"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden px-4">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header / Logo Area */}
      <div className="z-10 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Ekspora Portal
        </h1>
        <p className="text-sm text-zinc-400 mb-10">
          Secure Administrator Access
        </p>
      </div>

      {/* Login Card */}
      <div className="z-10 w-full max-w-sm bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl px-8 pt-10 pb-12 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1.5">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="admin@ekspora.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-zinc-300 block">
                Password
              </label>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-lg py-2.5 mt-8 hover:bg-zinc-200 transition-colors focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="z-10 mt-8">
        <p className="text-xs text-zinc-500 tracking-wide uppercase">
          RESTRICTED ACCESS — EKSPORA TEAM ONLY
        </p>
      </div>
    </div>
  );
}
