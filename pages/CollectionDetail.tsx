
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_COLLECTIONS, MOCK_DOCUMENTS, containerVariants, itemVariants } from '../constants';
import { 
  ChevronLeft, Filter, Plus, Layers, Grid, FileText, 
  Loader2, Sparkles, Zap, ArrowRight, Share2, 
  Trash2, Move, Download, MoreHorizontal, Database
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../components/ui/Aceternity';

export const CollectionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeAssetAction, setActiveAssetAction] = useState<string | null>(null);
  
  const collection = MOCK_COLLECTIONS.find(c => c.id === id) || { name: 'Master Library', description: 'System-wide knowledge assets.' };
  const isMaster = id === 'all';

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => setIsSynthesizing(false), 4000);
  };

  return (
    <div className="max-w-[1600px] mx-auto flex gap-8 h-full pb-20">
      <div className="flex-1 min-w-0">
        {/* Navigation */}
        <button onClick={() => navigate('/collections')} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Collections</span>
        </button>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="flex items-center gap-6">
            <div className={cn(
              "h-24 w-24 rounded-[2rem] flex items-center justify-center shadow-2xl relative group",
              isMaster ? "bg-primary-600 text-white" : "bg-neutral-800 border border-neutral-700"
            )}>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
              {isMaster ? <Layers size={40} className="relative z-10" /> : <Grid size={40} className="relative z-10" />}
            </div>
            <div>
              <div className="flex items-center gap-3">
                 <h1 className="text-4xl font-display font-bold text-white tracking-tight">{collection.name}</h1>
                 {!isMaster && <Database size={18} className="text-neutral-600" />}
              </div>
              <p className="text-neutral-500 mt-2 text-lg max-w-xl leading-relaxed">{collection.description}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="md" className="rounded-xl h-12"><Filter size={16} className="mr-2" /> Refine</Button>
            <Button variant="primary" size="md" className="rounded-xl h-12 shadow-lg"><Plus size={16} className="mr-2" /> Add Intelligence</Button>
          </div>
        </div>

        {/* Assets Table Container */}
        <div className={cn(
          "bg-neutral-900/40 border border-neutral-800/60 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl transition-all",
          isSynthesizing && "ring-2 ring-primary-500/50 shadow-[0_0_50px_rgba(139,92,246,0.2)]"
        )}>
          {/* Progress Bar for Synthesis */}
          <AnimatePresence>
            {isSynthesizing && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 4 }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full bg-primary-500/20"
              >
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4 }}
                  className="h-full bg-primary-500"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="px-8 py-5 grid grid-cols-12 gap-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] border-b border-neutral-800/60 bg-neutral-950/20">
            <div className="col-span-6">Resource Identifier</div>
            <div className="col-span-2 text-center">Sync State</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-2 text-right">Size</div>
          </div>
          
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="divide-y divide-neutral-800/60">
            {MOCK_DOCUMENTS.map((doc) => (
              <motion.div 
                key={doc.id}
                variants={itemVariants}
                onClick={() => navigate(`/documents/${doc.id}`)}
                className={cn(
                  "grid grid-cols-12 gap-4 px-8 py-5 items-center transition-all group cursor-pointer relative",
                  "hover:bg-neutral-800/50 border-l-4 border-transparent hover:border-primary-500",
                  isSynthesizing && "animate-pulse"
                )}
              >
                <div className="col-span-6 flex items-center gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:bg-neutral-700 transition-all shadow-lg">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-neutral-200 truncate group-hover:text-primary-400 transition-colors mb-0.5">{doc.title}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider">{doc.type}</span>
                       <span className="h-1 w-1 rounded-full bg-neutral-800" />
                       <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider">{doc.author}</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex justify-center">
                  <span className={cn(
                    "inline-flex items-center px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border",
                    doc.status === 'indexed' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-primary-500/10 text-primary-400 border-primary-500/20"
                  )}>
                    {doc.status === 'indexed' ? 'Verified' : <><Loader2 size={10} className="mr-1.5 animate-spin" /> Indexing</>}
                  </span>
                </div>

                <div className="col-span-2 text-xs text-neutral-500 font-medium group-hover:text-neutral-300 transition-colors">{doc.updatedAt}</div>
                
                <div className="col-span-2 text-right flex items-center justify-end gap-3">
                   <span className="text-xs text-neutral-600 font-bold tracking-tighter group-hover:text-neutral-400 transition-colors">{doc.size}</span>
                   <button 
                    onClick={(e) => { e.stopPropagation(); setActiveAssetAction(activeAssetAction === doc.id ? null : doc.id); }}
                    className="p-1.5 text-neutral-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                   >
                     <MoreHorizontal size={18} />
                   </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Intelligence Dashboard Sidebar */}
      <aside className="w-80 shrink-0 hidden xl:block">
        <div className="sticky top-8 space-y-6">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-[2.5rem] p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2.5 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400">
                <Sparkles size={20} />
              </div>
              <h3 className="font-display font-bold text-white text-lg">Silo Synthesis</h3>
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="p-5 rounded-[1.5rem] bg-neutral-950/50 border border-neutral-800/60 shadow-inner">
                <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-6">
                  Extract deep patterns and cross-reference identifiers across this knowledge node.
                </p>
                <Button 
                  variant={isSynthesizing ? "secondary" : "glow"} 
                  size="md" 
                  loading={isSynthesizing}
                  onClick={handleSynthesize}
                  className="w-full rounded-2xl h-11"
                >
                  <Zap size={14} className="mr-2" fill="currentColor" /> {isSynthesizing ? 'Parsing Mesh...' : 'Synthesize Now'}
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] flex items-center justify-between">
                  Identity Mesh <span>3 Online</span>
                </h4>
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="h-9 w-9 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-[10px] font-bold shadow-xl transition-transform hover:translate-y-[-2px] cursor-pointer">U{i}</div>
                   ))}
                   <div className="h-9 w-9 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-500 shadow-xl">+4</div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex flex-col gap-2">
                 <button className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-800/50 text-neutral-500 hover:text-white transition-all text-xs font-medium">
                    <span className="flex items-center gap-2"><Share2 size={14} /> Distribute Node</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                 </button>
                 <button className="flex items-center justify-between p-3 rounded-2xl hover:bg-red-500/5 text-neutral-500 hover:text-red-400 transition-all text-xs font-medium">
                    <span className="flex items-center gap-2"><Trash2 size={14} /> Decommission Silo</span>
                 </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
