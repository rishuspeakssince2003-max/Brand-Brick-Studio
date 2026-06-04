import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

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
  { title: "Video Editing", desc: "Cinematic, high-retention editing that turns raw footage into viral gold.", icon: "videoEdit" },
  { title: "Video Shoot", desc: "Premium on-site production with expert direction and cinematic quality.", icon: "videoShoot" },
  { title: "Reels Creation", desc: "Short-form vertical content engineered for maximum virality and engagement.", icon: "reels" },
  { title: "Thumbnail Design", desc: "Bold visual hooks designed to break scroll patterns and steal clicks.", icon: "thumbnail" },
  { title: "Graphic Design", desc: "Sleek, memorable visual identity systems that position you as premium.", icon: "graphic" },
  { title: "Website Development", desc: "Lightning-fast, conversion-optimized digital experiences built to dominate.", icon: "website" },
  { title: "3D Design", desc: "Photorealistic modeling, renders, and spatial visuals that wow audiences.", icon: "threeD" },
  { title: "Software Development", desc: "Custom tech solutions, digital workflows, and automation at scale.", icon: "software" },
  { title: "SEO Optimization", desc: "Data-driven strategies to own search results and drive organic revenue.", icon: "seo" },
  { title: "Social Media Management", desc: "Community building, brand authority, and undeniable social presence.", icon: "social" },
  { title: "Content Strategy", desc: "Master plans aligning brand voice, audience psychology, and business goals.", icon: "content" },
  { title: "Ad Creatives", desc: "Scroll-stopping ads rigorously designed for high ROAS on Meta & Google.", icon: "ads" },
];

/* ══════════════════════════════════════════════════════════
   ANIMATED SERVICE CARD
   ══════════════════════════════════════════════════════════ */
function ServiceCard({ service, index }: { service: typeof services[number]; index: number; key?: any }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.92 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 70, damping: 16 },
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-[1.75rem] overflow-hidden cursor-default md:col-span-1"
      style={{ minHeight: 240 }}
    >
      {/* ── Animated Border Trace ── */}
      <div className="absolute inset-0 rounded-[1.75rem] p-px overflow-hidden">
        <div
          className="absolute inset-[-200%] transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: "conic-gradient(from 0deg, transparent 0%, #dc2626 10%, transparent 20%, transparent 100%)",
            animation: hovered ? "border-spin 3s linear infinite" : "none",
          }}
        />
        {/* Static border */}
        <div className="absolute inset-px rounded-[calc(1.75rem-1px)] bg-[#0a0a0a] transition-colors duration-500" />
      </div>

      {/* ── Card inner ── */}
      <div className="relative z-10 h-full flex flex-col justify-between p-7 md:p-8 rounded-[1.75rem] border border-zinc-800/60 group-hover:border-transparent transition-colors duration-500 overflow-hidden">

        {/* Hover gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626]/[0.07] via-transparent to-[#dc2626]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Watermark Number */}
        <span className="absolute -right-2 -top-4 text-[7rem] md:text-[8rem] font-display font-bold leading-none text-white/[0.02] group-hover:text-[#dc2626]/[0.06] transition-colors duration-700 select-none pointer-events-none tracking-tighter">
          {num}
        </span>

        {/* Top row: Icon + Number */}
        <div className="relative z-10 flex items-start justify-between mb-8">
          {/* Animated Icon Container */}
          <div className="relative">
            {/* Pulsing glow behind icon on hover */}
            <div className="absolute inset-0 rounded-2xl bg-[#dc2626]/20 blur-xl scale-0 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="relative h-14 w-14 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-center
              group-hover:bg-[#dc2626]/10 group-hover:border-[#dc2626]/40 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.25)]
              transition-all duration-500 service-icon-box">
              <div className="text-zinc-500 group-hover:text-[#dc2626] transition-colors duration-400 stroke-current">
                {svgIcons[service.icon]}
              </div>
            </div>
          </div>

          {/* Small index pill */}
          <span className="text-[11px] font-mono font-bold text-zinc-700 group-hover:text-[#dc2626]/60 transition-colors duration-500 tracking-wider mt-1">
            {num}
          </span>
        </div>

        {/* Bottom: Title + Description */}
        <div className="relative z-10 mt-auto">
          <h4 className="text-xl md:text-[1.35rem] font-display font-bold text-white mb-2.5 leading-tight group-hover:text-[#dc2626] transition-colors duration-400">
            {service.title}
          </h4>
          <p className="text-zinc-500 text-[13px] md:text-sm leading-relaxed group-hover:text-zinc-400 transition-colors duration-400 max-w-md">
            {service.desc}
          </p>

          {/* Animated underline on hover */}
          <div className="mt-4 h-px w-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-[#dc2626] to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-transparent px-4 md:px-6 overflow-hidden"
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <div className="mb-20 md:mb-28 max-w-4xl">
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
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.05] mb-6"
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
            className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl"
          >
            12 core services under one roof, creative, content, digital, and
            technical execution built for brands that refuse to blend in.
          </motion.p>
        </div>

        {/* ── Service Count Bar ── */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">12</span>
            <span className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Services</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 via-zinc-800/50 to-transparent" />
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(240px,auto)]"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.6 } },
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </motion.div>
      </div>

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
