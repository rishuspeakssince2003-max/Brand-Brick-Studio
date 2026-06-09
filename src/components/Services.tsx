import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* ══════════════════════════════════════════════════════════
   CUSTOM SVG ICONS — Animated stroke-draw on hover
   ══════════════════════════════════════════════════════════ */
const svgIcons: Record<string, React.ReactNode> = {
  videoEdit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" className="stroke-[#dc2626]" strokeWidth="2" />
    </svg>
  ),
  videoShoot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" className="stroke-[#dc2626]" />
    </svg>
  ),
  reels: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18" className="stroke-[#dc2626]" strokeWidth="3" />
    </svg>
  ),
  thumbnail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" className="stroke-[#dc2626]" />
    </svg>
  ),
  graphic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" className="stroke-[#dc2626]" />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="2" y1="12" x2="22" y2="12" className="stroke-[#dc2626]" />
    </svg>
  ),
  threeD: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" className="stroke-[#dc2626]" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  ),
  software: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" className="stroke-[#dc2626]" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" className="stroke-[#dc2626]" strokeWidth="2" />
    </svg>
  ),
  social: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" className="stroke-[#dc2626]" />
    </svg>
  ),
  content: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <path d="M9 21h6M12 2v3M4.22 4.22l2.12 2.12M19.78 4.22l-2.12 2.12" />
      <path d="M12 7a5 5 0 0 0-5 5c0 2.5 2 4.5 5 4.5s5-2 5-4.5a5 5 0 0 0-5-5z" className="stroke-[#dc2626]" strokeWidth="2" />
    </svg>
  ),
  ads: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 service-icon-svg">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="stroke-[#dc2626]" strokeWidth="2" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════
   SERVICE DATA
   ══════════════════════════════════════════════════════════ */
const services = [
  {
    title: "Video Editing",
    desc: "Cinematic, high-retention editing that turns raw footage into viral gold.",
    icon: "videoEdit",
    bullets: ["Cinematic Cuts", "Sound Design", "Color Grading"]
  },
  {
    title: "Video Shoot",
    desc: "Premium on-site production with expert direction and cinematic quality.",
    icon: "videoShoot",
    bullets: ["4K Volumetric", "Professional Lighting", "Expert Direction"]
  },
  {
    title: "Reels Creation",
    desc: "Short-form vertical content engineered for maximum virality and engagement.",
    icon: "reels",
    bullets: ["Viral Hook Formulation", "Subtitles & SFX", "Daily Workflow Allocation"]
  },
  {
    title: "Thumbnail Design",
    desc: "Bold visual hooks designed to break scroll patterns and steal clicks.",
    icon: "thumbnail",
    bullets: ["Break Scroll Patterns", "High CTR Hooks", "A/B Testing Strategy"]
  },
  {
    title: "Graphic Design",
    desc: "Sleek, memorable visual identity systems that position you as premium.",
    icon: "graphic",
    bullets: ["Sleek Identity Systems", "Brand Guidelines", "Premium Visual Systems"]
  },
  {
    title: "Website Development",
    desc: "Lightning-fast, conversion-optimized digital experiences built to dominate.",
    icon: "website",
    bullets: ["Speed Under 200ms", "WebGL Particles", "Lenis Smooth Scroll"]
  },
  {
    title: "3D Design",
    desc: "Photorealistic modeling, renders, and spatial visuals that wow audiences.",
    icon: "threeD",
    bullets: ["Photorealistic Modeling", "Premium Renders", "Spatial Animation"]
  },
  {
    title: "Software Development",
    desc: "Custom tech solutions, digital workflows, and automation at scale.",
    icon: "software",
    bullets: ["Custom WebApps", "Workflow Automations", "API Integration"]
  },
  {
    title: "SEO Optimization",
    desc: "Data-driven strategies to own search results and drive organic revenue.",
    icon: "seo",
    bullets: ["Rank #1 Strategies", "High Intent Keywords", "Authority Boost"]
  },
  {
    title: "Social Media Management",
    desc: "Community building, brand authority, and undeniable social presence.",
    icon: "social",
    bullets: ["Daily Post Scheduling", "Community Growth", "Meta Ad Blueprint"]
  },
  {
    title: "Content Strategy",
    desc: "Master plans aligning brand voice, audience psychology, and business goals.",
    icon: "content",
    bullets: ["Audience Psychology", "Positioning Blueprint", "ROI Focus"]
  },
  {
    title: "Ad Creatives",
    desc: "Scroll-stopping ads rigorously designed for high ROAS on Meta & Google.",
    icon: "ads",
    bullets: ["High ROAS Templates", "Creative Testing", "Meta/Google Compliant"]
  }
];


/* ══════════════════════════════════════════════════════════
   ANIMATED SERVICE CARD (Stacked playing cards deck)
   ══════════════════════════════════════════════════════════ */
function ServiceCard({
  service,
  index,
  activeIndex,
  setActiveIndex
}: {
  service: typeof services[number];
  index: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  key?: any;
}) {
  const num = String(index + 1).padStart(2, "0");
  const relativeIndex = (index - activeIndex + 12) % 12;
  const isActive = relativeIndex === 0;

  const x = useMotionValue(0);
  const rotateTransform = useTransform(x, [-150, 150], [-15, 15]);
  const opacityTransform = useTransform(x, [-150, -100, 0, 100, 150], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      // Swiped right -> Go to previous card
      setActiveIndex((prev) => (prev + 11) % 12);
    } else if (info.offset.x < -100) {
      // Swiped left -> Go to next card
      setActiveIndex((prev) => (prev + 1) % 12);
    }
  };

  // Stack properties
  let xVal = 0;
  let yVal = 0;
  let scaleVal = 1;
  let rotateVal = 0;
  let opacityVal = 1;
  const zIndex = 12 - relativeIndex;

  if (relativeIndex === 0) {
    xVal = 0;
    yVal = 0;
    scaleVal = 1;
    rotateVal = 0;
    opacityVal = 1;
  } else if (relativeIndex === 1) {
    xVal = 0;
    yVal = 16;
    scaleVal = 0.95;
    rotateVal = -1.5;
    opacityVal = 0.85;
  } else if (relativeIndex === 2) {
    xVal = 0;
    yVal = 32;
    scaleVal = 0.9;
    rotateVal = 1.5;
    opacityVal = 0.6;
  } else if (relativeIndex === 11) {
    // Exit state of card swiped out
    xVal = index % 2 === 0 ? -320 : 320;
    yVal = -10;
    scaleVal = 0.95;
    rotateVal = index % 2 === 0 ? -12 : 12;
    opacityVal = 0;
  } else {
    // Hidden at the back of the deck
    xVal = 0;
    yVal = 48;
    scaleVal = 0.85;
    rotateVal = 0;
    opacityVal = 0;
  }

  return (
    <motion.div
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{
        x: isActive ? x : xVal,
        rotate: isActive ? rotateTransform : rotateVal,
        opacity: isActive ? opacityTransform : opacityVal,
        zIndex,
        pointerEvents: isActive ? "auto" : "none",
        transformOrigin: "bottom center"
      }}
      animate={isActive ? { y: 0, scale: 1 } : { x: xVal, y: yVal, scale: scaleVal, rotate: rotateVal, opacity: opacityVal }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute inset-0 rounded-[2.5rem] border border-zinc-850 bg-zinc-950/70 backdrop-blur-xl p-8 flex flex-col justify-between group cursor-grab active:cursor-grabbing light:bg-white/90 light:border-zinc-200 light:shadow-lg"
    >
      {/* Subtle hover radial spotlight in background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626]/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Watermark Index Number */}
      <span className="absolute -right-2 -top-4 text-[7rem] md:text-[8rem] font-display font-bold leading-none text-white/[0.01] light:text-zinc-900/[0.01] group-hover:text-[#dc2626]/[0.04] transition-colors duration-700 select-none pointer-events-none tracking-tighter">
        {num}
      </span>

      {/* Card Content container */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        
        {/* Top row: Icon + Index */}
        <div className="flex items-start justify-between">
          {/* Icon Box */}
          <div className="relative h-14 w-14 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-center
            group-hover:bg-[#dc2626]/8 group-hover:border-[#dc2626]/25 transition-all duration-500 light:bg-zinc-50 light:border-zinc-200">
            <div className="text-zinc-500 group-hover:text-[#dc2626] transition-colors duration-400 stroke-current">
              {svgIcons[service.icon]}
            </div>
          </div>

          {/* Small index pill */}
          <span className="text-[10px] font-mono font-bold text-zinc-700 group-hover:text-[#dc2626]/60 transition-colors duration-500 tracking-wider mt-1">
            {num}
          </span>
        </div>

        {/* Bottom: Title + Description + Bullets */}
        <div className="mt-8">
          <h4 className="text-2xl font-display font-bold text-white light:text-zinc-900 mb-2 leading-tight group-hover:text-[#dc2626] transition-colors duration-400">
            {service.title}
          </h4>
          <p className="text-zinc-400 light:text-zinc-650 text-sm leading-relaxed max-w-md">
            {service.desc}
          </p>

          {/* Bullets */}
          {service.bullets && (
            <div className="flex flex-wrap gap-2 mt-5">
              {service.bullets.map((bullet, bIdx) => (
                <span key={bIdx} className="px-3 py-1 rounded-full border border-zinc-850 bg-zinc-900/40 text-zinc-400 text-[11px] font-medium light:border-zinc-250 light:bg-zinc-100 light:text-zinc-700">
                  {bullet}
                </span>
              ))}
            </div>
          )}

          {/* Animated underline indicator */}
          <div className="mt-6 h-[1.5px] w-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-[#dc2626] to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   FLOATING ORB
   ══════════════════════════════════════════════════════════ */
function FloatingOrb({ size, x, y, delay }: { size: number; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 12 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SERVICES SECTION
   ══════════════════════════════════════════════════════════ */
export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % 12);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev + 11) % 12);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-transparent px-4 md:px-6 overflow-hidden scroll-mt-24 md:scroll-mt-28"
      id="services"
    >
      {/* ── Floating Background Orbs ── */}
      <FloatingOrb size={350} x="5%" y="10%" delay={0} />
      <FloatingOrb size={250} x="75%" y="60%" delay={2} />
      <FloatingOrb size={200} x="40%" y="80%" delay={4} />
      <FloatingOrb size={180} x="85%" y="15%" delay={1} />

      {/* ── Subtle grid pattern overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-24 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block px-5 py-2 rounded-full border border-[#dc2626]/30 bg-[#dc2626]/5 text-[#dc2626] text-xs font-bold tracking-[0.25em] uppercase mb-6"
          >
            Our Services
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-[1.05] mb-6"
            >
              One Team For{" "}
              <span className="relative inline-block">
                <span className="text-[#dc2626] italic">Everything</span>
                {/* Animated underline swoosh */}
                <motion.svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 w-full h-3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.path
                    d="M2 8 C40 2, 80 2, 100 6 S160 12, 198 4"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.svg>
              </span>
              <br className="hidden md:block" />
              Your Brand Needs.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-zinc-400 light:text-zinc-600 font-light leading-relaxed max-w-2xl"
          >
            12 core services under one roof, creative, content, digital, and
            technical execution built for brands that refuse to blend in.
          </motion.p>
        </div>

        {/* ── Stacked Cards Deck Area ── */}
        <div 
          className="relative w-full max-w-[480px] h-[380px] sm:h-[420px] md:h-[400px] mx-auto mt-16 z-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {services.map((service, i) => (
            <ServiceCard 
              key={i} 
              service={service} 
              index={i} 
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>

        {/* ── Deck Controls ── */}
        <div className="flex flex-col items-center gap-4 mt-12 relative z-20">
          {/* Navigation row */}
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-zinc-850 bg-zinc-950/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#dc2626] hover:bg-[#dc2626]/5 transition-all duration-300 light:border-zinc-200 light:bg-white light:text-zinc-600 light:hover:text-[#dc2626] cursor-pointer"
              aria-label="Previous Service"
            >
              <ArrowLeft size={18} />
            </button>
            
            <span className="text-sm font-mono font-bold text-zinc-500 tracking-wider select-none">
              {String(activeIndex + 1).padStart(2, "0")} <span className="text-zinc-800 light:text-zinc-300">/</span> 12
            </span>
            
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-zinc-850 bg-zinc-950/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#dc2626] hover:bg-[#dc2626]/5 transition-all duration-300 light:border-zinc-200 light:bg-white light:text-zinc-600 light:hover:text-[#dc2626] cursor-pointer"
              aria-label="Next Service"
            >
              <ArrowRight size={18} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full max-w-[280px] h-[3px] bg-zinc-900 rounded-full overflow-hidden light:bg-zinc-200">
            <motion.div
              key={activeIndex + (isPaused ? "-paused" : "-active")}
              initial={{ width: "0%" }}
              animate={isPaused ? { width: "0%" } : { width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-full bg-[#dc2626] shadow-[0_0_8px_#dc2626]"
            />
          </div>
          
          {isPaused && (
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest animate-pulse mt-1 select-none">
              Auto-cycle Paused (Hovering)
            </span>
          )}
        </div>
      </motion.div>

      {/* ── CSS Animations ── */}
      <style>{`
        @keyframes border-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .service-icon-svg {
          stroke: currentColor;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .group:hover .service-icon-box {
          transform: translateY(-3px);
        }

        .group:hover .service-icon-svg {
          transform: scale(1.1);
          filter: drop-shadow(0 0 8px rgba(220, 38, 38, 0.4));
        }
      `}</style>
    </section>
  );
}
