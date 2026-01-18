
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_COLLECTIONS, MOCK_DOCUMENTS, containerVariants, itemVariants, SMOOTH_TRANSITION } from '../constants.ts';
import { 
  ChevronLeft, Plus, Layers, Grid, FileText, 
  Loader2, Sparkles, Zap, ArrowRight, Share2, 
  MoreHorizontal, Database,
  UploadCloud, Cloud, Link, Monitor, ExternalLink, X, CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { cn } from '../components/ui/Aceternity.tsx';

type UploadSource = 'local' | 'cloud' | 'api';

export const CollectionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSource, setUploadSource] = useState<UploadSource>('local');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const collection = MOCK_COLLECTIONS.find(c => c.id === id) || { name: 'Master Library', description: 'System-wide knowledge assets.' };
  const isMaster = id === 'all';

  // Monitor URL parameters for action triggers
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'upload') {
      setShowUploadModal(true);
    }
  }, [location]);

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => setIsSynthesizing(false), 4000);
  };

  const handleStartUpload = () => {
    setUploadStatus('uploading');
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const resetUpload = () => {
    setShowUploadModal(false);
    setTimeout(() => {
      setUploadStatus('idle');
      setUploadProgress(0);
      // Clean query params on close
      navigate(location.pathname, { replace: true });
    }, 500);
  };

  return (
    <div className="max-w-[1600px] mx-auto flex gap-8 h-full pb-20">
      <div className="flex-1 min-w-0">
        <button onClick={() => navigate('/collections')} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Collections</span>
        </button>

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
            <Button 
              variant="glow" 
              size="md" 
              className="rounded-2xl h-12 shadow-lg active:scale-95"
              onClick={() => setShowUploadModal(true)}
            >
              <Plus size={16} className="mr-2" /> Add Intelligence
            </Button>
          </div>
        </div>

        <div className={cn(
          "bg-neutral-900/40 border border-neutral-800/60 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl transition-all",
          isSynthesizing && "ring-2 ring-primary-500/50 shadow-[0_0_50px_rgba(139,92,246,0.2)]"
        )}>
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
                   <button className="p-1.5 text-neutral-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 active:scale-90">
                     <MoreHorizontal size={18} />
                   </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

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
                  className="w-full rounded-2xl h-11 active:scale-95"
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
                     <div key={i} className="h-9 w-9 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-[10px] font-bold shadow-xl transition-transform hover:translate-y-[-2px] cursor-pointer active:scale-90">U{i}</div>
                   ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex flex-col gap-2">
                 <button className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-800/50 text-neutral-500 hover:text-white transition-all text-xs font-medium active:scale-95">
                    <span className="flex items-center gap-2"><Share2 size={14} /> Distribute Node</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Comprehensive Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={resetUpload}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={SMOOTH_TRANSITION}
              className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-neutral-900/50 backdrop-blur-md">
                 <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                       <UploadCloud size={24} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-display font-bold text-white">Ingest Intelligence</h2>
                       <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Silo: {collection.name}</p>
                    </div>
                 </div>
                 <button onClick={resetUpload} className="p-2 text-neutral-500 hover:text-white transition-colors bg-white/5 rounded-xl active:scale-75">
                    <X size={20} />
                 </button>
              </div>

              {/* Source Tabs */}
              <div className="px-8 pt-6">
                <div className="flex bg-black/40 p-1.5 rounded-[1.5rem] border border-white/5">
                   {[
                     { id: 'local', icon: Monitor, label: 'Local Mesh' },
                     { id: 'cloud', icon: Cloud, label: 'Cloud Drive' },
                     { id: 'api', icon: Link, label: 'Custom API' }
                   ].map((src) => (
                     <button 
                       key={src.id}
                       onClick={() => setUploadSource(src.id as UploadSource)}
                       disabled={uploadStatus === 'uploading'}
                       className={cn(
                         "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95",
                         uploadSource === src.id 
                           ? "bg-white/10 text-white shadow-xl border border-white/10" 
                           : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                       )}
                     >
                       <src.icon size={14} />
                       {src.label}
                     </button>
                   ))}
                </div>
              </div>

              {/* Source Content */}
              <div className="p-8 flex-1">
                {uploadStatus === 'idle' && (
                  <div className="h-full">
                    {uploadSource === 'local' && (
                      <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-white/[0.02] hover:bg-white/[0.04] transition-all group cursor-pointer active:scale-[0.99]" onClick={handleStartUpload}>
                         <div className="h-16 w-16 rounded-2xl bg-neutral-800 border border-white/10 flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform shadow-2xl">
                            <Monitor size={32} />
                         </div>
                         <h3 className="text-lg font-bold text-white">Drop local assets here</h3>
                         <p className="text-sm text-neutral-500 mt-2 max-w-xs">Cross-reference local documents and mount them to the intelligence mesh.</p>
                      </div>
                    )}

                    {uploadSource === 'cloud' && (
                      <div className="grid grid-cols-2 gap-4 h-full">
                         {[
                           { name: 'Google Drive', icon: ExternalLink, color: 'bg-blue-500/10 text-blue-400' },
                           { name: 'OneDrive', icon: ExternalLink, color: 'bg-sky-500/10 text-sky-400' },
                           { name: 'Dropbox', icon: ExternalLink, color: 'bg-indigo-500/10 text-indigo-400' },
                           { name: 'AWS S3 Bucket', icon: ExternalLink, color: 'bg-orange-500/10 text-orange-400' }
                         ].map(drive => (
                           <button key={drive.name} onClick={handleStartUpload} className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.06] transition-all group active:scale-95">
                              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", drive.color)}>
                                 <Cloud size={24} />
                              </div>
                              <div className="text-left">
                                 <p className="text-sm font-bold text-white">{drive.name}</p>
                                 <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">Connect Silo</p>
                              </div>
                              <drive.icon size={14} className="ml-auto text-neutral-600 group-hover:text-white transition-colors" />
                           </button>
                         ))}
                      </div>
                    )}

                    {uploadSource === 'api' && (
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Ingestion Endpoint URL</label>
                            <div className="relative">
                               <input type="text" className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary-500 outline-none transition-all placeholder:text-neutral-700" placeholder="https://api.your-mesh.ai/v1/extract" />
                               <Link size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-600" />
                            </div>
                         </div>
                         <div className="p-5 rounded-2xl bg-primary-500/5 border border-primary-500/10 text-xs text-neutral-400 leading-relaxed">
                            Connect a custom intelligence stream. Lumina will poll this endpoint for structured data ingestion every 60 seconds.
                         </div>
                         <Button variant="glow" className="w-full h-12 rounded-2xl active:scale-95" onClick={handleStartUpload}>Initiate Stream Connection</Button>
                      </div>
                    )}
                  </div>
                )}

                {uploadStatus === 'uploading' && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12">
                     <div className="relative h-32 w-32 mb-8">
                        <svg className="h-full w-full rotate-[-90deg]">
                           <circle cx="64" cy="64" r="60" className="fill-none stroke-white/5 stroke-[8]" />
                           <motion.circle 
                             cx="64" cy="64" r="60" 
                             className="fill-none stroke-primary-500 stroke-[8]" 
                             strokeDasharray="377" 
                             strokeDashoffset={377 - (377 * uploadProgress / 100)} 
                           />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="text-2xl font-bold text-white">{uploadProgress}%</span>
                        </div>
                     </div>
                     <h3 className="text-xl font-display font-bold text-white mb-2">Indexing Node...</h3>
                     <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">Generating semantic vector embeddings and validating cryptographic signatures.</p>
                  </div>
                )}

                {uploadStatus === 'success' && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12"
                  >
                     <div className="h-24 w-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                        <CheckCircle2 size={48} />
                     </div>
                     <h3 className="text-2xl font-display font-bold text-white mb-2">Ingestion Complete</h3>
                     <p className="text-neutral-500 text-sm leading-relaxed mb-10">Asset successfully parsed and distributed to the <strong>{collection.name}</strong> intelligence silo.</p>
                     <Button variant="secondary" className="px-8 h-12 rounded-2xl active:scale-95" onClick={resetUpload}>Done</Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
