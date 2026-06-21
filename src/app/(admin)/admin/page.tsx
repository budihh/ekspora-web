import Link from 'next/link';
import { Package, Tags, MessageSquare, Bot, ArrowRight, Plus, RefreshCw, Activity } from 'lucide-react';
import { getDashboardMetrics, getAdminInquiries } from '@/app/actions/admin';

export default async function AdminDashboard() {
  // Format today's date elegantly
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const metrics = await getDashboardMetrics();
  const allInquiries = await getAdminInquiries();
  const recentInquiries = allInquiries.slice(0, 4).map(inq => ({
    id: inq.id,
    name: inq.senderName,
    company: inq.company || 'Unknown',
    time: new Date(inq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    status: inq.status.charAt(0).toUpperCase() + inq.status.slice(1)
  }));

  return (
    <div className="w-full max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1.5">Dashboard Overview</h1>
        <p className="text-zinc-400 text-sm">
          Welcome back, here's what's happening today, {today}.
        </p>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-200">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-400">Total Products</h3>
            <Package className="h-4 w-4 text-zinc-500" />
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight text-white mt-2">{metrics.products}</div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">+4 this week</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-200">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-400">Total Categories</h3>
            <Tags className="h-4 w-4 text-zinc-500" />
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight text-white mt-2">{metrics.categories}</div>
            <p className="text-xs text-zinc-500 mt-1 font-medium">All synced</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-200">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-400">New Inquiries</h3>
            <MessageSquare className="h-4 w-4 text-zinc-500" />
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight text-white mt-2">{metrics.newInquiries}</div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">+12% from last month</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-200">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-400">AI Knowledge Base</h3>
            <Bot className="h-4 w-4 text-zinc-500" />
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight text-white mt-2">Active</div>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Last synced 2h ago</p>
          </div>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Inquiries (col-span-2) */}
        <div className="lg:col-span-2 bg-zinc-950 border border-white/10 rounded-xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white tracking-tight">Recent Inquiries</h2>
            <Link 
              href="/admin/inquiries" 
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="flex flex-col">
            {recentInquiries.map((inq, idx) => (
              <Link 
                key={inq.id}
                href="/admin/inquiries"
                className={`p-5 flex items-center justify-between hover:bg-zinc-900 transition-colors group ${
                  idx !== recentInquiries.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="font-medium text-zinc-200 group-hover:text-white transition-colors text-sm">{inq.name}</span>
                  <span className="hidden sm:block text-zinc-600 text-xs">•</span>
                  <span className="text-sm text-zinc-500">{inq.company}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-500 hidden sm:block">{inq.time}</span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    inq.status === 'Unread' 
                      ? 'bg-white text-black' 
                      : 'bg-zinc-900 text-zinc-400 border border-white/5'
                  }`}>
                    {inq.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Actions & System (col-span-1) */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          
          {/* Quick Actions Card */}
          <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-medium text-white tracking-tight mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                href="/admin/products"
                className="w-full bg-white text-black font-semibold px-4 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Plus size={16} />
                Add New Product
              </Link>
              <Link 
                href="/admin/ai-sync"
                className="w-full bg-zinc-900 text-white font-medium px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors flex items-center justify-center gap-2 text-sm group"
              >
                <RefreshCw size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
                Sync AI Now
              </Link>
            </div>
          </div>

          {/* System Status Card */}
          <div className="bg-zinc-950 border border-white/10 rounded-xl p-5 flex-1 flex flex-col justify-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
              <Activity size={100} />
            </div>
            <h2 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-4">System Status</h2>
            <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/5 rounded-lg p-3.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-emerald-300"></span>
              </span>
              <span className="text-xs font-medium text-emerald-400/90 tracking-wide">All systems operational</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
