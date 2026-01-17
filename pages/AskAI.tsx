import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SearchConsole } from '../components/SearchConsole.tsx';
import { MOCK_CHAT_HISTORY, MOCK_DOCUMENTS } from '../constants.ts';
import { User, Sparkles, FileText, ThumbsUp, ThumbsDown, Copy, RefreshCw, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { cn, TextGenerateEffect } from '../components/ui/Aceternity.tsx';

export const AskAI: React.FC = () => {
  const [messages, setMessages] = useState(MOCK_CHAT_HISTORY);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSearch = (query: string, mode: 'search' | 'ask') => {
    const newUserMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: query,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const newAiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: `Based on your documents, regarding "${query}", here is what I found. The quarterly revenue analysis indicates a 15% year-over-year growth. This was primarily driven by the expansion in the enterprise sector as detailed in the 'Q3 Financial Overview'.`,
        sources: [MOCK_DOCUMENTS[0], MOCK_DOCUMENTS[1]],
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto px-4 lg:px-8">
      
      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-8 space-y-8 pr-2 scroll-smooth">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
             {msg.role === 'assistant' && (
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.5)] mt-1">
                  <Zap size={18} fill="white" />
                </div>
             )}

             <div className={`flex flex-col max-w-3xl ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={cn(
                    "px-6 py-5 rounded-3xl text-base leading-relaxed border shadow-sm backdrop-blur-sm",
                    msg.role === 'user' 
                    ? "bg-neutral-800 text-white border-neutral-700 rounded-tr-sm" 
                    : "bg-neutral-900/50 text-neutral-200 border-neutral-800 rounded-tl-sm"
                )}>
                   <p>{msg.content}</p>
                </div>

                {/* Sources Section for AI */}
                {msg.role === 'assistant' && msg.sources && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 w-full"
                  >
                     <div className="flex items-center gap-2 mb-3">
                         <div className="h-[1px] w-8 bg-neutral-800" />
                         <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Sources</p>
                     </div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {msg.sources.map(source => (
                         <div key={source.id} className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-primary-500/50 hover:bg-neutral-800 transition-all cursor-pointer group">
                            <div className="h-8 w-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:bg-primary-600 transition-colors">
                              <FileText size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                               <p className="text-sm font-medium text-neutral-200 truncate group-hover:text-white">{source.title}</p>
                               <p className="text-xs text-neutral-500">Node Sync • {source.updatedAt}</p>
                            </div>
                         </div>
                       ))}
                     </div>

                     {/* Action Buttons */}
                     <div className="flex items-center gap-2 mt-4">
                        <Button variant="ghost" size="sm" className="h-8 text-neutral-500 hover:text-white">
                          <Copy size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-neutral-500 hover:text-white">
                          <RefreshCw size={14} />
                        </Button>
                        <div className="flex-1"></div>
                        <Button variant="ghost" size="sm" className="h-8 text-neutral-500 hover:text-white">
                          <ThumbsUp size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-neutral-500 hover:text-white">
                          <ThumbsDown size={14} />
                        </Button>
                     </div>
                  </motion.div>
                )}
             </div>

             {msg.role === 'user' && (
               <div className="h-10 w-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 shrink-0 mt-1 border border-neutral-700">
                 <User size={18} />
               </div>
             )}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
               <Zap size={18} fill="white" />
            </div>
            <div className="bg-neutral-900/50 px-6 py-4 rounded-3xl rounded-tl-sm border border-neutral-800 flex items-center gap-1.5 h-14">
               <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
               <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
               <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="pb-8 pt-4">
        <SearchConsole compact initialMode="ask" onSearch={(q, mode) => handleSearch(q, mode)} />
        <div className="text-center mt-3">
          <p className="text-xs text-neutral-600">Lumina AI models can fluctuate. Verify mission-critical data.</p>
        </div>
      </div>

    </div>
  );
};