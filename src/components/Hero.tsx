import { useEffect, useRef, useState } from "react";
import { MonitorPlay, Layout, Code2, LineChart } from "lucide-react";
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
   ROTATING WORD
   ══════════════════════════════════════════════════════════ */
const rotatingWords = ["ignore.", "forget.", "outgrow.", "replace."];

function RotatingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % rotatingWords.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-flex overflow-hidden align-bottom whitespace-nowrap" style={{ minWidth: "5.2em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[idx]}
          className="inline-block text-[#dc2626] whitespace-nowrap"
          initial={{ y: "110%", rotateX: -80, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-110%", rotateX: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
  { icon: Layout, title: "UI/UX Design" },
  { icon: Code2, title: "Web Development" },
  { icon: MonitorPlay, title: "Video Production" },
  { icon: LineChart, title: "Performance Ads" },
];

function FloatingServiceDeck() {
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseLeave={() => setIsHovered(false)}
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
              boxShadow: isHovered ? "0 0 40px rgba(220,38,38,0.15)" : "0 0 50px rgba(0,0,0,0.5)"
            }}
            transition={{ type: "spring", stiffness: isHovered ? 300 : 120, damping: isHovered ? 25 : 18 }}
            className="absolute w-[200px] h-[280px] sm:w-[240px] sm:h-[340px] md:w-[260px] md:h-[360px] rounded-[2rem] flex flex-col items-center justify-center gap-6 p-6 group"
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
            <div className="absolute inset-[1.5px] rounded-[calc(2rem-1.5px)] bg-[#050505] border border-zinc-800/40 -z-10 transition-colors duration-500" />
            
            {/* Ambient inner glow that activates on hover */}
            <div className="absolute inset-[1.5px] bg-gradient-to-br from-[#dc2626]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[calc(2rem-1.5px)] pointer-events-none -z-10" />
            
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center relative z-10 group-hover:border-[#dc2626]/50 group-hover:bg-[#dc2626]/15 transition-all duration-300">
              <Icon className="w-8 h-8 text-zinc-400 group-hover:text-[#dc2626] transition-colors duration-300" />
            </div>
            
            <h3 className="font-display font-bold text-lg md:text-xl text-white relative z-10 text-center leading-tight">
              {service.title}
            </h3>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-zinc-800 group-hover:bg-[#dc2626]/80 group-hover:w-12 transition-all duration-300" />
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
  { value: 12, suffix: "", label: "Services" },
];

/* ══════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════ */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  // Mouse spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 20 });
  const sy = useSpring(my, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    el.addEventListener("mousemove", h);
    return () => el.removeEventListener("mousemove", h);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center px-4 md:px-6 overflow-hidden"
    >
      {/* ── Backgrounds ── */}
      {/* Background is now fully transparent to show the WebGL fluid simulation underneath */}

      {/* Grid */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Mouse spot */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full -z-10 pointer-events-none hidden md:block"
        style={{
          x: sx, y: sy,
          translateX: "-50%", translateY: "-50%",
          background: "radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Ambient */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-[#dc2626]/15 blur-[160px] rounded-full pointer-events-none -z-10"
      />

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto w-full relative z-10 py-28 md:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT — Copy */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#dc2626]" />
                </span>
                <span className="text-[10px] md:text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  Silvassa's #1 Creative Studio
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display font-bold tracking-tight leading-[1.0] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-[1.9rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] text-white mb-2">
                We make brands
              </span>
              <span className="block text-[1.9rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] whitespace-nowrap">
                impossible to <RotatingWord />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-zinc-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Strategy. Design. Video. Code. Ads. One team, twelve services, zero excuses.
              We build everything your brand needs to win.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-12"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <LiquidButton href="#contact" variant="solid" size="lg">
                Start Your Project
              </LiquidButton>
              <a
                href="#services"
                className="group bg-transparent text-white border border-zinc-800 px-8 py-4 md:px-10 md:py-5 rounded-full text-sm font-bold uppercase tracking-wider hover:border-zinc-600 hover:bg-white/[0.03] transition-all duration-400 text-center inline-flex justify-center items-center gap-2"
              >
                See What We Do
                <svg className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-10 pt-6 border-t border-zinc-900/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {stats.map((s, i) => {
                const count = useCounter(s.value, 2, inView);
                return (
                  <div key={i} className="flex items-center gap-6 md:gap-10">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-2xl md:text-3xl font-display font-bold text-white tracking-tighter tabular-nums">
                          {count}
                        </span>
                        {s.suffix && <span className="text-lg font-display font-bold text-[#dc2626]">{s.suffix}</span>}
                      </div>
                      <span className="text-[9px] md:text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">{s.label}</span>
                    </div>
                    {i < stats.length - 1 && (
                      <div className="w-px h-6 bg-zinc-900 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT — Interactive Service Deck */}
          <div className="flex-shrink-0 relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] hidden lg:block" style={{ perspective: "1200px" }}>
            <FloatingServiceDeck />
          </div>
        </div>

        {/* Brand Logos Marquee */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 pt-10 border-t border-zinc-900/60"
        >
          <p className="text-center text-[10px] md:text-[11px] font-bold text-zinc-600 uppercase tracking-[0.25em] mb-6">
            TRUSTED BY THE NEXT GENERATION OF HIGH-GROWTH BRANDS
          </p>
          <div className="w-full overflow-hidden relative py-4">
            {/* Soft fade masks on left and right edges */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#040404] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#040404] to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-[200%] animate-marquee gap-16 md:gap-24 whitespace-nowrap">
              {/* Set of logos */}
              {Array(2).fill(null).map((_, i) => (
                <div key={i} className="flex justify-around items-center min-w-full shrink-0">
                  {/* APEX */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-600 hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 text-zinc-600 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M12 2L2 22h4l6-12 6 12h4z" />
                    </svg>
                    <span className="font-display font-bold text-xs md:text-sm tracking-[0.2em] group-hover:text-white transition-colors duration-300">APEX.LABS</span>
                  </div>
                  
                  {/* KRONOS */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-600 hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 text-zinc-600 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M12 2v20M12 12l8-8M12 12l8 8M4 4h4v16H4z" />
                    </svg>
                    <span className="font-display font-bold text-xs md:text-sm tracking-[0.2em] group-hover:text-white transition-colors duration-300">KRONOS</span>
                  </div>
                  
                  {/* NEXUS */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-600 hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 text-zinc-600 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <circle cx="9" cy="12" r="5" />
                      <circle cx="15" cy="12" r="5" />
                    </svg>
                    <span className="font-display font-bold text-xs md:text-sm tracking-[0.2em] group-hover:text-white transition-colors duration-300">NEXUS.DIGITAL</span>
                  </div>
                  
                  {/* VORTEX */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-600 hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 text-zinc-600 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M4 12a8 8 0 018-8v8H4zM20 12a8 8 0 01-8 8v-8h8z" />
                    </svg>
                    <span className="font-display font-bold text-xs md:text-sm tracking-[0.2em] group-hover:text-white transition-colors duration-300">VORTEX.MEDIA</span>
                  </div>
                  
                  {/* ORION */}
                  <div className="flex items-center gap-2 group cursor-pointer text-zinc-600 hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 text-zinc-600 group-hover:text-brand group-hover:drop-shadow-[0_0_8px_#dc2626] fill-none stroke-current stroke-2 transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M12 2l2 4 4 1-3 3 1 5-4-2-4 2 1-5-3-3 4-1z" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                    <span className="font-display font-bold text-xs md:text-sm tracking-[0.2em] group-hover:text-white transition-colors duration-300">ORION</span>
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
