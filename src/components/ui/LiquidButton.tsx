import React from 'react';
import { motion } from 'motion/react';

export interface LiquidButtonProps {
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'solid' | 'outline' | 'glass';
  size?: 'default' | 'icon' | 'lg';
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<any>;
  style?: React.CSSProperties;
}

export function LiquidButton({ 
  children, 
  href, 
  target,
  rel,
  variant = 'solid', 
  size = 'default',
  className = '',
  style = {},
  onClick,
  ...props 
}: LiquidButtonProps) {
  
  const isSolid = variant === 'solid';
  const shadowDefault = isSolid
    ? "0 6px 0 var(--btn-3d-solid-shadow-color), 0 12px 25px var(--btn-3d-solid-glow)"
    : "0 6px 0 var(--btn-3d-outline-shadow-color), 0 12px 25px var(--btn-3d-outline-glow)";

  const shadowHover = isSolid
    ? "0 4px 0 var(--btn-3d-solid-shadow-color), 0 8px 30px var(--btn-3d-solid-glow-hover)"
    : "0 4px 0 var(--btn-3d-outline-shadow-color), 0 8px 30px var(--btn-3d-outline-glow-hover)";

  const shadowTap = isSolid
    ? "0 0px 0 var(--btn-3d-solid-shadow-color), 0 2px 10px var(--btn-3d-solid-glow-active)"
    : "0 0px 0 var(--btn-3d-outline-shadow-color), 0 2px 10px var(--btn-3d-outline-glow-active)";

  const baseClasses = "relative font-display font-bold uppercase tracking-wider select-none cursor-pointer flex items-center justify-center text-center transition-colors duration-300";
  
  const sizeClasses = {
    default: "px-8 py-4 text-sm rounded-[1.25rem]",
    lg: "px-10 py-5 text-sm md:text-base rounded-2xl",
    icon: "w-12 h-12 rounded-xl",
  };

  const variantClasses = {
    solid: "bg-[#dc2626] border border-white/20 text-white hover:bg-[#b91c1c]",
    outline: "bg-[var(--btn-3d-outline-bg)] border border-[var(--btn-3d-outline-border)] text-[var(--btn-3d-outline-text)] hover:text-[var(--btn-3d-outline-text-hover)]",
    glass: "bg-[var(--btn-3d-outline-bg)] border border-[var(--btn-3d-outline-border)] text-[var(--btn-3d-outline-text)] hover:text-[var(--btn-3d-outline-text-hover)]",
  };

  const textShadowStyle = isSolid ? { textShadow: "0 1px 2px rgba(0,0,0,0.5)" } : {};

  const motionProps = {
    style: {
      boxShadow: shadowDefault,
      ...textShadowStyle,
      ...style
    },
    whileHover: {
      y: 2,
      boxShadow: shadowHover,
    },
    whileTap: {
      y: 6,
      boxShadow: shadowTap,
    },
    transition: { type: "spring", stiffness: 600, damping: 15 },
    className: `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`,
    onClick,
    ...props
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        {...(motionProps as any)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      {...(motionProps as any)}
    >
      {children}
    </motion.button>
  );
}
