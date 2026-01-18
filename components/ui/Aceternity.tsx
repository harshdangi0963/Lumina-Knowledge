
import React from 'react';
import { motion, useAnimation, useMotionTemplate, useMotionValue } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Spotlight ---
export const Spotlight = ({ className, fill = "white" }: { className?: string; fill?: string }) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter0_f_2951_32462)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_2951_32462"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_2951_32462" />
        </filter>
      </defs>
    </svg>
  );
};

// --- Text Generate Effect ---
export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = React.useState<any>(null); // Simplified for mock
  let wordsArray = words.split(" ");
  
  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {wordsArray.map((word, idx) => {
            return (
              <motion.span
                key={word + idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                className={cn("opacity-0 inline-block mr-1.5", idx > 1 && idx < 4 ? "text-primary-400" : "dark:text-white text-black")}
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Hover Effect (Card) ---
export const HoverEffect = ({
  items,
  className,
  onSelect
}: {
  items: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    id: string;
  }[];
  className?: string;
  onSelect?: (id: string) => void;
}) => {
  let [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onSelect && onSelect(item.id)}
        >
          <div className="rounded-[2.5rem] h-full w-full p-4 overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/5 group-hover:border-white/20 relative z-20 transition-all duration-500 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <div className="relative z-50">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                    {item.icon && <span className="text-primary-400 group-hover:scale-110 transition-transform duration-500">{item.icon}</span>}
                    <h4 className="text-neutral-100 font-bold tracking-wide mt-1 group-hover:text-white transition-colors">{item.title}</h4>
                </div>
                <p className="mt-4 text-neutral-400 tracking-wide leading-relaxed text-sm group-hover:text-neutral-300 transition-colors">{item.description}</p>
              </div>
            </div>
            {/* Subtle inner shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
          </div>
          
          {hoveredIndex === idx && (
             <motion.span
                className="absolute inset-0 h-full w-full bg-primary-500/[0.08] block rounded-[2.8rem] -z-10 blur-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
          )}
        </div>
      ))}
    </div>
  );
};

// --- Moving Border Button ---
export const MovingBorderButton = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  className,
  containerClassName,
  ...props
}: any) => {
  return (
    <div
      className={cn(
        "relative text-xl h-12 w-40 p-[1px] overflow-hidden rounded-full",
        containerClassName
      )}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "9999px",
        }}
      >
         <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 h-56 w-56 bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-70"
         />
      </div>
      
      <div className={cn(
        "relative bg-slate-900/[0.90] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased rounded-full",
        className
      )}>
        {children}
      </div>
    </div>
  );
};

// --- Background Beams (Simplified for mock) ---
export const BackgroundBeams = () => {
    return (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-neutral-950 w-full h-full overflow-hidden">
             <div className="absolute inset-0 bg-neutral-950 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
             <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.03] z-10" />
             {/* Large glass orbs for depth */}
             <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-500/10 blur-[120px] z-0 animate-pulse" />
             <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[100px] z-0" />
             <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[80px] z-0" />
        </div>
    )
}
