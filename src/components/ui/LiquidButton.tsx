import React, { ButtonHTMLAttributes } from 'react';

export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'solid' | 'outline' | 'glass';
  size?: 'default' | 'icon' | 'lg';
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<any>;
}

export function LiquidButton({ 
  children, 
  href, 
  variant = 'solid', 
  size = 'default',
  className = '',
  ...props 
}: LiquidButtonProps) {
  
  const baseClasses = "relative overflow-hidden group inline-flex justify-center items-center font-bold tracking-wider uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] rounded-full";
  
  const sizeClasses = {
    default: "px-8 py-4 text-sm",
    lg: "px-10 py-5 text-sm",
    icon: "w-12 h-12",
  };

  const variantClasses = {
    solid: "bg-transparent border-2 border-brand text-white", 
    outline: "bg-transparent border-2 border-zinc-800 text-white hover:border-brand/50",
    glass: "bg-transparent backdrop-blur-sm border-2 border-zinc-700 text-white",
  };

  const innerContent = (
    <>
      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
        <div className="absolute left-0 right-0 top-[calc(100%+40px)] h-[170%] bg-brand transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[110%] z-0">
          <svg
            className="absolute bottom-[99%] left-0 w-[200%] h-[24px] text-brand transform translate-x-0 group-hover:animate-[liquid-wave_1s_linear_infinite]"
            fill="currentColor"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path d="M0,50 C125,0 375,100 500,50 C625,0 875,100 1000,50 L1000,101 L0,101 Z" />
          </svg>
        </div>
      </div>
      
      {/* Button Content */}
      <span className="relative z-20 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300 drop-shadow-md">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...(props as any)}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {innerContent}
    </button>
  );
}
