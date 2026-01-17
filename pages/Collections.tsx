import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_COLLECTIONS, containerVariants, itemVariants } from '../constants.ts';
import { 
  Plus, Users, Lock, MoreVertical, Layers, Grid, Zap, 
  Trash2, Copy, Edit2, Archive, Loader2, CheckCircle2, 
  ShieldCheck, Database, LayoutGrid, List
} from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { cn } from '../components/ui/Aceternity.tsx';

export const Collections: React.FC = () => {
  const navigate = useNavigate();
  const [showProvisionModal, setShowProvisionModal] = useState(false);
  const [provisionStep, setProvisionStep] = useState<'form' | 'loading' | 'success'>('form');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleProvision = () => {
    setProvisionStep('loading');
    setTimeout(() => setProvisionStep('success'), 3000);
    setTimeout(() => {
      setShowProvisionModal(false);
      setProvisionStep('form');
    }, 5000);
  };

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto min-h-full pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">Intelligence Silos</h1>
          <p className="text-neutral-500 mt-2 text-lg">Curate and govern your collective knowledge nodes.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-neutral-900/80 p-1 rounded-xl border border-neutral-800 mr-2">
             <button onClick={() => setViewMode('grid')} className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300")}>
                <LayoutGrid size={18} />
             </button>
             <button onClick={() => setViewMode('list')} className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300")}>
                <List size={18} />
             </button>
          </div>
          <Button variant="glow" size="lg" className="rounded-2xl h-12" onClick={() => setShowProvisionModal(true)}>
            <Plus size={20} className="mr-2" /> Provision Node
          </Button>
        </div>
      </div>

      {/* Collections Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={cn(
          "grid gap-6",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}
      >
        {/* Master Library Card */}
        <motion.div
          variants={itemVariants}
          onClick={() => navigate('/collections/all')}
          className="group relative h-64 bg-gradient-to-br from-primary-600/20 to-indigo-600/20 backdrop-blur-xl rounded-3xl border border-primary-500/30 hover:border-primary-500 transition-all cursor-pointer overflow-hidden flex flex-col justify-center items-center shadow-2xl shadow-primary-900/10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Layers size={48} className="text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-2xl font-bold text-white tracking-tight">Master Library</h3>
          <p className="text-primary-300/60 text-sm mt-2 font-medium">System-wide knowledge mesh</p>
          <div className="absolute bottom-6 flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-[10px] font-bold text-primary-300 uppercase tracking-widest">Active Sink</span>
          </div>
        </motion.div>

        {MOCK_COLLECTIONS.map((collection) => (
          <motion.div
            key={collection.id}
            variants={itemVariants}
            onClick={() => navigate(`/collections/${collection.id}`)}
            className="group relative bg-neutral-900/50 backdrop-blur-sm rounded-3xl border border-neutral-800 hover:border-neutral-700 transition-all overflow-hidden flex flex-col shadow-xl cursor-pointer"
          >
            {/* Action Menu Trigger */}
            <div className="absolute top-4 right-4 z-20">
               <button 
                onClick={(e) => toggleMenu(e, collection.id)}
                className="p-2 bg-neutral-950/60 backdrop-blur-md rounded-xl border border-neutral-800/50 text-neutral-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
               >
                 <MoreVertical size={16} />
               </button>
               <AnimatePresence>
                 {activeMenu === collection.id && (
                   <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5"
                   >
                      {[
                        { label: 'Rename Node', icon: Edit2 },
                        { label: 'Duplicate Silo', icon: Copy },
                        { label: 'Archive Data', icon: Archive },
                        { label: 'Decommission', icon: Trash2, color: 'text-red-400 hover:bg-red-500/10' }
                      ].map((item, i) => (
                        <button 
                          key={i}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors",
                            item.color || "text-neutral-400 hover:text-white hover:bg-neutral-800"
                          )}
                        >
                          <item.icon size={14} />
                          {item.label}
                        </button>
                      ))}
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            <div className="h-32 w-full relative overflow-hidden bg-neutral-800">
              <img 
                src={collection.coverImage} 
                alt={collection.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
            </div>

            <div className="p-6 flex-1 relative">
              <div className="flex items-center gap-2 mb-2">
                 <h3 className="font-bold text-white text-xl group-hover:text-primary-400 transition-colors">{collection.name}</h3>
                 {collection.visibility === 'Private' && <Lock size={12} className="text-neutral-600" />}
              </div>
              <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-6">{collection.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <div className="flex -space-x-1.5">
                   {[1,2].map(i => (
                     <div key={i} className="h-6 w-6 rounded-full border-2 border-neutral-900 bg-neutral-800 text-[8px] font-bold flex items-center justify-center">U{i}</div>
                   ))}
                </div>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{collection.itemCount} Indexed Assets</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Provision Node Modal */}
      <AnimatePresence>
        {showProvisionModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => provisionStep !== 'loading' && setShowProvisionModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {provisionStep === 'form' && (
                <div className="p-8">
                  <div className="h-14 w-14 rounded-2xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-6">
                    <Database size={28} />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">Initialize Knowledge Node</h2>
                  <p className="text-neutral-500 text-sm mb-8 leading-relaxed">Define the parameters for your new secure knowledge silo. This node will be cryptographically isolated.</p>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Node Identifier</label>
                      <input type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3.5 text-white focus:border-primary-500 outline-none transition-all placeholder:text-neutral-700" placeholder="e.g. CORE_LEGAL_VAULT" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Governance Level</label>
                      <select className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3.5 text-white focus:border-primary-500 outline-none transition-all appearance-none cursor-pointer">
                        <option>Team Restricted (High Security)</option>
                        <option>Department Wide</option>
                        <option>Public Intelligence</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-10">
                    <Button variant="secondary" className="flex-1 rounded-2xl h-12" onClick={() => setShowProvisionModal(false)}>Cancel</Button>
                    <Button variant="primary" className="flex-1 rounded-2xl h-12" onClick={handleProvision}>Start Provisioning</Button>
                  </div>
                </div>
              )}

              {provisionStep === 'loading' && (
                <div className="p-12 flex flex-col items-center text-center">
                  <div className="relative h-24 w-24 mb-8">
                    <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full" />
                    <motion.div 
                      className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-primary-400">
                      <Zap size={32} fill="currentColor" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">Provisioning Node...</h2>
                  <p className="text-neutral-500 text-sm max-w-[240px]">Generating unique cryptographic keys and mounting storage cluster.</p>
                  
                  <div className="w-full h-1 bg-neutral-800 rounded-full mt-10 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                      className="h-full bg-primary-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    />
                  </div>
                </div>
              )}

              {provisionStep === 'success' && (
                <div className="p-12 flex flex-col items-center text-center">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-20 w-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-8"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">Node Active</h2>
                  <p className="text-neutral-500 text-sm">The knowledge silo has been successfully provisioned and indexed into the mesh.</p>
                  <div className="mt-10 p-4 bg-neutral-950 border border-neutral-800 rounded-2xl font-mono text-[10px] text-neutral-500 w-full text-left">
                    SIGNATURE: lumina_node_842x_signed
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};