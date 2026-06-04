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
            {/* Top Face */}
            <path d="M 47.5 40 L 24 26.5 L 47.5 13 L 71 26.5 Z" />
            {/* Left Face */}
            <path d="M 22 30.5 L 45.5 43.5 L 45.5 93.5 L 22 80.5 Z" />
            {/* Center Stem */}
            <path d="M 49.5 44.7 L 53.5 42.4 L 53.5 91.2 L 49.5 93.5 Z" />
            {/* Top Lobe */}
            <path d="M 57 40.4 L 74 30.6 C 83.5 36.1, 83.5 50.1, 74 55.5 L 57 65.3 Z" />
            {/* Bottom Lobe */}
            <path d="M 57 68.8 L 74 59.0 C 83.5 64.5, 83.5 78.4, 74 83.9 L 57 93.7 Z" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
