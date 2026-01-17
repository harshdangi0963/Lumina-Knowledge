import React from 'react';
import { motion } from 'framer-motion';
import { SearchConsole } from '../components/SearchConsole.tsx';
import { QuickActions } from '../components/QuickActions.tsx';
import { Stars } from 'lucide-react';
import { Spotlight, TextGenerateEffect, BackgroundBeams } from '../components/ui/Aceternity.tsx';

export const Home: React.FC = () => {
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
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Intelligence, <br />
            <span className="text-white">perfectly indexed.</span>
          </h1>
          <div className="flex justify-center">
             <TextGenerateEffect words="Synthesize global knowledge silos with universal search and deep AI reasoning." className="text-lg md:text-xl text-neutral-400 font-normal max-w-2xl" />
          </div>
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