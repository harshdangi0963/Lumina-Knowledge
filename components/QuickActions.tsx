import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FolderPlus, UploadCloud, Users, X } from 'lucide-react';
import { cn } from './ui/Aceternity.tsx';

interface QuickActionItem {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  color: string;
}

export const QuickActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions: QuickActionItem[] = [
    { 
      icon: UploadCloud, 
      label: 'Upload Document', 
      onClick: () => console.log('Upload'),
      color: 'text-blue-400'
    },
    { 
      icon: FolderPlus, 
      label: 'Create Collection', 
      onClick: () => console.log('Collection'),
      color: 'text-primary-400'
    },
    { 
      icon: Users, 
      label: 'Invite Operator', 
      onClick: () => console.log('Invite'),
      color: 'text-emerald-400'
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="flex flex-col items-end gap-2 mb-1"
          >
            {actions.map((action, idx) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className="group flex items-center gap-3 pr-1.5 pl-4 py-1.5 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 hover:border-neutral-700 rounded-xl shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-neutral-500 group-hover:text-white transition-colors">
                  {action.label}
                </span>
                <div className={cn(
                  "h-8 w-8 rounded-lg bg-neutral-800 flex items-center justify-center transition-colors group-hover:bg-neutral-700",
                  action.color
                )}>
                  <action.icon size={14} />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-[0_0_20px_rgba(139,92,246,0.25)] group overflow-hidden",
          isOpen 
            ? "bg-neutral-900 border border-neutral-800 rotate-0" 
            : "bg-primary-600 border border-primary-500 hover:scale-105 active:scale-95"
        )}
      >
        {/* Animated Inner Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Main Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative z-10 text-white"
        >
          <Plus size={24} strokeWidth={2.5} />
        </motion.div>

        {/* Pulse Effect for visibility */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl bg-primary-500 animate-ping opacity-10 pointer-events-none" />
        )}
      </button>
    </div>
  );
};