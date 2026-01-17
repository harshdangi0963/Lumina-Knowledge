import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_DOCUMENTS, containerVariants, itemVariants } from '../constants';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2, Filter, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Library: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-4">
      
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Document Library</h1>
          <p className="text-neutral-500 mt-1">Manage and monitor all your indexed data sources.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="secondary" size="md">
             <Filter size={16} className="mr-2" /> Filter
           </Button>
           <Button variant="primary" size="md">
             <UploadCloud size={16} className="mr-2" /> Upload
           </Button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="mb-10">
        <div className="border-2 border-dashed border-neutral-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-neutral-900/30 hover:bg-neutral-900/50 hover:border-neutral-700 transition-all cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />
          <div className="h-14 w-14 rounded-2xl bg-neutral-800 border border-neutral-700 text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all shadow-xl">
             <UploadCloud size={28} />
          </div>
          <h3 className="text-lg font-bold text-white">Drag and drop assets here</h3>
          <p className="text-sm text-neutral-500 mt-2 max-w-xs mx-auto leading-relaxed">Indexed instantly using Lumina AI. Supports PDF, DOCX, TXT, and JSON files up to 50MB.</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
        {/* Table Header */}
        <div className="px-8 py-4 grid grid-cols-12 gap-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] border-b border-neutral-800/60 bg-neutral-900/20">
           <div className="col-span-5">Document Name</div>
           <div className="col-span-2">Index Status</div>
           <div className="col-span-2">Type</div>
           <div className="col-span-2">Modified</div>
           <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Table Body */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="divide-y divide-neutral-800/60"
        >
          {MOCK_DOCUMENTS.map((doc) => (
            <motion.div 
              key={doc.id}
              variants={itemVariants}
              className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-neutral-800/30 transition-colors group"
            >
               <div className="col-span-5 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                     <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                     <p className="text-sm font-bold text-neutral-200 truncate group-hover:text-primary-400 transition-colors leading-none mb-1">{doc.title}</p>
                     <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">{doc.size}</p>
                  </div>
               </div>
               
               <div className="col-span-2">
                  {doc.status === 'indexed' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">
                      <CheckCircle2 size={10} className="mr-1.5" /> Indexed
                    </span>
                  )}
                  {doc.status === 'processing' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-500/10 text-primary-400 border border-primary-500/20">
                      <Loader2 size={10} className="mr-1.5 animate-spin" /> Syncing
                    </span>
                  )}
               </div>

               <div className="col-span-2">
                  <span className="text-xs text-neutral-400 font-medium bg-neutral-800/50 px-2 py-1 rounded-md border border-neutral-700/50 capitalize">{doc.type.toLowerCase()}</span>
               </div>

               <div className="col-span-2">
                  <span className="text-xs text-neutral-500 font-medium">{doc.updatedAt}</span>
               </div>

               <div className="col-span-1 text-right">
                  <button className="p-2 text-neutral-600 hover:text-white hover:bg-neutral-700/50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={18} />
                  </button>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};