import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_DOCUMENTS } from '../constants.ts';
import { ChevronLeft, FileText, Sparkles, Zap, MessageSquare, BookOpen, Share2, MoreHorizontal, Copy } from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { cn } from '../components/ui/Aceternity.tsx';

export const DocumentReader: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doc = MOCK_DOCUMENTS.find(d => d.id === id) || MOCK_DOCUMENTS[0];
  const [activeTab, setActiveTab] = useState<'insights' | 'chat'>('insights');

  return (
    <div className="flex h-[calc(100vh-120px)] -mt-4 -mx-8 relative">
      {/* Back Button Overlay */}
      <div className="absolute top-8 left-8 z-50">
        <button onClick={() => navigate(-1)} className="p-3 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl text-neutral-400 hover:text-white transition-all shadow-2xl">
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Main Content (The Reader) */}
      <div className="flex-1 overflow-y-auto px-24 py-16 scrollbar-none">
        <div className="max-w-3xl mx-auto">
           <header className="mb-12 border-b border-neutral-900 pb-12">
              <div className="flex items-center gap-4 mb-4">
                 <div className="h-12 w-12 rounded-2xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                    <FileText size={24} />
                 </div>
                 <div>
                    <h1 className="text-4xl font-display font-bold text-white tracking-tight">{doc.title}</h1>
                    <p className="text-neutral-500 mt-1 flex items-center gap-2">
                       <span className="font-medium text-neutral-400">{doc.author}</span>
                       <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                       <span>{doc.updatedAt}</span>
                    </p>
                 </div>
              </div>
              <div className="flex gap-2">
                 {doc.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                      {tag}
                   </span>
                 ))}
              </div>
           </header>

           <article className="prose prose-invert max-w-none prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-lg prose-headings:text-white prose-strong:text-primary-400">
              <div className="whitespace-pre-wrap leading-relaxed">
                {doc.content || "The system is currently parsing this document for deep synthesis. Content will be available shortly."}
              </div>
              
              {/* Fake Content for filling space */}
              <div className="mt-8 p-12 bg-neutral-900/20 border border-neutral-900 rounded-3xl text-center">
                 <BookOpen size={48} className="mx-auto text-neutral-800 mb-4" />
                 <p className="text-neutral-600 italic">End of indexed segment. The remaining sections are available in the physical PDF node.</p>
              </div>
           </article>
        </div>
      </div>

      {/* AI Assistant Sidebar (Real-time Parsing) */}
      <aside className="w-[420px] bg-neutral-950 border-l border-neutral-900 flex flex-col shrink-0">
        <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
           <div className="flex p-1 bg-neutral-900 rounded-xl">
              <button 
                onClick={() => setActiveTab('insights')}
                className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", activeTab === 'insights' ? "bg-neutral-800 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-300")}
              >
                Insights
              </button>
              <button 
                onClick={() => setActiveTab('chat')}
                className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", activeTab === 'chat' ? "bg-neutral-800 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-300")}
              >
                Ask Agent
              </button>
           </div>
           <div className="flex gap-2">
              <button className="p-2 text-neutral-500 hover:text-white transition-colors"><Share2 size={16} /></button>
              <button className="p-2 text-neutral-500 hover:text-white transition-colors"><MoreHorizontal size={16} /></button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
           <AnimatePresence mode="wait">
              {activeTab === 'insights' ? (
                <motion.div 
                  key="insights"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                         <Sparkles size={12} className="text-primary-400" /> Executive Summary
                      </h4>
                      <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 leading-relaxed text-sm text-neutral-300">
                        This document details Lumina's Q3 performance, highlighting a 15% revenue surge and successful APAC expansion. Key takeaway: Enterprise adoption is the primary engine of growth.
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Key Extraction Points</h4>
                      <div className="space-y-3">
                        {[
                          "Revenue grew by 15% YoY.",
                          "APAC region expansion finalized.",
                          "Project Orion launch scheduled for Q4.",
                          "R&D spend up by 5%."
                        ].map((point, i) => (
                          <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-neutral-900/50 transition-colors group cursor-default">
                             <div className="h-5 w-5 rounded bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-[10px] font-bold text-primary-400 shrink-0">0{i+1}</div>
                             <p className="text-sm text-neutral-400 group-hover:text-white transition-colors">{point}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                   <div className="flex-1 space-y-4 mb-4">
                      <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-sm text-neutral-400">
                        I've analyzed this document. Ask me anything about the contents or related market data.
                      </div>
                   </div>
                   <div className="relative">
                      <input 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary-500 outline-none transition-all pr-12"
                        placeholder="Query this document..."
                      />
                      <button className="absolute right-3 top-3 h-8 w-8 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-900/20">
                         <Zap size={14} fill="currentColor" />
                      </button>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </aside>
    </div>
  );
};