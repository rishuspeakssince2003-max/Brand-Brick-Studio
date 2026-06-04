import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch
    const isTouch = 
      typeof window !== "undefined" && (
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0) || 
        (window.matchMedia("(pointer: coarse)").matches)
      );
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <style>{`
        body, body * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-screen flex items-center justify-center w-[32px] h-[32px]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.5
        }}
      >
        {/* Bioluminescent Pulse on Hover */}
        <motion.div
          className="absolute rounded-full"
          animate={{
            width: isHovering ? 80 : 0,
            height: isHovering ? 80 : 0,
            opacity: isHovering ? 0.3 : 0,
            boxShadow: isHovering ? "0 0 30px 10px rgba(220,38,38,0.6)" : "none",
            backgroundColor: "rgba(220,38,38,0.15)"
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        />

        {/* Outer Ring on Hover */}
        <motion.div
          className="absolute rounded-full border border-[#dc2626]"
          animate={{
            width: isHovering ? 50 : 0,
            height: isHovering ? 50 : 0,
            opacity: isHovering ? 0.8 : 0,
            scale: isHovering ? [1, 1.15, 1] : 1,
          }}
          transition={{
            width: { type: "spring", stiffness: 300, damping: 20 },
            height: { type: "spring", stiffness: 300, damping: 20 },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={{
            rotate: isHovering ? 90 : 0,
            scale: isHovering ? 0.6 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg viewBox="0 0 100 116" className="w-[32px] h-[32px] text-brand fill-current drop-shadow-[0_0_15px_rgba(220,38,38,0.9)]" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 4 L94 29 L50 54 L6 29 Z" />
            <path d="M4 33 L46 57 L46 109 L4 85 Z" />
            <path d="M54 57 L96 33 L96 56 L54 80 Z" />
            <path d="M54 86 L96 62 L96 85 L54 109 Z" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
