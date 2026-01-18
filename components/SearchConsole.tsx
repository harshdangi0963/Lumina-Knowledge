
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from './ui/Aceternity.tsx';
import { SMOOTH_TRANSITION } from '../constants.ts';

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
  "Query 'Quantum Computing Paper'...",
];

export const SearchConsole: React.FC<SearchConsoleProps> = ({ 
  initialMode = 'search', 
  compact = false,
  onSearch 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [mode, setMode] = useState<'search' | 'ask'>(initialMode);
  const [query, setQuery] = useState(queryParams.get('q') || '');
  const [isFocused, setIsFocused] = useState(false);
  
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = placeholders[placeholderIndex];
      
      if (!isDeleting) {
        setDisplayedPlaceholder(currentFullText.substring(0, displayedPlaceholder.length + 1));
        setTypingSpeed(70);
        if (displayedPlaceholder === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedPlaceholder(currentFullText.substring(0, displayedPlaceholder.length - 1));
        setTypingSpeed(30);
        if (displayedPlaceholder === "") {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedPlaceholder, isDeleting, placeholderIndex, typingSpeed]);

  const handleModeToggle = (newMode: 'search' | 'ask') => {
    if (newMode === mode) return;
    setMode(newMode);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    if (onSearch) {
      onSearch(query, mode);
    } else {
      const searchPath = mode === 'ask' ? '/ask' : '/search';
      navigate(`${searchPath}?q=${encodeURIComponent(query)}`);
    }
  };

  const TOGGLE_BUTTON_WIDTH = 90; 

  return (
    <div className={cn("relative w-full mx-auto z-50", compact ? 'scale-95' : 'scale-100')}>
      <form onSubmit={handleSubmit} className="relative group">
        <div className={cn(
            "absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-[2.2rem] opacity-20 transition-opacity duration-500 group-hover:opacity-40 blur-md",
            isFocused && (mode === 'ask' ? "via-primary-500 opacity-80" : "via-white/40 opacity-60")
        )} />

        <div className="relative flex items-center bg-white/[0.04] backdrop-blur-3xl rounded-[2.1rem] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[76px]">
          <div className="pl-3 pr-1 flex items-center h-full">
             <div className="flex bg-black/20 p-1 rounded-2xl border border-white/5 relative h-12 items-center">
                <motion.div 
                  initial={false}
                  animate={{ x: mode === 'search' ? 0 : TOGGLE_BUTTON_WIDTH }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: TOGGLE_BUTTON_WIDTH }}
                  className={cn(
                    "absolute top-1 bottom-1 rounded-xl z-0 backdrop-blur-md shadow-lg",
                    mode === 'search' 
                      ? "bg-white/[0.1] border border-white/10" 
                      : "bg-primary-600 border border-primary-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  )}
                />
                
                <button 
                  type="button"
                  onClick={() => handleModeToggle('search')}
                  style={{ width: TOGGLE_BUTTON_WIDTH }}
                  className={cn(
                    "relative z-10 h-full flex items-center justify-center gap-1.5 transition-all duration-300 rounded-xl active:scale-95",
                    mode === 'search' ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  )}
                >
                  <Search size={12} className={cn("transition-transform duration-300", mode === 'search' ? "scale-110" : "scale-100")} />
                  <span className="text-[8px] font-black uppercase tracking-[0.1em] pt-0.5">Search</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => handleModeToggle('ask')}
                  style={{ width: TOGGLE_BUTTON_WIDTH }}
                  className={cn(
                    "relative z-10 h-full flex items-center justify-center gap-1.5 transition-all duration-300 rounded-xl active:scale-95",
                    mode === 'ask' ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  )}
                >
                  <Sparkles size={12} className={cn("transition-transform duration-300", mode === 'ask' ? "scale-110" : "scale-100")} />
                  <span className="text-[8px] font-black uppercase tracking-[0.1em] pt-0.5">Ask AI</span>
                </button>
             </div>
          </div>

          <div className="flex-1 relative h-20 flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-full px-5 text-lg bg-transparent border-none outline-none text-white z-10 relative font-medium placeholder:opacity-0"
              spellCheck={false}
              autoComplete="off"
            />
            
            {!query && (
               <div className="absolute inset-0 flex items-center px-5 pointer-events-none text-neutral-500/80 text-lg truncate font-medium">
                  <motion.span initial={{ opacity: 0.8 }} className="inline-block">
                    {displayedPlaceholder}
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="ml-0.5 w-[2px] h-5 bg-primary-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                  />
               </div>
            )}
          </div>

          <div className="pr-4 flex items-center space-x-2 z-10">
            {query && (
               <button 
                type="button"
                onClick={() => setQuery('')}
                className="p-2 rounded-full text-neutral-500 hover:text-white hover:bg-white/10 transition-all active:scale-75"
               >
                 <X size={18} />
               </button>
            )}
            
            <button 
              type="submit"
              className={cn(
                "flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-500 shadow-2xl active:scale-90",
                query 
                  ? (mode === 'ask' 
                      ? "bg-primary-600 text-white hover:scale-105" 
                      : "bg-white text-black hover:scale-105")
                  : "bg-white/5 text-neutral-600 border border-white/5"
              )}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
