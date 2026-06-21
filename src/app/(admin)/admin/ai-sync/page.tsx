"use client";

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Check, Database, RefreshCw, Terminal, Activity, AlertTriangle } from 'lucide-react';
import { triggerSync, getSyncStatus, getSyncHistory } from '@/app/actions/ai-sync';

export default function AiSyncPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [syncType, setSyncType] = useState('quick');
  const [selectedModules, setSelectedModules] = useState<string[]>(['Products', 'Categories']);
  const [logs, setLogs] = useState<string[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [activeSyncId, setActiveSyncId] = useState<string | null>(null);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSyncId && isSyncing) {
      interval = setInterval(async () => {
        const status = await getSyncStatus(activeSyncId);
        if (status) {
          setProgress(status.progress);
          setLogs(status.logs as string[]);
          
          if (status.status !== 'processing') {
            setIsSyncing(false);
            setActiveSyncId(null);
            loadHistory();
            clearInterval(interval);
          }
        }
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [activeSyncId, isSyncing]);

  const loadHistory = async () => {
    const data = await getSyncHistory();
    setHistory(data);
  };

  const handleModuleToggle = (module: string) => {
    setSelectedModules(prev => 
      prev.includes(module) 
        ? prev.filter(m => m !== module)
        : [...prev, module]
    );
  };

  const handleStartSync = async () => {
    if (selectedModules.length === 0) return;
    setIsSyncing(true);
    setProgress(0);
    setLogs([`[${new Date().toLocaleTimeString('en-GB')}] System: Initialization started...`]);
    
    try {
      const syncId = await triggerSync(syncType === 'full' ? 'Full Rebuild' : 'Quick Sync', selectedModules);
      setActiveSyncId(syncId);
    } catch (error) {
      console.error(error);
      setIsSyncing(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            AI Knowledge Base Sync
            <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-500/20">Beta</span>
          </h1>
          <p className="text-zinc-400">Manage vector embeddings and train the AI assistant with your latest catalog data.</p>
        </div>
        
        {/* Top Section: Grid 3 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kolom Kiri: Configuration Panel */}
          <div className="lg:col-span-1 bg-zinc-900/50 border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
               <Database className="text-zinc-400" size={20} />
               <h2 className="text-lg font-semibold text-white tracking-tight">Configuration</h2>
            </div>

            <div className="flex flex-col justify-between flex-1 gap-6">
              {/* Select Modules */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-300 block">Select Modules to Sync</label>
                <div className="flex flex-col gap-4">
                  {['Products', 'Categories', 'Inquiries'].map((module, idx) => (
                    <label key={idx} className="flex items-center gap-4 p-3.5 rounded-lg border border-white/5 bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer group">
                      <div className={`relative flex items-center justify-center w-5 h-5 border rounded transition-colors ${selectedModules.includes(module) ? 'border-blue-400 bg-zinc-950' : 'border-white/20 bg-zinc-950 group-hover:border-blue-400'}`}>
                        <input 
                          type="checkbox" 
                          className="peer absolute opacity-0 w-full h-full cursor-pointer" 
                          checked={selectedModules.includes(module)}
                          onChange={() => handleModuleToggle(module)}
                        />
                        <Check size={14} className={`text-blue-400 transition-opacity ${selectedModules.includes(module) ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-zinc-300 font-medium">{module}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sync Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300 block">Sync Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label 
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer relative overflow-hidden group ${
                      syncType === 'quick' 
                        ? 'border-white/20 bg-zinc-800 ring-1 ring-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                        : 'border-white/5 bg-zinc-900/50 hover:bg-zinc-900 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="syncType" 
                      value="quick"
                      checked={syncType === 'quick'}
                      onChange={() => setSyncType('quick')}
                      className="absolute opacity-0 w-full h-full cursor-pointer" 
                    />
                    <RefreshCw size={18} className={`${syncType === 'quick' ? 'text-white' : 'text-zinc-500'} transition-colors`} />
                    <span className={`text-xs font-semibold ${syncType === 'quick' ? 'text-white' : 'text-zinc-400'}`}>Quick Sync</span>
                  </label>
                  <label 
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer relative overflow-hidden group ${
                      syncType === 'full' 
                        ? 'border-white/20 bg-zinc-800 ring-1 ring-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                        : 'border-white/5 bg-zinc-900/50 hover:bg-zinc-900 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="syncType" 
                      value="full"
                      checked={syncType === 'full'}
                      onChange={() => setSyncType('full')}
                      className="absolute opacity-0 w-full h-full cursor-pointer" 
                    />
                    <Database size={18} className={`${syncType === 'full' ? 'text-white' : 'text-zinc-500'} transition-colors`} />
                    <span className={`text-xs font-semibold ${syncType === 'full' ? 'text-white' : 'text-zinc-400'}`}>Full Rebuild</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button 
              onClick={handleStartSync}
              disabled={isSyncing || selectedModules.length === 0}
              className={`w-full mt-8 py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition-all shadow-sm ${
                (isSyncing || selectedModules.length === 0)
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5' 
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              {isSyncing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Syncing in progress...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Start Synchronization
                </>
              )}
            </button>
          </div>

          {/* Kolom Kanan: Live Console */}
          <div className="lg:col-span-2 bg-zinc-900/50 border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                 <Activity className="text-blue-400" size={20} />
                 <h2 className="text-lg font-semibold text-white tracking-tight">Live Synchronization Status</h2>
              </div>
              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                 <span className="relative flex h-2 w-2">
                  {isSyncing && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isSyncing ? 'bg-emerald-500' : 'bg-zinc-500'}`}></span>
                 </span>
                 {isSyncing ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400 font-medium">Vector Embedding Progress</span>
                <span className="text-white font-mono">{progress}%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2.5 border border-white/5 overflow-hidden">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out relative overflow-hidden" 
                  style={{ width: `${progress}%` }}
                >
                   <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            </div>

            {/* Terminal Box */}
            <div ref={terminalRef} className="flex-1 bg-black rounded-lg p-5 border border-white/5 overflow-y-auto h-64 custom-scrollbar relative group">
              <div className="absolute top-3 right-3 text-zinc-700">
                <Terminal size={16} />
              </div>
              <div className="font-mono text-[13px] leading-relaxed space-y-2">
                {logs.length === 0 && !isSyncing && (
                  <p className="text-zinc-600 mt-4 italic">
                    -- Awaiting new synchronization trigger --
                  </p>
                )}
                {logs.map((log, i) => {
                  let colorClass = "text-zinc-300";
                  if (log.includes("Info:")) colorClass = "text-blue-400";
                  if (log.includes("Process:") || log.includes("Processing:")) colorClass = "text-yellow-400";
                  if (log.includes("Success")) colorClass = "text-emerald-400 font-medium";
                  if (log.includes("Error:")) colorClass = "text-red-400 font-medium";

                  // Extract timestamp and message
                  const match = log.match(/^(\[\d{2}:\d{2}:\d{2}\])\s*(.*)$/);
                  if (match) {
                    return (
                      <p key={i} className={colorClass}>
                        <span className="text-zinc-600 mr-3">{match[1]}</span>
                        <span>{match[2]}</span>
                      </p>
                    );
                  }
                  return <p key={i} className={colorClass}>{log}</p>;
                })}
                {isSyncing && (
                  <p className="text-emerald-400 animate-pulse mt-2">
                    <span className="text-zinc-600 mr-3">[{new Date().toLocaleTimeString('en-GB')}]</span>
                    <span className="text-zinc-400 font-semibold">Working:</span> Please wait... 
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: History Table */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white tracking-tight px-1">Synchronization History</h2>
          <div className="bg-zinc-900/30 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-zinc-900/50 border-b border-white/10 text-zinc-400 font-medium">
                  <tr>
                    <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Date</th>
                    <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Type</th>
                    <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Modules</th>
                    <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold">Status</th>
                    <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-semibold text-right">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-none">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-500">No synchronization history found.</td>
                    </tr>
                  ) : history.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-900/40 transition-colors group">
                      <td className="py-3 px-4 text-zinc-300">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 px-4 text-zinc-300 font-medium">{item.type}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1.5 flex-wrap">
                          {item.modules && (item.modules as string[]).map((mod: string, i: number) => (
                            <span key={i} className="text-[10px] uppercase font-semibold bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-white/5">
                              {mod}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 w-max ${
                          item.status === 'Success' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : item.status === 'Failed'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          {item.status === 'Success' ? <Check size={12} strokeWidth={3} /> : item.status === 'Failed' ? <AlertTriangle size={12} strokeWidth={3} /> : <RefreshCw size={12} className="animate-spin" />}
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-400 text-right font-mono text-xs">{item.duration || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      
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
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
}
