"use client";

import { useState, useTransition } from 'react';
import { Search, Filter, Eye, X, Mail, Loader2, Check } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { updateInquiryStatus } from '@/app/actions/admin';
import { toast } from 'sonner';

export default function InquiriesClient({ initialInquiries }: { initialInquiries: any[] }) {
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  const selectedStatus = searchParams.get('status');

  const handleFilterStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedStatus?.toLowerCase() === status.toLowerCase()) {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
    setIsFiltersOpen(false);
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('status');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
    setIsFiltersOpen(false);
  };

  const handleUpdateStatus = (formData: FormData) => {
    if (!selectedInquiry) return;
    startTransition(async () => {
      try {
        const status = formData.get('status') as string;
        await updateInquiryStatus(selectedInquiry.id, status);
        toast.success('Inquiry status updated');
        setSelectedInquiry(null);
      } catch (error) {
        toast.error('Failed to update status');
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header Section */}
        <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Global Inquiries</h1>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Left: Search */}
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-zinc-500" />
              </div>
              <input 
                type="text" 
                placeholder="Search by name, email, or company..." 
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
              />
            </div>
          </div>
          
          {/* Right: Filter Popover */}
          <div className="flex items-center shrink-0">
            <div className="relative">
              <button 
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-transparent border ${selectedStatus ? 'border-white/40 text-white' : 'border-white/10 text-zinc-300'} rounded-lg hover:bg-zinc-900 hover:text-white transition-colors text-sm font-medium shrink-0 relative`}
              >
                <Filter size={16} />
                {selectedStatus ? selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) : 'All Status'}
                {selectedStatus && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                    1
                  </span>
                )}
              </button>

              {isFiltersOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsFiltersOpen(false)}></div>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-950 border border-white/10 rounded-xl shadow-2xl z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 px-1">Status</h4>
                        <div className="flex flex-col">
                          {['Unread', 'Read', 'Closed'].map((s, idx) => {
                            const isSelected = selectedStatus?.toLowerCase() === s.toLowerCase();
                            return (
                              <div key={s} className={`${idx !== 2 ? 'border-b border-white/5' : ''}`}>
                                <button 
                                  onClick={() => handleFilterStatus(s)}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${isSelected ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
                                >
                                  <span className="capitalize">{s}</span>
                                  {isSelected && <Check size={12} className="text-emerald-500 shrink-0" />}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="border-t border-white/10 pt-3">
                        <button 
                          onClick={resetFilters}
                          className="w-full py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-transparent hover:bg-zinc-900 border border-transparent hover:border-white/10 rounded-lg transition-colors"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-zinc-900/30 border border-white/10 rounded-xl overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-900/50 border-b border-white/10 text-zinc-400 font-medium">
                <tr>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Date</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Sender</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Company</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Message</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Status</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-none">
                {initialInquiries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-500">No inquiries found.</td>
                  </tr>
                )}
                {initialInquiries.map((inq) => (
                  <tr 
                    key={inq.id} 
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-zinc-900/40 transition-colors group cursor-pointer"
                  >
                    <td className="py-3 px-4 text-zinc-400">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{inq.senderName}</span>
                        <span className="text-xs text-zinc-500">{inq.senderEmail}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-zinc-300">{inq.company || '-'}</td>
                    <td className="py-3 px-4 text-zinc-300 truncate max-w-[200px]">{inq.message}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        inq.status === 'unread' 
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                          : inq.status === 'read' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                      }`}>
                        {inq.status.charAt(0).toUpperCase() + inq.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-3 text-zinc-400">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInquiry(inq);
                          }}
                          className="p-1.5 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" 
                          aria-label="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-white/10 bg-zinc-900/20">
            <span className="text-xs text-zinc-400">
              Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{initialInquiries.length}</span> of <span className="font-medium text-white">{initialInquiries.length}</span> inquiries
            </span>
            <div className="flex items-center gap-1.5">
              <button className="px-3 py-1.5 text-xs font-medium text-zinc-400 border border-white/10 rounded-md hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-zinc-400 border border-white/10 rounded-md hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedInquiry(null)}
          ></div>
          <div className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Mail className="text-zinc-400" size={20} />
                Inquiry Details
              </h2>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5 p-1.5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
              
              {/* Sender Info Bento */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-zinc-900/30 border border-white/5 rounded-xl">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Name</p>
                  <p className="text-sm font-medium text-white">{selectedInquiry.senderName}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Email</p>
                  <p className="text-sm font-medium text-white">{selectedInquiry.senderEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Company</p>
                  <p className="text-sm font-medium text-white">{selectedInquiry.company || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Date</p>
                  <p className="text-sm font-medium text-white">
                    {new Date(selectedInquiry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Message</p>
                  <div className="bg-zinc-900 border border-white/5 rounded-lg p-5 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer (Action Mode) */}
            <form action={handleUpdateStatus} className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 border-t border-white/10 bg-zinc-950 flex-shrink-0 rounded-b-2xl">
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <label className="text-sm font-medium text-zinc-400 whitespace-nowrap">Update Status:</label>
                <div className="relative">
                  <select 
                    name="status"
                    defaultValue={selectedInquiry.status}
                    className="bg-zinc-900 border border-white/10 rounded-lg pl-3 pr-8 py-2 text-sm text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all cursor-pointer appearance-none"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button 
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-5 py-2.5 text-sm font-medium text-zinc-300 border border-white/10 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button 
                  type="submit"
                  disabled={isPending}
                  className="flex items-center justify-center min-w-[140px] px-5 py-2.5 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : 'Update Status'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #3f3f46;
        }
      `}} />
    </div>
  );
}
