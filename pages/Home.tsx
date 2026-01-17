
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchConsole } from '../components/SearchConsole.tsx';
import { QuickActions } from '../components/QuickActions.tsx';
import { Stars, Clock } from 'lucide-react';
import { Spotlight, BackgroundBeams } from '../components/ui/Aceternity.tsx';

export const Home: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update every second to ensure the minute change is reflected precisely
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center -mt-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-md mb-8"
        >
           <Stars size={12} className="text-primary-400" />
           <span className="text-xs font-medium text-neutral-300">Lumina Operator Node 2.4 Active</span>
        </motion.div>

        <div className="text-center mb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Added px-4 and softened tracking to prevent gradient clipping */}
            <h1 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tight px-4 mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-500">
              {formatTime(time)}
            </h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 text-neutral-500 font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase"
            >
              <div className="h-[1px] w-8 bg-neutral-800" />
              <Clock size={12} className="text-primary-500" />
              <span>{formatDate(time).replace(',', ' //')}</span>
              <div className="h-[1px] w-8 bg-neutral-800" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-3xl relative z-20"
        >
          <SearchConsole />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-neutral-600 text-sm font-bold tracking-[0.2em] uppercase"
        >
          Press <span className="px-2 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 mx-1">⌘</span> <span className="px-2 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 mx-1">K</span> to trigger search
        </motion.p>
      </div>

      <QuickActions />
    </div>
  );
};
