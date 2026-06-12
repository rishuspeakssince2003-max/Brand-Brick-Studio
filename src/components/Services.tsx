import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useMotionTemplate } from "motion/react";
import { ArrowRight } from "lucide-react";

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
    desc: "Sleek, memorable visual identity systems that position your brand as premium.",
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
    desc: "Spatial modeling, photorealistic renders, and spatial visuals that wow audiences.",
    icon: "threeD",
    bullets: ["Spatial Modeling", "Premium Renders", "Spatial Animation"]
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
    bullets: ["Rank #1 Strategies", "High-Intent Keywords", "Authority Boost"]
  },
  {
    title: "Social Media Management",
    desc: "Community building, brand authority, and an undeniable social presence.",
    icon: "social",
    bullets: ["Daily Post Scheduling", "Community Growth", "Meta Ad Blueprint"]
  },
  {
    title: "Content Strategy",
    desc: "Master plans that align brand voice, audience psychology, and business goals.",
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
   BENTO GRID SERVICE CARD
   ══════════════════════════════════════════════════════════ */
const ServiceBentoCard: React.FC<{
  service: typeof services[number];
  index: number;
}> = ({
  service,
  index
}) => {
  const num = String(index + 1).padStart(2, "0");
  const [isHovered, setIsHovered] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);
  
  // Track cursor position inside the card for high-end spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    mouseX.set(e.clientX - rectRef.current.left);
    mouseY.set(e.clientY - rectRef.current.top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -6,
        scale: 1.015,
        borderColor: "rgba(220, 38, 38, 0.15)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        rectRef.current = null;
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onMouseMove={handleMouseMove}
      onClick={() => {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo("#contact");
        } else {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className="group rounded-[2.25rem] border border-zinc-200/50 dark:border-zinc-800/30 bg-white/60 dark:bg-[#1c1c1e]/40 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between hover:bg-white/80 dark:hover:bg-[#1c1c1e]/60 hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)] transition-all duration-500 relative overflow-hidden min-h-[300px] cursor-pointer"
    >
      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(220, 38, 38, 0.05),
              rgba(220, 38, 38, 0.01) 50%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Card Content container */}
      <div className="relative z-10 h-full flex flex-col justify-between flex-grow">
        {/* Top row: Icon + Index */}
        <div className="flex items-start justify-between">
          <div className="relative h-11 w-11 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-center
            group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800/40 group-hover:scale-105 transition-all duration-300">
            <div className="text-zinc-500 dark:text-zinc-400 group-hover:text-[#dc2626] transition-colors duration-300 stroke-current">
              {svgIcons[service.icon]}
            </div>
          </div>

          <span className="text-[11px] font-mono font-medium text-zinc-450 dark:text-zinc-500 tracking-wider mt-1">
            {num}
          </span>
        </div>

        {/* Bottom: Title + Description + Bullets */}
        <div className="mt-8 flex-grow flex flex-col justify-between">
          <div>
            <h4 className="text-lg md:text-xl font-display font-semibold text-zinc-900 dark:text-white mb-2.5 leading-tight group-hover:text-[#dc2626] transition-all duration-300">
              {service.title}
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 transition-colors duration-300">
              {service.desc}
            </p>
          </div>

          {/* Bullets + Interactive Arrow Button */}
          <div className="flex items-center justify-between gap-3 mt-4 border-t border-zinc-100 dark:border-zinc-800/30 pt-4">
            {service.bullets && (
              <div className="flex flex-wrap gap-1.5 flex-grow">
                {service.bullets.map((bullet, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-2.5 py-0.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-500 dark:text-zinc-400 text-[9px] font-medium group-hover:border-zinc-300 dark:group-hover:border-zinc-700/60 group-hover:bg-zinc-100/50 dark:group-hover:bg-[#dc2626]/5 group-hover:text-zinc-800 dark:group-hover:text-white transition-all duration-300"
                  >
                    {bullet}
                  </span>
                ))}
              </div>
            )}
            {/* Minimal Circular Action Arrow Button */}
            <div className="w-8 h-8 rounded-full border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400 flex items-center justify-center shrink-0 group-hover:bg-[#dc2626] group-hover:border-[#dc2626] group-hover:text-white transition-all duration-300">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SERVICES SECTION
   ══════════════════════════════════════════════════════════ */
export function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28 relative"
      id="services"
    >
      {/* ── Background Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#dc2626]/[0.015] blur-[150px] rounded-full pointer-events-none" />

      {/* ── Section Header ── */}
      <div ref={headerRef} className="w-full relative z-20 mb-12 md:mb-16">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block px-5 py-2 rounded-full border border-[#dc2626]/30 bg-[#dc2626]/5 text-[#dc2626] text-xs font-bold tracking-[0.25em] uppercase mb-4"
          >
            Our Services
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial="hidden"
              animate={isHeaderInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-[1.05] mb-3"
            >
              {["One", "Team", "For"].map((w, idx) => (
                <motion.span
                  key={`w1-${idx}`}
                  variants={{
                    hidden: { y: 35, opacity: 0, filter: "blur(6px)" },
                    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}

              <span className="relative inline-block mr-[0.25em]">
                <motion.span
                  variants={{
                    hidden: { y: 35, opacity: 0, scale: 0.95, filter: "blur(6px)" },
                    visible: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-[#dc2626] italic inline-block"
                >
                  Everything
                </motion.span>

                {/* Animated underline swoosh */}
                <motion.svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 w-full h-3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.0, delay: 0.8, ease: "easeOut" } }
                  }}
                >
                  <path
                    d="M2 8 C40 2, 80 2, 100 6 S160 12, 198 4"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </motion.svg>

                {/* Floating 3D Isometric Cube next to "Everything" */}
                <motion.div
                  className="absolute -right-5 -bottom-2.5 w-6 h-6 pointer-events-none z-10"
                  initial={{ y: 15, opacity: 0, scale: 0 }}
                  variants={{
                    hidden: { y: 15, opacity: 0, scale: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.8, delay: 0.95, type: "spring" }
                    }
                  }}
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    y: {
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_4px_10px_rgba(220,38,38,0.5)]">
                    {/* Top Face */}
                    <path d="M12 2L20 6L12 10L4 6Z" fill="#ff6b6b" />
                    {/* Left Face */}
                    <path d="M4 6L12 10V18L4 14Z" fill="#dc2626" />
                    {/* Right Face */}
                    <path d="M12 10L20 6V14L12 18Z" fill="#991b1b" />
                    {/* Isometric details */}
                    <path d="M12 11.5L16 9.5M12 13.5L16 11.5M12 15.5L16 13.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </span>
              <br className="hidden md:block" />

              {["Your", "Brand", "Needs."].map((w, idx) => (
                <motion.span
                  key={`w2-${idx}`}
                  variants={{
                    hidden: { y: 35, opacity: 0, filter: "blur(6px)" },
                    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm md:text-base text-zinc-400 light:text-zinc-655 font-light leading-relaxed max-w-2xl mt-4"
          >
            12 core services under one roof, creative, content, digital, and
            technical execution built for brands that refuse to blend in.
          </motion.p>
        </div>
      </div>

      {/* ── Bento Grid (4 Columns, 3 Rows on Desktop) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20 w-full">
        {services.map((service, i) => (
          <ServiceBentoCard key={i} service={service} index={i} />
        ))}
      </div>

      {/* ── CSS Animations ── */}
      <style>{`
        .service-icon-svg {
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .group:hover .service-icon-svg {
          transform: scale(1.15) translateY(-2px);
          filter: drop-shadow(0 2px 10px rgba(220, 38, 38, 0.5));
        }
      `}</style>
    </section>
  );
}
