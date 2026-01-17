import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_HISTORY, containerVariants, itemVariants } from '../constants.ts';
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
  Terminal
} from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { cn } from '../components/ui/Aceternity.tsx';

export const History: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'edit' | 'access' | 'provision' | 'rollback'>('all');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isRollingBack, setIsRollingBack] = useState<string | null>(null);
  const [showDiff, setShowDiff] = useState(false);

  const filteredHistory = useMemo(() => {
    return MOCK_HISTORY.filter(event => {
      const matchesFilter = filter === 'all' || event.type === filter;
      const matchesSearch = 
        event.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, filter]);

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
    // Simulate process
    setTimeout(() => {
      setIsRollingBack(null);
      alert(`Rollback successful for Event ${id}. The node state has been synchronized.`);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto min-h-full pb-20">
      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-primary-400 shadow-2xl relative">
             <div className="absolute inset-0 bg-primary-500/5 blur-xl rounded-full animate-pulse" />
             <HistoryIcon size={32} className="relative z-10" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-white tracking-tight">Temporal Ledger</h1>
            <p className="text-neutral-500 mt-1 max-w-md">Cryptographically signed audit trail of all knowledge operations across the Lumina mesh.</p>
          </div>
        </div>
        <div className="flex gap-3">
           <Button variant="secondary" className="rounded-xl border-neutral-800 h-12">
             <Database size={16} className="mr-2" /> Verify Integrity
           </Button>
           <Button variant="glow" className="rounded-xl h-12">
             <Terminal size={16} className="mr-2" /> Live Stream
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
        className="relative space-y-6 before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-primary-600 before:via-neutral-800 before:to-transparent"
      >
        <AnimatePresence mode="popLayout">
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
                  className="bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-6 backdrop-blur-sm group-hover:border-primary-500/30 hover:bg-neutral-900/60 transition-all flex items-center justify-between cursor-pointer"
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
                                className="rounded-xl text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/5 hover:bg-blue-500/10"
                              >
                                Compare
                              </Button>
                           )}
                           <Button 
                             variant="secondary" 
                             size="sm" 
                             onClick={(e) => { e.stopPropagation(); handleRollback(event.id); }}
                             className="rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-red-400 hover:border-red-500/30"
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

      {/* Event Details Slide-over / Modal */}
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
                  <button onClick={() => setSelectedEvent(null)} className="p-2 text-neutral-500 hover:text-white transition-colors">
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
                    className="flex-1 h-12 rounded-2xl border-neutral-800"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Close Log
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1 h-12 rounded-2xl"
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
                  <button onClick={() => setShowDiff(false)} className="p-2 text-neutral-500 hover:text-white transition-colors bg-neutral-800 rounded-xl">
                     <X size={20} />
                  </button>
               </div>

               <div className="flex-1 overflow-hidden flex divide-x divide-neutral-800">
                  {/* Left: Previous */}
                  <div className="flex-1 overflow-y-auto p-8 scrollbar-none">
                     <h3 className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] mb-4">Previous State (2024-11-01)</h3>
                     <div className="space-y-4 font-mono text-sm leading-relaxed text-neutral-500">
                        <p>EXECUTIVE SUMMARY</p>
                        <p>Lumina Corp has seen moderate growth during the Q3 fiscal period. Total revenue is up 8% YoY.</p>
                        <p className="bg-red-500/10 text-red-400 p-2 rounded border border-red-500/20 line-through decoration-red-900">- Primary growth factors include legacy infrastructure updates.</p>
                        <p>- R&D budget maintained at previous levels.</p>
                     </div>
                  </div>

                  {/* Right: Current */}
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
                     <Button variant="secondary" onClick={() => setShowDiff(false)}>Discard</Button>
                     <Button variant="primary" onClick={() => setShowDiff(false)}>Apply Rollback</Button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};