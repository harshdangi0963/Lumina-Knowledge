
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Add HistoryEvent to imports to fix type mismatch
import { HistoryEvent } from '../types.ts';
import { MOCK_HISTORY, containerVariants, itemVariants, SMOOTH_TRANSITION } from '../constants.ts';
import { 
  History as HistoryIcon, 
  Clock, 
  RotateCcw, 
  Eye, 
  Edit3, 
  Key, 
  Search, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  ChevronRight,
  Database,
  ShieldCheck,
  Terminal,
  Zap,
  ShieldAlert,
  Wifi,
  Activity
} from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { cn } from '../components/ui/Aceternity.tsx';

export const History: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'edit' | 'access' | 'provision' | 'rollback'>('all');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isRollingBack, setIsRollingBack] = useState<string | null>(null);
  const [showDiff, setShowDiff] = useState(false);

  // New Interactive States
  const [historyList, setHistoryList] = useState(MOCK_HISTORY);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [isLive, setIsLive] = useState(false);

  // Simulated Live Stream
  useEffect(() => {
    let interval: any;
    if (isLive) {
      interval = setInterval(() => {
        // Fix: Explicitly type liveEvents to avoid string-literal type inference issues (Line 54 fix)
        const liveEvents: HistoryEvent[] = [
          { id: `live-${Date.now()}`, type: 'access', user: 'System Agent', target: 'Auth Mesh', timestamp: 'Just now', description: 'Rotated Silo Encryption Keys' },
          { id: `live-${Date.now()+1}`, type: 'access', user: 'External Node', target: 'Cloud Gateway', timestamp: 'Just now', description: 'Verified identity handshake' },
          { id: `live-${Date.now()+2}`, type: 'edit', user: 'AI Synthesizer', target: 'Master Library', timestamp: 'Just now', description: 'Updated semantic vectors' }
        ];
        const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
        setHistoryList(prev => [randomEvent, ...prev.slice(0, 15)]);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const filteredHistory = useMemo(() => {
    return historyList.filter(event => {
      const matchesFilter = filter === 'all' || event.type === filter;
      const matchesSearch = 
        event.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, filter, historyList]);

  const handleVerify = () => {
    setIsVerifying(true);
    setVerificationProgress(0);
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVerifying(false), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'edit': return <Edit3 size={16} />;
      case 'access': return <Eye size={16} />;
      case 'provision': return <Key size={16} />;
      case 'rollback': return <RotateCcw size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'edit': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'access': return 'text-neutral-400 bg-neutral-800 border-neutral-700';
      case 'provision': return 'text-primary-400 bg-primary-500/10 border-primary-500/20';
      case 'rollback': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-neutral-400 bg-neutral-800 border-neutral-700';
    }
  };

  const handleRollback = (id: string) => {
    setIsRollingBack(id);
    setTimeout(() => {
      setIsRollingBack(null);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto min-h-full pb-20 relative">
      
      {/* Verification Overlay */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-neutral-950/90 backdrop-blur-xl flex items-center justify-center p-8"
          >
             <div className="max-w-md w-full text-center space-y-8">
                <div className="relative h-32 w-32 mx-auto">
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-b-2 border-primary-500 rounded-full"
                   />
                   <div className="absolute inset-0 flex items-center justify-center text-primary-400">
                      <ShieldCheck size={48} className="animate-pulse" />
                   </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-display font-bold text-white tracking-tight">Verifying Mesh Integrity</h2>
                  <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                     <motion.div 
                        className="h-full bg-primary-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${verificationProgress}%` }}
                     />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                     <span>Scanning Silos</span>
                     <span>{verificationProgress}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[9px] text-neutral-600 font-black uppercase tracking-[0.2em]">
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                      <CheckCircle2 size={10} className={verificationProgress > 30 ? "text-green-500" : "text-neutral-800"} /> APAC_NODE
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                      <CheckCircle2 size={10} className={verificationProgress > 60 ? "text-green-500" : "text-neutral-800"} /> EMEA_NODE
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                      <CheckCircle2 size={10} className={verificationProgress > 80 ? "text-green-500" : "text-neutral-800"} /> US_VAULT
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                      <CheckCircle2 size={10} className={verificationProgress === 100 ? "text-green-500" : "text-neutral-800"} /> SIGNATURE_X
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-primary-400 shadow-2xl relative">
             <div className="absolute inset-0 bg-primary-500/5 blur-xl rounded-full animate-pulse" />
             <HistoryIcon size={32} className="relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-display font-bold text-white tracking-tight">Temporal Ledger</h1>
              {isLive && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live
                </motion.div>
              )}
            </div>
            <p className="text-neutral-500 mt-1 max-w-md">Cryptographically signed audit trail of all knowledge operations across the Lumina mesh.</p>
          </div>
        </div>
        <div className="flex gap-3">
           <Button 
            variant="secondary" 
            className="rounded-xl border-neutral-800 h-12 active:scale-95"
            onClick={handleVerify}
            disabled={isVerifying}
           >
             <Database size={16} className="mr-2" /> Verify Integrity
           </Button>
           <Button 
            variant={isLive ? "primary" : "glow"} 
            className={cn("rounded-xl h-12 active:scale-95 transition-all", isLive ? "bg-red-600 border-red-500 text-white" : "")}
            onClick={() => setIsLive(!isLive)}
           >
             {isLive ? <X size={16} className="mr-2" /> : <Terminal size={16} className="mr-2" />}
             {isLive ? 'Stop Monitoring' : 'Live Stream'}
           </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-primary-400 transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search by user, target, or operation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-2xl pl-12 pr-4 py-3 text-white outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all backdrop-blur-sm"
          />
        </div>
        <div className="flex bg-neutral-900/80 p-1 rounded-2xl border border-neutral-800 backdrop-blur-md">
           {(['all', 'edit', 'access', 'provision'] as const).map((t) => (
             <button
               key={t}
               onClick={() => setFilter(t)}
               className={cn(
                 "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                 filter === t ? "bg-neutral-800 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-300"
               )}
             >
               {t}
             </button>
           ))}
        </div>
      </div>

      {/* Timeline Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={cn(
          "relative space-y-6 before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-primary-600 before:via-neutral-800 before:to-transparent transition-all",
          isLive && "after:absolute after:inset-0 after:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] after:bg-[length:100%_4px,3px_100%] after:pointer-events-none"
        )}
      >
        {isLive && (
          <div className="flex items-center gap-3 px-6 py-3 bg-primary-500/5 border border-primary-500/10 rounded-2xl mb-4 animate-in fade-in slide-in-from-top-4">
             <Wifi size={14} className="text-primary-400 animate-pulse" />
             <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">MESH_STREAM_ACTIVE // Receiving data packets...</span>
          </div>
        )}

        <AnimatePresence mode="popLayout" initial={false}>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((event) => (
              <motion.div 
                key={event.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative pl-16 group"
              >
                {/* Timeline Node */}
                <div className={cn(
                   "absolute left-0 top-2 h-14 w-14 rounded-2xl flex items-center justify-center border z-10 transition-all group-hover:scale-110 shadow-lg",
                   getEventColor(event.type)
                )}>
                  {getEventIcon(event.type)}
                </div>

                {/* Event Card */}
                <div 
                  onClick={() => setSelectedEvent(event)}
                  className="bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-6 backdrop-blur-sm group-hover:border-primary-500/30 hover:bg-neutral-900/60 transition-all flex items-center justify-between cursor-pointer active:scale-[0.99]"
                >
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">{event.user}</span>
                        <div className="h-1 w-1 bg-neutral-700 rounded-full" />
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                           <Clock size={10} /> {event.timestamp}
                        </span>
                     </div>
                     <p className="text-neutral-400 text-sm leading-relaxed">
                       {event.description} on <span className="text-neutral-200 font-medium group-hover:underline underline-offset-4 decoration-primary-500/50">{event.target}</span>
                     </p>
                  </div>

                  <div className="flex items-center gap-3 ml-6">
                     <AnimatePresence mode="wait">
                       {isRollingBack === event.id ? (
                         <motion.div 
                           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                           className="flex items-center gap-2 text-xs font-bold text-primary-400 uppercase tracking-widest bg-primary-500/10 px-4 py-2 rounded-xl border border-primary-500/20"
                         >
                           <Loader2 size={14} className="animate-spin" /> Verifying State...
                         </motion.div>
                       ) : (
                         <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                           {event.type === 'edit' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={(e) => { e.stopPropagation(); setShowDiff(true); }}
                                className="rounded-xl text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 active:scale-90"
                              >
                                Compare
                              </Button>
                           )}
                           <Button 
                             variant="secondary" 
                             size="sm" 
                             onClick={(e) => { e.stopPropagation(); handleRollback(event.id); }}
                             className="rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-red-400 hover:border-red-500/30 active:scale-90"
                           >
                             <RotateCcw size={12} className="mr-1.5" /> Rollback
                           </Button>
                         </div>
                       )}
                     </AnimatePresence>
                     <ChevronRight size={18} className="text-neutral-700 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-neutral-900/20 rounded-[2rem] border border-dashed border-neutral-800">
               <AlertCircle size={48} className="mx-auto text-neutral-700 mb-4" />
               <p className="text-neutral-500 font-medium">No temporal events match your current query.</p>
               <button onClick={() => {setSearchQuery(''); setFilter('all');}} className="mt-4 text-primary-400 hover:underline text-sm font-bold uppercase tracking-widest">Clear all filters</button>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
               <div className="p-8 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                     <div className={cn("p-4 rounded-2xl border", getEventColor(selectedEvent.type))}>
                        {getEventIcon(selectedEvent.type)}
                     </div>
                     <div>
                        <h2 className="text-2xl font-display font-bold text-white">Event Analysis</h2>
                        <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">ID: {selectedEvent.id.toUpperCase()}</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedEvent(null)} className="p-2 text-neutral-500 hover:text-white transition-colors active:scale-75">
                     <X size={24} />
                  </button>
               </div>

               <div className="p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-1.5">
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Authorized User</p>
                        <p className="text-white font-medium flex items-center gap-2">
                           <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                           {selectedEvent.user}
                        </p>
                     </div>
                     <div className="space-y-1.5">
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Operation Type</p>
                        <p className="text-white font-medium capitalize">{selectedEvent.type}</p>
                     </div>
                     <div className="space-y-1.5">
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Target Node</p>
                        <p className="text-white font-medium flex items-center gap-2">
                           <ExternalLink size={14} className="text-primary-500" />
                           {selectedEvent.target}
                        </p>
                     </div>
                     <div className="space-y-1.5">
                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Timestamp</p>
                        <p className="text-white font-medium">{selectedEvent.timestamp}</p>
                     </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-neutral-800">
                     <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <ShieldCheck size={14} className="text-primary-400" /> Security Metadata
                     </h4>
                     <div className="p-5 rounded-2xl bg-neutral-950/50 border border-neutral-800/60 font-mono text-[11px] space-y-2 text-neutral-400">
                        <p><span className="text-neutral-600">IP ADDRESS:</span> 192.168.1.104</p>
                        <p><span className="text-neutral-600">CLIENT_ID:</span> lumina_v2.0_desktop</p>
                        <p><span className="text-neutral-600">NODE_SIGNATURE:</span> sha256:d82e...3e21</p>
                        <p><span className="text-neutral-600">AUTH_METHOD:</span> lumina-biometric-mesh</p>
                     </div>
                  </div>
               </div>

               <div className="p-8 pt-0 flex gap-4">
                  <Button 
                    variant="secondary" 
                    className="flex-1 h-12 rounded-2xl border-neutral-800 active:scale-95"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Close Log
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1 h-12 rounded-2xl active:scale-95"
                    onClick={() => {
                      handleRollback(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                  >
                    Rollback Node
                  </Button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Snapshot Diff Modal */}
      <AnimatePresence>
        {showDiff && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDiff(false)}
              className="absolute inset-0 bg-neutral-950/90 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-5xl h-[80vh] bg-neutral-900 border border-neutral-800 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
            >
               <div className="p-8 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50 backdrop-blur-md">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white">Snapshot Comparison</h2>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mt-1">Comparing Current Node vs. Temporal State v2.1.0</p>
                  </div>
                  <button onClick={() => setShowDiff(false)} className="p-2 text-neutral-500 hover:text-white transition-colors bg-neutral-800 rounded-xl active:scale-75">
                     <X size={20} />
                  </button>
               </div>

               <div className="flex-1 overflow-hidden flex divide-x divide-neutral-800">
                  <div className="flex-1 overflow-y-auto p-8 scrollbar-none">
                     <h3 className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] mb-4">Previous State (2024-11-01)</h3>
                     <div className="space-y-4 font-mono text-sm leading-relaxed text-neutral-500">
                        <p>EXECUTIVE SUMMARY</p>
                        <p>Lumina Corp has seen moderate growth during the Q3 fiscal period. Total revenue is up 8% YoY.</p>
                        <p className="bg-red-500/10 text-red-400 p-2 rounded border border-red-500/20 line-through decoration-red-900">- Primary growth factors include legacy infrastructure updates.</p>
                        <p>- R&D budget maintained at previous levels.</p>
                     </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 bg-neutral-950/20 scrollbar-none">
                     <h3 className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.2em] mb-4">Current Active State</h3>
                     <div className="space-y-4 font-mono text-sm leading-relaxed text-neutral-200">
                        <p>EXECUTIVE SUMMARY</p>
                        <p>Lumina Corp has seen a <span className="text-green-400 font-bold">significant uptick</span> during the Q3 fiscal period. Total revenue is up <span className="text-green-400 font-bold">15%</span> YoY.</p>
                        <p className="bg-green-500/10 text-green-400 p-2 rounded border border-green-500/20">+ Primary growth factors include our new AI indexing engine.</p>
                        <p>- R&D increased by 5% to support the Project Orion launch.</p>
                     </div>
                  </div>
               </div>

               <div className="p-8 border-t border-neutral-800 flex justify-between items-center bg-neutral-950/30">
                  <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                     <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-red-500" /> -12 lines</span>
                     <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-green-500" /> +24 lines</span>
                  </div>
                  <div className="flex gap-3">
                     <Button variant="secondary" onClick={() => setShowDiff(false)} className="active:scale-95">Discard</Button>
                     <Button variant="primary" onClick={() => setShowDiff(false)} className="active:scale-95">Apply Rollback</Button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
