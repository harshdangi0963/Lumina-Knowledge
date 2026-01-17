import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Grid, 
  Settings, 
  Bell, 
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
  History,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './ui/Aceternity.tsx';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Grid, label: 'Collections', path: '/collections' },
    { icon: History, label: 'History', path: '/history' },
    { icon: Users, label: 'Collaborators', path: '/collaborators' },
  ];

  const isHome = location.pathname === '/';
  const springConfig = { type: "spring" as const, stiffness: 260, damping: 32, mass: 0.8 };

  return (
    <div className="flex h-screen bg-neutral-950 overflow-hidden font-sans text-neutral-200 selection:bg-primary-500/30">
      <AnimatePresence mode="wait">
        {!hidden && (
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              width: collapsed ? 80 : 260 
            }}
            exit={{ x: -300, opacity: 0 }}
            onMouseEnter={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
            transition={springConfig}
            className={cn(
              "relative bg-neutral-900/40 backdrop-blur-xl border-r border-neutral-800/50 flex flex-col z-30 my-4 ml-4 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto",
              "hidden md:flex shrink-0"
            )}
          >
            <div className="h-20 flex items-center px-6 shrink-0">
               <div className="flex items-center gap-3 overflow-hidden">
                 <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary-900/20">
                   <Zap size={18} fill="white" />
                 </div>
                 <AnimatePresence initial={false}>
                   {!collapsed && (
                     <motion.span 
                       initial={{ opacity: 0, x: -10 }} 
                       animate={{ opacity: 1, x: 0 }} 
                       exit={{ opacity: 0, x: -10 }}
                       transition={{ duration: 0.2 }}
                       className="font-display font-bold text-xl tracking-tight text-white whitespace-nowrap"
                     >
                       Lumina
                     </motion.span>
                   )}
                 </AnimatePresence>
               </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 py-6 overflow-x-hidden scrollbar-none">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative group overflow-hidden",
                      isActive ? "text-white" : "text-neutral-400 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-neutral-800/80 z-0"
                        transition={springConfig}
                      />
                    )}
                    <item.icon size={20} className="relative z-10 shrink-0" />
                    <AnimatePresence mode="popLayout" initial={false}>
                      {!collapsed && (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="whitespace-nowrap font-medium relative z-10"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </nav>

            <div className="p-4 space-y-2 shrink-0">
               <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:bg-neutral-800/50 hover:text-white transition-colors">
                  <Settings size={20} className="shrink-0" />
                  {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Settings</motion.span>}
               </button>
               <div className={cn("flex items-center gap-3 px-3 py-3 mt-2 rounded-xl bg-neutral-900/60 border border-neutral-800/50 transition-all", collapsed ? 'justify-center' : '')}>
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">JD</div>
                  {!collapsed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate leading-none">John Doe</p>
                      <p className="text-[10px] text-neutral-500 truncate mt-1 uppercase tracking-wider">Pro Member</p>
                    </motion.div>
                  )}
               </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-neutral-950">
        {!isHome && (
          <header className="h-20 flex items-center justify-between px-8 z-20 sticky top-0 bg-neutral-950/20 backdrop-blur-sm shrink-0 border-b border-neutral-900/50">
            <div className="flex items-center gap-6">
               <button 
                  onClick={() => setHidden(!hidden)}
                  className="p-2 text-neutral-500 hover:text-white transition-colors bg-neutral-900/50 border border-neutral-800/50 rounded-xl"
               >
                  {hidden ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
               </button>
               <div className="h-4 w-[1px] bg-neutral-800" />
               <span className="text-xs font-bold text-neutral-500 tracking-[0.2em] uppercase">Knowledge Hub</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-primary-500 rounded-full"></span>
              </button>
            </div>
          </header>
        )}

        <div className={cn("flex-1 overflow-hidden relative z-10", !isHome && "overflow-y-auto")}>
          {hidden && isHome && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setHidden(false)}
              className="absolute top-6 left-6 z-50 p-3 text-neutral-400 hover:text-white transition-all bg-neutral-900/80 backdrop-blur-md border border-neutral-800 shadow-2xl rounded-2xl group"
            >
              <PanelLeftOpen size={22} className="group-hover:scale-110 transition-transform" />
            </motion.button>
          )}
          <div className={cn("h-full", !isHome && "p-8")}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};