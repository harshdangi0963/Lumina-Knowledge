
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchConsole } from '../components/SearchConsole.tsx';
import { MOCK_DOCUMENTS, SMOOTH_TRANSITION } from '../constants.ts';
import { FileText, Filter, X, Zap, Search, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { HoverEffect, cn } from '../components/ui/Aceternity.tsx';

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const [showFilters, setShowFilters] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('Any time');

  useEffect(() => {
    if (initialQuery !== activeQuery) {
      setIsScanning(true);
      setActiveQuery(initialQuery);
      const timer = setTimeout(() => setIsScanning(false), 800);
      return () => clearTimeout(timer);
    }
  }, [initialQuery]);

  const filteredResults = useMemo(() => {
    return MOCK_DOCUMENTS.filter(doc => {
      const q = activeQuery.toLowerCase();
      const matchesSearch = 
        doc.title.toLowerCase().includes(q) || 
        (doc.snippet && doc.snippet.toLowerCase().includes(q)) ||
        (doc.content && doc.content.toLowerCase().includes(q)) ||
        (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(q)));
      
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(doc.type);
      
      let matchesTime = true;
      if (selectedTime === 'Past 24 hours') matchesTime = doc.updatedAt.includes('hour') || doc.updatedAt.includes('now');
      if (selectedTime === 'Past week') matchesTime = !doc.updatedAt.includes('month') && !doc.updatedAt.includes('year');
      if (selectedTime === 'Past month') matchesTime = !doc.updatedAt.includes('year');

      return matchesSearch && matchesType && matchesTime;
    });
  }, [activeQuery, selectedTypes, selectedTime]);

  const cardItems = filteredResults.map(doc => ({
    title: doc.title,
    description: doc.snippet || "Deep semantic extraction available in reader mode.",
    icon: <FileText size={24} />,
    id: doc.id
  }));

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 relative min-h-full">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SMOOTH_TRANSITION}
        className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-xl py-4 -mx-4 px-4 mb-8 border-b border-white/5"
      >
        <div className="max-w-5xl mx-auto">
           <SearchConsole compact initialMode="search" />
        </div>
      </motion.div>

      <div className="flex gap-8 relative">
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={SMOOTH_TRANSITION}
              className="hidden lg:block overflow-hidden"
            >
              <div className="w-[280px] pr-8 space-y-8 sticky top-32">
                 <div className="flex items-center justify-between">
                   <h3 className="font-bold text-white text-lg tracking-tight">Refine Node</h3>
                   <button onClick={() => setShowFilters(false)} className="text-neutral-500 hover:text-white transition-all p-1 active:scale-90 bg-white/5 rounded-lg">
                     <X size={18} />
                   </button>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] ml-1">Time Distribution</label>
                    <div className="space-y-2">
                      {['Any time', 'Past 24 hours', 'Past week', 'Past month'].map(label => (
                        <button 
                          key={label} 
                          onClick={() => setSelectedTime(label)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition-all duration-300 active:scale-95",
                            selectedTime === label 
                              ? "bg-white/10 text-white border border-white/10 shadow-lg" 
                              : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5 border border-transparent"
                          )}
                        >
                          <div className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            selectedTime === label ? "bg-primary-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" : "bg-neutral-700"
                          )} />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] ml-1">Asset Protocol</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['PDF', 'DOCX', 'SHEET', 'SLIDE', 'TEXT', 'IMAGE'].map(type => (
                        <button 
                          key={type} 
                          onClick={() => toggleType(type)}
                          className={cn(
                            "px-3 py-2.5 rounded-xl border text-[10px] font-black transition-all duration-300 uppercase tracking-widest active:scale-90",
                            selectedTypes.includes(type) 
                              ? "bg-primary-500/10 border-primary-500 text-primary-400 shadow-[0_0_15px_rgba(139,92,246,0.1)]" 
                              : "bg-white/5 border border-white/5 text-neutral-600 hover:border-white/10 hover:text-neutral-400"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                 </div>

                 <Button 
                   variant="ghost" 
                   size="sm" 
                   className="w-full justify-start text-xs text-neutral-600 hover:text-red-400 active:scale-95"
                   onClick={() => {
                     setSelectedTypes([]);
                     setSelectedTime('Any time');
                   }}
                 >
                   Reset parameters
                 </Button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-4">
                {!showFilters && (
                   <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={SMOOTH_TRANSITION}>
                     <Button variant="secondary" size="sm" onClick={() => setShowFilters(true)} className="rounded-xl border-white/5 active:scale-95">
                       <Filter size={14} className="mr-2" /> Filters
                     </Button>
                   </motion.div>
                )}
                {activeQuery && (
                  <h2 className="text-neutral-500 text-sm font-medium">
                    Found <span className="text-white font-bold">{filteredResults.length}</span> nodes for <span className="text-primary-400 font-bold italic">"{activeQuery}"</span>
                  </h2>
                )}
             </div>
             
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse" />
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">MESH HEALTH OPTIMAL</span>
             </div>
          </div>

          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={SMOOTH_TRANSITION}
                className="py-32 flex flex-col items-center justify-center text-center space-y-6"
              >
                 <div className="relative h-24 w-24">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-[3px] border-primary-500/10 border-t-primary-500 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-primary-400">
                       <Search size={36} strokeWidth={1.5} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">Scanning Knowledge Mesh</h3>
                    <p className="text-neutral-500 text-sm max-w-xs mx-auto">Cross-referencing secure temporal silos for semantic identifiers...</p>
                 </div>
              </motion.div>
            ) : filteredResults.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={SMOOTH_TRANSITION}
              >
                <HoverEffect 
                  items={cardItems} 
                  onSelect={(id) => navigate(`/documents/${id}`)} 
                />
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SMOOTH_TRANSITION}
                className="py-32 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="h-20 w-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-neutral-700 shadow-2xl">
                  <Zap size={36} strokeWidth={1.5} className="animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">Node Not Found</h3>
                  <p className="text-neutral-500 max-w-sm mx-auto">The knowledge mesh yielded zero results. Try adjusting your parameters or verify the node signature.</p>
                </div>
                <Button variant="secondary" size="md" className="rounded-2xl h-12 active:scale-95" onClick={() => navigate('/')}>Return to Command</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
