import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchConsole } from '../components/SearchConsole.tsx';
import { MOCK_DOCUMENTS } from '../constants.ts';
import { FileText, Filter, X, ChevronDown, Calendar, Tag, File } from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { HoverEffect, cn } from '../components/ui/Aceternity.tsx';

export const SearchResults: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Transform MOCK_DOCUMENTS to HoverEffect format
  const cardItems = MOCK_DOCUMENTS.map(doc => ({
    title: doc.title,
    description: doc.snippet || "No preview available",
    icon: <FileText size={24} />,
    id: doc.id
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      {/* Sticky Header with Search */}
      <div className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-xl py-4 -mx-4 px-4 mb-8 border-b border-neutral-800">
        <div className="max-w-3xl mx-auto">
           <SearchConsole compact initialMode="search" />
        </div>
      </div>

      <div className="flex gap-8 relative">
        {/* Filters Sidebar (Collapsible) */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:block overflow-hidden"
            >
              <div className="w-[280px] pr-6 space-y-8 sticky top-32">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-white text-lg">Refine Results</h3>
                   <button onClick={() => setShowFilters(false)} className="text-neutral-500 hover:text-white transition-colors">
                     <X size={18} />
                   </button>
                 </div>

                 {/* Date Filter */}
                 <div className="space-y-3">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Timeframe</label>
                    <div className="space-y-2">
                      {['Any time', 'Past 24 hours', 'Past week', 'Past month'].map(label => (
                        <label key={label} className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white cursor-pointer group">
                          <div className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center group-hover:border-primary-500">
                             <div className="w-2 h-2 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                 </div>

                 {/* Type Filter */}
                 <div className="space-y-3">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Source Type</label>
                    <div className="space-y-2">
                      {['PDF', 'Documents', 'Spreadsheets', 'Slides'].map(label => (
                        <label key={label} className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white cursor-pointer group">
                           <div className="w-4 h-4 rounded border border-neutral-700 flex items-center justify-center group-hover:border-primary-500">
                              {/* Checkbox logic here */}
                           </div>
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                 </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Results Area */}
        <div className="flex-1 min-w-0">
          
          {/* Controls */}
          <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-2">
                {!showFilters && (
                   <Button variant="secondary" size="sm" onClick={() => setShowFilters(true)}>
                     <Filter size={14} className="mr-2" /> Filters
                   </Button>
                )}
                <div className="flex flex-wrap gap-2">
                   {['Financials', 'PDF'].map(tag => (
                     <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer">
                       {tag} <X size={12} className="ml-2 hover:text-white" />
                     </span>
                   ))}
                   <button className="text-xs text-primary-400 hover:text-primary-300 px-2 font-medium">Clear all</button>
                </div>
             </div>
             
             <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span>12 results found</span>
             </div>
          </div>

          {/* Aceternity Hover Effect Grid */}
          <HoverEffect items={cardItems} />

        </div>
      </div>
    </div>
  );
};