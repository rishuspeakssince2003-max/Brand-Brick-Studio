import React, { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useMotionTemplate } from "motion/react";

/* ══════════════════════════════════════════════════════════
   CUSTOM SVG ICONS — Animated stroke-draw on hover
   ══════════════════════════════════════════════════════════ */
const svgIcons: Record<string, React.ReactNode> = {
  videoEdit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" className="stroke-[#dc2626]" strokeWidth="2" />
    </svg>
  ),
  videoShoot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" className="stroke-[#dc2626]" />
    </svg>
  ),
  reels: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18" className="stroke-[#dc2626]" strokeWidth="3" />
    </svg>
  ),
  thumbnail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" className="stroke-[#dc2626]" />
    </svg>
  ),
  graphic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" className="stroke-[#dc2626]" />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="2" y1="12" x2="22" y2="12" className="stroke-[#dc2626]" />
    </svg>
  ),
  threeD: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" className="stroke-[#dc2626]" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  ),
  software: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" className="stroke-[#dc2626]" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" className="stroke-[#dc2626]" strokeWidth="2" />
    </svg>
  ),
  social: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" className="stroke-[#dc2626]" />
    </svg>
  ),
  content: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
      <path d="M9 21h6M12 2v3M4.22 4.22l2.12 2.12M19.78 4.22l-2.12 2.12" />
      <path d="M12 7a5 5 0 0 0-5 5c0 2.5 2 4.5 5 4.5s5-2 5-4.5a5 5 0 0 0-5-5z" className="stroke-[#dc2626]" strokeWidth="2" />
    </svg>
  ),
  ads: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 service-icon-svg">
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
    bullets: ["Cinematic Cuts", "Sound Design", "Color Grading"],
    image: "/video_editing.png"
  },
  {
    title: "Video Shoot",
    desc: "Premium on-site production with expert direction and cinematic quality.",
    icon: "videoShoot",
    bullets: ["4K Volumetric", "Professional Lighting", "Expert Direction"],
    image: "/video_shoot.png"
  },
  {
    title: "Reels Creation",
    desc: "Short-form vertical content engineered for maximum virality and engagement.",
    icon: "reels",
    bullets: ["Viral Hooks", "Subtitles & SFX", "Daily Workflows"],
    image: "/reels_creation.png"
  },
  {
    title: "Thumbnail Design",
    desc: "Bold visual hooks designed to break scroll patterns and steal clicks.",
    icon: "thumbnail",
    bullets: ["CTR Optimization", "Scroll Stoppers", "A/B Testing"],
    image: "/thumbnail_design.png"
  },
  {
    title: "Graphic Design",
    desc: "Sleek, memorable visual identity systems that position your brand as premium.",
    icon: "graphic",
    bullets: ["Sleek Identity", "Brand Guidelines", "Premium Systems"],
    image: "/graphic_design.png"
  },
  {
    title: "Website Development",
    desc: "Lightning-fast, conversion-optimized digital experiences built to dominate.",
    icon: "website",
    bullets: ["Speed Under 200ms", "WebGL Particles", "Lenis Smooth Scroll"],
    image: "/website_development.png"
  },
  {
    title: "3D Design",
    desc: "Spatial modeling, photorealistic renders, and spatial visuals that wow audiences.",
    icon: "threeD",
    bullets: ["Spatial Modeling", "Premium Renders", "3D Animation"],
    image: "/three_d_design.png"
  },
  {
    title: "Software Development",
    desc: "Custom tech solutions, digital workflows, and automation at scale.",
    icon: "software",
    bullets: ["Custom WebApps", "Automations", "API Integration"],
    image: "/software_development.png"
  },
  {
    title: "SEO Optimization",
    desc: "Data-driven strategies to own search results and drive organic revenue.",
    icon: "seo",
    bullets: ["Rank #1 Strategy", "High-Intent Traffic", "Authority Boost"],
    image: "/seo_optimization.png"
  },
  {
    title: "Social Media Management",
    desc: "Community building, brand authority, and an undeniable social presence.",
    icon: "social",
    bullets: ["Post Scheduling", "Community Growth", "Acquisition Funnels"],
    image: "/social_media_management.png"
  },
  {
    title: "Content Strategy",
    desc: "Master plans that align brand voice, audience psychology, and business goals.",
    icon: "content",
    bullets: ["Psychology", "Brand Blueprint", "ROI Focus"],
    image: "/content_strategy.png"
  },
  {
    title: "Ad Creatives",
    desc: "Scroll-stopping ads rigorously designed for high ROAS on Meta & Google.",
    icon: "ads",
    bullets: ["High ROAS Focus", "Creative Testing", "Meta/Google Ads"],
    image: "/ad_creatives.png"
  }
];

/* ══════════════════════════════════════════════════════════
   GRID SERVICE CARD
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
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        borderColor: "rgba(220, 38, 38, 0.25)",
        boxShadow: "0 20px 40px rgba(220, 38, 38, 0.05)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        rectRef.current = null;
      }}
      onMouseMove={handleMouseMove}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white border border-zinc-200 overflow-hidden hover:bg-zinc-50/50 transition-colors duration-500 cursor-pointer shadow-sm"
    >
      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(220, 38, 38, 0.04),
              rgba(220, 38, 38, 0.005) 50%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Watermark Index Number */}
      <span className="absolute -right-2 -top-4 text-[6rem] font-display font-bold leading-none text-zinc-100/40 group-hover:text-zinc-200/50 transition-all duration-500 select-none pointer-events-none tracking-tighter group-hover:scale-110 group-hover:-translate-x-2 group-hover:translate-y-2">
        {num}
      </span>

      {/* Subtle Red B Logo Watermark */}
      <div className="absolute right-6 bottom-6 w-14 h-16 opacity-[0.06] pointer-events-none z-0 group-hover:opacity-[0.12] group-hover:scale-105 transition-all duration-500">
        <svg viewBox="0 0 100 116" className="w-full h-full text-[#dc2626] fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M 47.5 40 L 24 26.5 L 47.5 13 L 71 26.5 Z" />
          <path d="M 22 30.5 L 45.5 43.5 L 45.5 93.5 L 22 80.5 Z" />
          <path d="M 49.5 44.7 L 53.5 42.4 L 53.5 91.2 L 49.5 93.5 Z" />
          <path d="M 57 40.4 L 74 30.6 C 83.5 36.1, 83.5 50.1, 74 55.5 L 57 65.3 Z" />
          <path d="M 57 68.8 L 74 59.0 C 83.5 64.5, 83.5 78.4, 74 83.9 L 57 93.7 Z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#dc2626]/5 border border-[#dc2626]/20 flex items-center justify-center text-[#dc2626] group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
              {svgIcons[service.icon]}
            </div>
            <span className="px-2.5 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-800 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 group-hover:border-[#dc2626]/20 group-hover:bg-[#dc2626]/5 group-hover:text-[#dc2626]">
              Service {num}
            </span>
          </div>

          <h3 className="text-xl font-display font-bold text-[#dc2626] mb-3 leading-tight group-hover:translate-x-1.5 transition-all duration-400">
            {service.title}
          </h3>
          
          <p className="text-sm text-zinc-650 leading-relaxed mb-6 group-hover:text-zinc-800 transition-colors duration-300 font-normal">
            {service.desc}
          </p>

          {/* Service Mockup Image */}
          <div className="my-6 relative rounded-2xl overflow-hidden border border-zinc-200 aspect-[16/10] bg-zinc-50 flex items-center justify-center shadow-sm select-none pointer-events-none">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Bullets */}
        <div className="flex flex-wrap gap-2 pt-5 border-t border-zinc-100">
          {service.bullets.map((bullet, bIdx) => (
            <span
              key={bIdx}
              className="px-2.5 py-1 rounded-[0.5rem] border border-[#dc2626]/20 bg-[#dc2626]/5 text-[#dc2626] text-[9px] font-bold uppercase tracking-wider transition-all duration-300"
            >
              {bullet}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════
   MAIN SERVICES SECTION
   ══════════════════════════════════════════════════════════ */
export function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28" id="services">
      {/* Header with Title and Staggered Word Reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16 md:mb-24">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-1"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
            Our Services
          </span>
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
            className="text-4xl md:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none"
          >
            {["Everything", "Your", "Brand", "Needs."].map((w, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { y: 30, opacity: 0, filter: "blur(6px)" },
                  visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="inline-block mr-[0.25em]"
              >
                {w}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-zinc-400 light:text-zinc-600 leading-relaxed font-light lg:col-span-1"
        >
          12 core capabilities under one roof, bridging the gap between strategy, creative design, video production, and custom next-gen technology to drive unmatched organic revenue.
        </motion.p>
      </div>

      {/* Bento Grid (3 columns on desktop, responsive spans) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <ServiceBentoCard key={idx} service={service} index={idx} />
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
