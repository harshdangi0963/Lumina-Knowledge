
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchConsole } from '../components/SearchConsole.tsx';
import { Clock } from 'lucide-react';
import { Spotlight, BackgroundBeams } from '../components/ui/Aceternity.tsx';
import { QuickActions } from '../components/QuickActions.tsx';
import { SMOOTH_TRANSITION } from '../constants.ts';

export const Home: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <div className="h-full flex flex-col relative w-full overflow-hidden items-center justify-center">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <BackgroundBeams />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center -mt-12">
        <div className="text-center mb-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Outfit", sans-serif' }}
              className="text-8xl md:text-[9rem] font-bold text-white tracking-[-0.04em] px-4 mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500 leading-none"
            >
              {formatTime(time)}
            </h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, ...SMOOTH_TRANSITION }}
              className="flex items-center gap-3 text-neutral-500 font-bold tracking-[0.3em] text-[10px] uppercase"
            >
              <div className="h-[1px] w-8 bg-neutral-800" />
              <Clock size={12} className="text-primary-500" />
              <span>{formatDate(time).replace(',', ' //')}</span>
              <div className="h-[1px] w-8 bg-neutral-800" />
            </motion.div>
          </motion.div>
        </div>

        {/* Focused Search Console - Expanded to max-w-4xl */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.4 }}
          className="w-full max-w-4xl relative z-20"
        >
          <SearchConsole />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, ...SMOOTH_TRANSITION }}
          className="mt-12 text-neutral-600 text-[9px] font-black tracking-[0.2em] uppercase"
        >
          Press <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-500 mx-0.5">⌘</span> <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-500 mx-0.5">K</span> to quick search
        </motion.p>
      </div>
      
      {/* Quick Actions only on home */}
      <QuickActions />
    </div>
  );
};
