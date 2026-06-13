import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { LiquidButton } from "./ui/LiquidButton";

/* ══════════════════════════════════════════════════════════
   BRAND SERVICE LOGOS (SVG)
   ══════════════════════════════════════════════════════════ */
const FigmaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 18 18" fill="currentColor" className={className}>
    {/* Top Left Semicircle */}
    <path d="M6 0a3 3 0 0 0 0 6h3V0H6z" />
    {/* Top Right Circle */}
    <circle cx="12" cy="3" r="3" />
    {/* Middle Left Circle */}
    <circle cx="6" cy="9" r="3" />
    {/* Middle Right Semicircle */}
    <path d="M9 6h3a3 3 0 0 1 0 6H9V6z" />
    {/* Bottom Left Teardrop */}
    <path d="M6 12a3 3 0 0 0 3 3v-3H6z" />
  </svg>
);

const ReactIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="16" cy="16" r="2" fill="currentColor" />
    <ellipse cx="16" cy="16" rx="5" ry="12" transform="rotate(0 16 16)" />
    <ellipse cx="16" cy="16" rx="5" ry="12" transform="rotate(60 16 16)" />
    <ellipse cx="16" cy="16" rx="5" ry="12" transform="rotate(120 16 16)" />
  </svg>
);

const PremiereIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="24" height="24" rx="5" />
    <path d="M10 11v10M10 11h4.5a3 3 0 0 1 0 6H10" strokeWidth="2.5" />
    <path d="M19 15v6M19 17a2.5 2.5 0 0 1 2.5-2.5h0.5" strokeWidth="2.5" />
  </svg>
);

const MetaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 16c0-4.5 3-8 5.5-8S16 11.5 16 16s3.5 8 5.5 8S27 20.5 27 16" />
    <path d="M27 16c0 4.5-3 8-5.5 8S16 20.5 16 16s-3.5-8-5.5-8S7 11.5 7 16" />
  </svg>
);

/* ══════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ══════════════════════════════════════════════════════════ */
function useCounter(target: number, dur: number, go: boolean) {
  const mv = useMotionValue(0);
  const rd = useTransform(mv, (v) => Math.round(v));
  const [d, setD] = useState(0);
  useEffect(() => {
    if (!go) return;
    const c = animate(mv, target, { duration: dur, ease: [0.16, 1, 0.3, 1] });
    const u = rd.on("change", setD);
    return () => { c.stop(); u(); };
  }, [go, target, dur, mv, rd]);
  return d;
}

/* ══════════════════════════════════════════════════════════
   ROTATING WORD (Visual Hook)
   ══════════════════════════════════════════════════════════ */
const rotatingWords = ["ATTENTION.", "REVENUE.", "AUTHORITY.", "VIRALITY.", "DOMINANCE."];

function RotatingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % rotatingWords.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-flex overflow-hidden h-[1.25em] align-bottom select-none">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[idx]}
          className="inline-block text-[#dc2626] drop-shadow-[0_0_20px_rgba(220,38,38,0.25)] whitespace-nowrap"
          initial={{ y: "100%", rotateX: -60, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-100%", rotateX: 60, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {rotatingWords[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   FLOATING SERVICE DECK
   ══════════════════════════════════════════════════════════ */
const servicesList = [
  { icon: FigmaIcon, title: "UI/UX Design" },
  { icon: ReactIcon, title: "Web Development" },
  { icon: PremiereIcon, title: "Video Production" },
  { icon: MetaIcon, title: "Performance Ads" },
];

function FloatingServiceDeck() {
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % servicesList.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-pointer z-10 perspective-[1200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => setOffset((prev) => (prev + 1) % servicesList.length)}
    >
      {servicesList.map((service, idx) => {
        const Icon = service.icon;
        const visualIdx = (idx - offset + servicesList.length) % servicesList.length;

        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: isHovered ? Math.abs(visualIdx - 1.5) * -12 : 0,
              rotateZ: isHovered ? (visualIdx - 1.5) * 8 : (visualIdx - 1.5) * 3,
              scale: isHovered ? 1.04 : 1 - visualIdx * 0.05,
              x: isHovered ? (visualIdx - 1.5) * 42 : visualIdx * 10,
              zIndex: servicesList.length - visualIdx,
              boxShadow: isHovered 
                ? (isLight ? "0 10px 30px rgba(0,0,0,0.06), 0 0 20px rgba(220,38,38,0.05)" : "0 0 40px rgba(220,38,38,0.15)") 
                : (isLight ? "0 5px 20px rgba(0,0,0,0.04)" : "0 0 50px rgba(0,0,0,0.5)")
            }}
            transition={{ type: "spring", stiffness: isHovered ? 300 : 120, damping: isHovered ? 25 : 18 }}
            className="absolute w-[200px] h-[280px] sm:w-[240px] sm:h-[340px] md:w-[260px] md:h-[360px] rounded-[2rem] flex flex-col items-center justify-center gap-6 p-6 group light:shadow-sm"
            style={{
              transformOrigin: "bottom center",
            }}
          >
            {/* Animated Spinning Edge Glow */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none -z-20">
              <motion.div 
                className="absolute inset-[-50%] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "conic-gradient(from 0deg, transparent 70%, rgba(220,38,38,0.8) 100%)",
                }}
              />
            </div>
            
            {/* Inner Solid Layer (makes the card opaque, masking the spinning gradient in the center) */}
            <div className="absolute inset-[1.5px] rounded-[calc(2rem-1.5px)] bg-[#050505] border border-zinc-800/40 -z-10 transition-colors duration-500 light:bg-white light:border-zinc-200" />
            
            {/* Ambient inner glow that activates on hover */}
            <div className="absolute inset-[1.5px] bg-gradient-to-br from-[#dc2626]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[calc(2rem-1.5px)] pointer-events-none -z-10" />
            
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center relative z-10 group-hover:border-[#dc2626]/50 group-hover:bg-[#dc2626]/15 transition-all duration-300 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-600 light:group-hover:bg-red-50 light:group-hover:border-red-200">
              <Icon className="w-8 h-8 text-zinc-400 group-hover:text-[#dc2626] transition-colors duration-300 light:text-zinc-500 light:group-hover:text-[#dc2626]" />
            </div>
            
            <h3 className="font-display font-bold text-lg md:text-xl text-white light:text-zinc-900 relative z-10 text-center leading-tight">
              {service.title}
            </h3>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-zinc-800 light:bg-zinc-200 group-hover:bg-[#dc2626]/80 group-hover:w-12 transition-all duration-300" />
          </motion.div>
        );
      })}
    </div>
  );
}


/* ══════════════════════════════════════════════════════════
   STATS
   ══════════════════════════════════════════════════════════ */
const stats = [
  { value: 3, suffix: "+", label: "Years" },
  { value: 50, suffix: "+", label: "Brands" },
  { value: 20, suffix: "+", label: "Team" },
];

/* ══════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════ */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { y: "115%", rotate: 1.2, filter: "blur(4px)" },
    visible: {
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col justify-between pt-32 pb-16 px-4 md:px-6 overflow-hidden"
    >
      {/* ── Background Video & Fallback Overlay ── */}
      <video 
        autoplay 
        loop 
        muted 
        playsinline 
        poster="hero-poster.webp"
        className="absolute inset-0 w-full h-full object-cover -z-25 pointer-events-none"
      >
        <source src="hero-loop.webm" type="video/webm" />
        <source src="hero-loop.mp4" type="video/mp4" />
      </video>

      {/* 60% Dark Overlay over video */}
      <div className="absolute inset-0 bg-[#050505]/65 light:bg-[#ffffff]/85 -z-20 pointer-events-none" />

      {/* Subtle WebGL fluid / lava container backdrop glow fallbacks */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#dc2626]/20 blur-[180px] rounded-full pointer-events-none -z-10"
      />

      {/* Faint dot pattern grid overlay */}
      <div
        className="absolute inset-0 -z-15 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Main Content Container ── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full flex-grow flex flex-col items-center justify-center relative z-10 text-center py-12"
      >
        {/* Top Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#dc2626]" />
            </span>
            <span className="text-[10px] md:text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] font-mono">
              Global Strategy-First Creative Agency
            </span>
          </span>
        </motion.div>

        {/* Kinetic Massive Headline */}
        <div className="font-display font-extrabold tracking-tighter leading-[0.95] mb-6 max-w-4xl text-center text-white light:text-zinc-900 uppercase text-[2.1rem] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl flex flex-col items-center select-none">
          <span className="block overflow-hidden py-1 sm:py-2">
            <motion.span variants={lineVariants} className="block">Building Brands</motion.span>
          </span>
          <span className="block overflow-hidden py-1 sm:py-2">
            <motion.span variants={lineVariants} className="block">That Command</motion.span>
          </span>
          <span className="block overflow-hidden py-1 sm:py-2">
            <motion.span 
              variants={lineVariants} 
              className="block italic font-black text-[#dc2626]"
            >
              <RotatingWord />
            </motion.span>
          </span>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-zinc-400 light:text-zinc-500 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl font-light font-display"
        >
          Strategy, Branding, Websites, and Content designed to help ambitious businesses stand out and grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-6 justify-center relative"
        >
          <div className="relative group">
            {/* Ambient Pulsing Glow behind button */}
            <div className="absolute inset-0 bg-[#dc2626]/40 blur-xl rounded-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 scale-95 group-hover:scale-105 animate-[pulse_3s_infinite]" />
            <LiquidButton
              href="https://wa.me/917383386318"
              target="_blank"
              rel="noreferrer"
              variant="solid"
              size="lg"
              className="relative z-10"
            >
              Chat on WhatsApp
            </LiquidButton>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Bottom Section: Stats & Logo Marquee ── */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-8 border-t border-zinc-900/60 light:border-zinc-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Centered Stats Grid */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.5
                }
              }
            }}
          >
            {stats.map((s, i) => {
              const count = useCounter(s.value, 2.5, inView);
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-8 md:gap-12 group cursor-pointer"
                >
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-3xl md:text-4xl font-display font-black text-white light:text-zinc-900 tracking-tighter tabular-nums group-hover:text-[#dc2626] transition-colors duration-300">
                        {count}
                      </span>
                      {s.suffix && (
                        <span className="text-xl font-display font-bold text-[#dc2626] group-hover:animate-pulse">
                          {s.suffix}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.25em] mt-1 group-hover:text-zinc-400 transition-colors duration-300">
                      {s.label}
                    </span>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-8 bg-zinc-850 light:bg-zinc-200 hidden sm:block" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Micro statement with glowing pulse indicator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center md:justify-end gap-3 max-w-xs md:max-w-none w-full md:w-auto"
          >
            <p className="text-[10px] md:text-[11px] font-bold text-zinc-500 light:text-zinc-500 uppercase tracking-[0.25em] text-center md:text-right leading-relaxed">
              Crafting raw digital growth from Silvassa to the world.
            </p>
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#dc2626]" />
            </span>
          </motion.div>
        </div>

        {/* Brand Logos Marquee */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 pt-8 border-t border-zinc-900/60 light:border-zinc-200"
        >
          <div className="w-full overflow-hidden relative py-2">
            {/* Soft fade masks on left and right edges */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent light:from-[#ffffff] z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent light:from-[#ffffff] z-10 pointer-events-none" />
            
            <div className="flex w-[200%] animate-marquee gap-16 md:gap-24 whitespace-nowrap">
              {Array(2).fill(null).map((_, i) => (
                <div key={i} className="flex justify-around items-center min-w-full shrink-0">
                  {/* APEX */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-500 light:text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-all duration-300">
                    <svg className="w-5 h-5 text-zinc-500 light:text-zinc-400 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M12 2L2 22h4l6-12 6 12h4z" />
                    </svg>
                    <span className="font-display font-bold text-xs tracking-[0.2em] group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300">APEX.LABS</span>
                  </div>
                  
                  {/* KRONOS */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-500 light:text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-all duration-300">
                    <svg className="w-5 h-5 text-zinc-500 light:text-zinc-400 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M12 2v20M12 12l8-8M12 12l8 8M4 4h4v16H4z" />
                    </svg>
                    <span className="font-display font-bold text-xs tracking-[0.2em] group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300">KRONOS</span>
                  </div>
                  
                  {/* NEXUS */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-500 light:text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-all duration-300">
                    <svg className="w-5 h-5 text-zinc-500 light:text-zinc-400 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <circle cx="9" cy="12" r="5" />
                      <circle cx="15" cy="12" r="5" />
                    </svg>
                    <span className="font-display font-bold text-xs tracking-[0.2em] group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300">NEXUS.DIGITAL</span>
                  </div>
                  
                  {/* VORTEX */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-500 light:text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-all duration-300">
                    <svg className="w-5 h-5 text-zinc-500 light:text-zinc-400 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M4 12a8 8 0 018-8v8H4zM20 12a8 8 0 01-8 8v-8h8z" />
                    </svg>
                    <span className="font-display font-bold text-xs tracking-[0.2em] group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300">VORTEX.MEDIA</span>
                  </div>
                  
                  {/* ORION */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-500 light:text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-all duration-300">
                    <svg className="w-5 h-5 text-zinc-500 light:text-zinc-400 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M12 2l2 4 4 1-3 3 1 5-4-2-4 2 1-5-3-3 4-1z" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                    <span className="font-display font-bold text-xs tracking-[0.2em] group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300">ORION</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
