
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchConsole } from '../components/SearchConsole.tsx';
import { MOCK_CHAT_HISTORY, MOCK_DOCUMENTS, SMOOTH_TRANSITION } from '../constants.ts';
import { User, Sparkles, FileText, ThumbsUp, ThumbsDown, Copy, RefreshCw, Zap, Trash2, ChevronLeft, Send } from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { cn } from '../components/ui/Aceternity.tsx';

export const AskAI: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const [messages, setMessages] = useState(MOCK_CHAT_HISTORY);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-search if coming from home with a query
  useEffect(() => {
    if (initialQuery && messages.length <= 2) {
       handleSearch(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const generateMockResponse = (query: string) => {
    const q = query.toLowerCase();
    
    // Find relevant documents based on keywords
    const relevantDocs = MOCK_DOCUMENTS.filter(d => 
      d.title.toLowerCase().includes(q) || 
      (d.tags && d.tags.some(t => t.toLowerCase().includes(q))) ||
      (d.snippet && d.snippet.toLowerCase().includes(q))
    );

    if (relevantDocs.length > 0) {
      const topDoc = relevantDocs[0];
      return {
        content: `I've synthesized information from the "${topDoc.title}" node. ${topDoc.snippet || "This intelligence node contains cross-departmental data regarding " + topDoc.tags.join(", ") + "."} Based on my analysis, this correlates directly with your query about ${query}. Would you like me to extract more specific metrics?`,
        sources: relevantDocs.slice(0, 2)
      };
    }

    if (q.includes("hi") || q.includes("hello")) {
      return {
        content: "Hello. I am the Lumina Intelligence Operator. I have access to your entire knowledge mesh. What specific node or report shall we analyze today?",
        sources: []
      };
    }

    return {
      content: `I've performed a deep scan of the knowledge mesh for "${query}". While I found no direct matches in the primary silos, I can infer from general organizational patterns that this may relate to upcoming strategic initiatives. Should I initiate a broader temporal scan?`,
      sources: []
    };
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    const newUserMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    // Simulated network latency & AI processing
    setTimeout(() => {
      const response = generateMockResponse(query);
      const newAiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: response.content,
        sources: response.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={SMOOTH_TRANSITION}
      className="h-full flex flex-col max-w-5xl mx-auto px-4 lg:px-8"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between mb-2 shrink-0 border-b border-white/5 pb-4 pt-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 text-neutral-500 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/10"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary-600 shadow-[0_0_15px_rgba(139,92,246,0.3)] text-white">
              <Zap size={18} fill="white" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">Operator Intelligence</h2>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">Lumina v2.4 Beta</p>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={SMOOTH_TRANSITION}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearChat}
                className="text-neutral-600 hover:text-red-400 transition-colors h-9 rounded-xl border border-transparent hover:border-red-900/20"
              >
                <Trash2 size={14} className="mr-2" /> Clear Thread
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-8 space-y-8 pr-2 scrollbar-none">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={SMOOTH_TRANSITION}
              className="h-full flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="h-24 w-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 shadow-2xl relative">
                <div className="absolute inset-0 bg-primary-500/5 blur-3xl rounded-full" />
                <Sparkles size={40} strokeWidth={1.5} className="relative z-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Accessing Neural Mesh</h3>
                <p className="text-neutral-500 max-w-xs mx-auto text-sm leading-relaxed">Ask anything about your organizational knowledge silos, from financial audits to project roadmaps.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                {[
                  "Summarize Q3 Financials",
                  "What's the status of Project Orion?",
                  "Find the latest Security Protocols",
                  "Analyze marketing strategy for 2025"
                ].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all text-left group"
                  >
                    {suggestion}
                    <Zap size={10} className="inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-primary-400" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={SMOOTH_TRANSITION}
                className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.3)] mt-1">
                    <Zap size={18} fill="white" />
                  </div>
                )}

                <div className={`flex flex-col max-w-2xl ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={cn(
                    "px-6 py-5 rounded-[2rem] text-sm leading-relaxed border shadow-lg backdrop-blur-xl relative overflow-hidden",
                    msg.role === 'user' 
                    ? "bg-neutral-800/90 text-white border-white/10 rounded-tr-sm" 
                    : "bg-white/[0.04] text-neutral-200 border-white/10 rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  )}>
                    {msg.role === 'assistant' && idx === messages.length - 1 && isTyping === false ? (
                      <StreamingText text={msg.content} />
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>

                  {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...SMOOTH_TRANSITION, delay: 0.3 }}
                      className="mt-5 w-full space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-[1px] flex-1 bg-white/5" />
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Validated Sources</p>
                        <div className="h-[1px] flex-1 bg-white/5" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {msg.sources.map(source => (
                          <div 
                            key={source.id} 
                            onClick={() => navigate(`/documents/${source.id}`)}
                            className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-primary-500/40 hover:bg-white/10 transition-all cursor-pointer group shadow-xl backdrop-blur-md"
                          >
                            <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-primary-400 group-hover:border-primary-900 transition-colors">
                              <FileText size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-neutral-200 truncate group-hover:text-white">{source.title}</p>
                              <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider mt-0.5">{source.type} Silo</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-neutral-600 hover:text-white hover:bg-white/5 transition-colors">
                          <Copy size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-neutral-600 hover:text-white hover:bg-white/5 transition-colors">
                          <RefreshCw size={14} />
                        </Button>
                        <div className="flex-1"></div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-neutral-600 hover:text-green-400 hover:bg-green-500/5 transition-colors">
                          <ThumbsUp size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/5 transition-colors">
                          <ThumbsDown size={14} />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  
                  <p className="mt-2 text-[9px] font-black text-neutral-700 uppercase tracking-widest px-2">
                    {msg.timestamp}
                  </p>
                </div>

                {msg.role === 'user' && (
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-400 shrink-0 mt-1 border border-white/10 shadow-xl backdrop-blur-md">
                    <User size={18} />
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={SMOOTH_TRANSITION}
            className="flex gap-6"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
               <Zap size={18} fill="white" />
            </div>
            <div className="bg-white/5 px-6 py-4 rounded-[2rem] rounded-tl-sm border border-white/10 flex items-center gap-2 h-14 backdrop-blur-xl shadow-xl">
               <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
               <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
               <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="pb-8 pt-6 shrink-0 bg-neutral-950/80 backdrop-blur-2xl -mx-4 px-4 border-t border-white/5">
        <SearchConsole 
          compact 
          initialMode="ask" 
          onSearch={(query, mode) => {
            if (mode === 'search') {
              navigate(`/search?q=${encodeURIComponent(query)}`);
            } else {
              handleSearch(query);
            }
          }} 
        />
        <div className="text-center mt-4">
          <p className="text-[9px] text-neutral-700 uppercase font-black tracking-[0.3em]">Neural Interface active // encrypted session x842</p>
        </div>
      </div>
    </motion.div>
  );
};

const StreamingText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <p>{displayedText}<span className={cn("inline-block w-1.5 h-4 bg-primary-500 ml-1 translate-y-0.5", index < text.length ? "opacity-100" : "opacity-0")}></span></p>;
};
