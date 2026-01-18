
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from './Aceternity.tsx';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  loading, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden active:scale-[0.98]";
  
  const variants = {
    primary: "bg-neutral-100 text-neutral-900 hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-transparent",
    secondary: "bg-white/10 backdrop-blur-md text-neutral-200 border border-white/10 hover:bg-white/20 hover:border-white/20 shadow-sm",
    ghost: "bg-transparent text-neutral-400 hover:bg-white/5 hover:text-white backdrop-blur-sm",
    outline: "bg-white/5 backdrop-blur-sm border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white hover:border-white/20",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 backdrop-blur-sm",
    glow: "bg-indigo-600 text-white shadow-[0_0_25px_rgba(79,70,229,0.5)] border border-indigo-500 hover:bg-indigo-500"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10 p-2"
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={loading}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
      
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
