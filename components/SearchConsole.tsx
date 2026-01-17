
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from './ui/Aceternity';

interface SearchConsoleProps {
  initialMode?: 'search' | 'ask';
  compact?: boolean;
  onSearch?: (query: string, mode: 'search' | 'ask') => void;
}

const placeholders = [
  "Search for 'Q3 Financial Reports'...",
  "Ask 'What is the project timeline?'...",
  "Find 'Marketing Strategy 2024'...",
  "Summarize 'Engineering Guidelines'...",
];

export const SearchConsole: React.FC<SearchConsoleProps> = ({ 
  initialMode = 'search', 
  compact = false,
  onSearch 
}) => {
  const [mode, setMode] = useState<'search' | 'ask'>(initialMode);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    if (onSearch) {
      onSearch(query, mode);
    } else {
      if (mode === 'ask') {
        navigate('/ask');
      } else {
        navigate('/search');
      }
    }
  };

  // Compact Switcher Constants
  const TOGGLE_BUTTON_WIDTH = 104; 

  return (
    <div className={cn("relative w-full max-w-6xl mx-auto transition-all duration-500 z-50", compact ? 'scale-95' : 'scale-100')}>
      
      {/* Integrated Search Bar */}
      <form onSubmit={handleSubmit} className="relative group">
        {/* Animated Border Gradient */}
        <div className={cn(
            "absolute -inset-0.5 bg-gradient-to-r from-transparent via-neutral-700 to-transparent rounded-[2.2rem] opacity-20 transition duration-500 group-hover:opacity-40 blur",
            isFocused && (mode === 'ask' ? "via-primary-500 opacity-80" : "via-neutral-400 opacity-60")
        )} />

        <div className="relative flex items-center bg-neutral-950/90 rounded-[2.1rem] border border-neutral-800 transition-all duration-300 overflow-hidden shadow-2xl min-h-[84px] backdrop-blur-2xl">
          
          {/* Internal Mode Switcher - Compact Fixed Width */}
          <div className="pl-4 pr-1 flex items-center h-full">
             <div className="flex bg-neutral-900/40 p-1 rounded-2xl border border-neutral-800/40 relative overflow-hidden h-14 items-center">
                {/* Sliding Background (The Glass Pill) - Optimized Spring */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    x: mode === 'search' ? 0 : TOGGLE_BUTTON_WIDTH,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 40,
                    mass: 0.8
                  }}
                  style={{ width: TOGGLE_BUTTON_WIDTH }}
                  className={cn(
                    "absolute top-1 bottom-1 rounded-xl z-0 transition-colors duration-300 backdrop-blur-md",
                    mode === 'search' 
                      ? "bg-neutral-800 border border-neutral-700 shadow-inner" 
                      : "bg-primary-600 border border-primary-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  )}
                />
                
                <button 
                  type="button"
                  onClick={() => setMode('search')}
                  style={{ width: TOGGLE_BUTTON_WIDTH }}
                  className={cn(
                    "relative z-10 h-full flex items-center justify-center gap-2 transition-all duration-300 rounded-xl",
                    mode === 'search' ? "text-white" : "text-neutral-500 hover:text-neutral-400"
                  )}
                >
                  <Search size={14} className={cn("transition-transform duration-300", mode === 'search' ? "scale-110" : "scale-100")} />
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] pt-0.5">Search</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => setMode('ask')}
                  style={{ width: TOGGLE_BUTTON_WIDTH }}
                  className={cn(
                    "relative z-10 h-full flex items-center justify-center gap-2 transition-all duration-300 rounded-xl",
                    mode === 'ask' ? "text-white" : "text-neutral-500 hover:text-neutral-400"
                  )}
                >
                  <Sparkles size={14} className={cn("transition-transform duration-300", mode === 'ask' ? "scale-110" : "scale-100")} />
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] pt-0.5">Ask AI</span>
                </button>
             </div>
          </div>

          {/* Input Field Area - Maximized Space */}
          <div className="flex-1 relative h-20 flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-full px-6 text-xl bg-transparent border-none outline-none text-white z-10 relative font-medium placeholder:opacity-0"
              spellCheck={false}
              autoComplete="off"
            />
            
            <AnimatePresence mode="wait">
              {!query && (
                 <motion.div
                    key={placeholderIndex}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 flex items-center px-6 pointer-events-none text-neutral-600 text-xl truncate font-medium"
                 >
                    {placeholders[placeholderIndex]}
                 </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trailing Actions */}
          <div className="pr-6 flex items-center space-x-4 z-10">
            {query && (
               <button 
                type="button"
                onClick={() => setQuery('')}
                className="p-2 rounded-full text-neutral-600 hover:text-white hover:bg-neutral-800 transition-all active:scale-90"
               >
                 <X size={20} />
               </button>
            )}
            
            <div className="h-10 w-[1.5px] bg-neutral-800/40 mx-1 hidden sm:block"></div>
            
            <button 
              type="submit"
              className={cn(
                "hidden sm:flex items-center justify-center h-12 w-12 rounded-2xl transition-all duration-500 shadow-2xl",
                query 
                  ? (mode === 'ask' 
                      ? "bg-primary-600 text-white hover:scale-105 hover:shadow-primary-500/30" 
                      : "bg-white text-black hover:scale-105 hover:shadow-white/10")
                  : "bg-neutral-900 text-neutral-700 border border-neutral-800/50"
              )}
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
