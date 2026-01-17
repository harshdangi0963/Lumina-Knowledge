import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from './Aceternity';

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
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";
  
  const variants = {
    primary: "bg-neutral-100 text-neutral-900 hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-transparent",
    secondary: "bg-neutral-800 text-neutral-200 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 shadow-sm",
    ghost: "bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white",
    outline: "bg-transparent border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white",
    danger: "bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-900",
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
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
      
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