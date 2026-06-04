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
        duration: 0.95,
        ease: [0.76, 0, 0.24, 1], // Premium cinematic ease-out curve
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
            <path d="M50 4 L94 29 L50 54 L6 29 Z" />
            <path d="M4 33 L46 57 L46 109 L4 85 Z" />
            <path d="M54 57 L96 33 L96 56 L54 80 Z" />
            <path d="M54 86 L96 62 L96 85 L54 109 Z" />
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
