import { useEffect } from "react";
import { motion } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    // Disable body scroll when loader mounts
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    
    // Set a timeout to trigger onComplete (allowing transition to run and settle)
    const timer = setTimeout(() => {
      onComplete();
    }, 1200); // 1.2 seconds total before slide-up starts

    return () => {
      // Re-enable scroll when loader unmounts
      document.body.style.overflow = originalStyle === "hidden" ? "" : originalStyle;
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Falling animation variants (The Brick)
  const brickVariants = {
    hidden: { 
      y: -600, 
      scaleY: 1.4, 
      scaleX: 0.7, 
      opacity: 1 
    },
    show: {
      y: -30, // Land 30px higher to prevent any overlap or collision with the text
      scaleY: [1.4, 1.4, 0.65, 1.15, 0.95, 1], // Squashes to 0.65 on impact, rebounds to 1.15
      scaleX: [0.7, 0.7, 1.35, 0.88, 1.03, 1], // Stretches sideways on impact
      transition: {
        y: {
          type: "spring",
          stiffness: 240,
          damping: 17,
          mass: 1.3,
          restSpeed: 0.001,
        },
        scaleY: {
          duration: 1.1,
          times: [0, 0.42, 0.48, 0.68, 0.85, 1],
        },
        scaleX: {
          duration: 1.1,
          times: [0, 0.42, 0.48, 0.68, 0.85, 1],
        }
      }
    }
  };

  // Text reaction variants
  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scaleY: 1
    },
    show: {
      opacity: [0, 1, 1],
      y: [10, 0, 14, -3, 1, 0], // Compressed down on impact, slightly bounces up, settles
      scaleY: [1, 1, 0.8, 1.08, 0.97, 1],
      transition: {
        opacity: { 
          duration: 0.3, 
          ease: "easeOut" 
        },
        y: {
          duration: 0.7,
          delay: 0.40, // Triggered right at the moment of impact
          ease: [0.25, 0.1, 0.25, 1],
        },
        scaleY: {
          duration: 0.7,
          delay: 0.40,
          ease: [0.25, 0.1, 0.25, 1],
        }
      }
    }
  };

  // Impact shockwave glow
  const glowVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.4 
    },
    show: {
      opacity: [0, 0.6, 0],
      scale: [0.4, 2.2],
      transition: {
        duration: 0.65,
        delay: 0.42, // Triggered exactly on impact
        ease: "easeOut"
      }
    }
  };

  // Fullscreen overlay slide-up exit
  const overlayVariants = {
    initial: { y: 0 },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1], // Fast, smooth exponential ease-out
      },
    },
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Background Radial Glow Shockwave removed to prevent red flash */}

      <div className="flex flex-col items-center gap-10 relative z-10">
        {/* Falling Brick (SVG Logo) */}
        <motion.div
          variants={brickVariants}
          initial="hidden"
          animate="show"
          className="relative z-20 origin-bottom"
        >
          <svg
            viewBox="0 0 100 116"
            className="w-16 md:w-20 h-auto text-[#dc2626] fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
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

        {/* Brand Name Text (Reacting on Impact) */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center origin-top"
        >
          <span className="font-sans font-medium text-4xl md:text-5xl tracking-tight text-white flex items-center leading-none">
            Brand<span className="font-bold text-[#dc2626] ml-[2px]">Brick</span>
          </span>
          <span className="text-[12px] md:text-[14px] font-bold tracking-[0.4em] text-zinc-400 uppercase mt-2 ml-1.5 leading-none font-display">
            Studio
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
