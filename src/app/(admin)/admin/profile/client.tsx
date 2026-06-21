"use client";

import { useState, useTransition } from 'react';
import { User, Lock, Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { updateAdminProfile, updateAdminPassword } from '@/app/actions/profile';
import { toast } from 'sonner';

export default function ProfileClient({ initialUser }: { initialUser: any }) {
  const [isPendingProfile, startTransitionProfile] = useTransition();
  const [isPendingPassword, startTransitionPassword] = useTransition();
  
  const handleUpdateProfile = (formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    startTransitionProfile(async () => {
      const res = await updateAdminProfile(name, email);
      if (res.success) {
        toast.success("Profile updated successfully. Please log in again if email changed.");
      } else {
        toast.error(res.error || "Failed to update profile");
      }
    });
  };

  const handleUpdatePassword = (formData: FormData) => {
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    startTransitionPassword(async () => {
      const res = await updateAdminPassword(currentPassword, newPassword);
      if (res.success) {
        toast.success("Password updated successfully.");
        // Clear inputs manually or let user navigate away. Using form reset would require a ref, but simple enough for now.
      } else {
        toast.error(res.error || "Failed to update password");
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Profile Settings</h1>
        <p className="text-zinc-400">Manage your account details and security preferences.</p>
      </div>

      <div className="space-y-8">
        {/* Card 1: Personal Information */}
        <form action={handleUpdateProfile} className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
            <User className="text-zinc-400" size={20} />
            <h2 className="text-lg font-semibold text-white tracking-tight">Personal Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-zinc-500" />
                  </div>
                  <input 
                    name="name"
                    type="text" 
                    defaultValue={initialUser?.name || ""}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-zinc-500" />
                  </div>
                  <input 
                    name="email"
                    type="email" 
                    defaultValue={initialUser?.email || ""}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-white/5">
              <button 
                type="submit"
                disabled={isPendingProfile}
                className="bg-white text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isPendingProfile && <Loader2 size={16} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </form>

        {/* Card 2: Security */}
        <form action={handleUpdatePassword} className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="text-zinc-400" size={20} />
              <h2 className="text-lg font-semibold text-white tracking-tight">Security & Password</h2>
            </div>
            <ShieldCheck className="text-emerald-500/80" size={20} />
          </div>
          <div className="p-6">
            <div className="space-y-5 max-w-md mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Current Password</label>
                <input 
                  name="currentPassword"
                  type="password" 
                  required
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">New Password</label>
                <input 
                  name="newPassword"
                  type="password" 
                  required
                  placeholder="Enter new password"
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Confirm New Password</label>
                <input 
                  name="confirmPassword"
                  type="password" 
                  required
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
              <button 
                type="submit"
                disabled={isPendingPassword}
                className="bg-transparent border border-white/20 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-white hover:text-black transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isPendingPassword && <Loader2 size={16} className="animate-spin" />}
                Update Password
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
