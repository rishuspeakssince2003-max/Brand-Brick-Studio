import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const editorialWorks = [
  {
    num: "01",
    category: "Brand & Identity",
    title: "The Brand Brick Identity",
    subtitle: "Minimalist 3D Sculptures & Physical Brand Encounters",
    desc: "Crafting ultra-premium physical and digital identities. Concrete foundations, translucent layers, and high-impact structural palettes designed to command presence and solidify market authority.",
    img: "/brand_identity_mockup.png",
    metric: "Premium Brand Value",
    metricLabel: "Design Standard"
  },
  {
    num: "02",
    category: "Digital Architecture",
    title: "The Editorial Framework",
    subtitle: "High-Contrast Digital Typographic Portals",
    desc: "A web presence built for modern publications and fashion houses. Combining large, bold serif headers, smooth inertial scrolling, and fluid animations for elite digital storytelling.",
    img: "/web_design_showcase.png",
    metric: "Typographic Portals",
    metricLabel: "Core Experience"
  },
  {
    num: "03",
    category: "Cinematic Motion",
    title: "The Volumetric Motion",
    subtitle: "High-Retention Visual Direction & Narrative Sprints",
    desc: "Engineered for volumetric lighting, cinematic color scales, and dramatic retention profiles. We direct commercial frames that captivate instantly and drive massive customer conversion.",
    img: "/video_production_frame.png",
    metric: "Volumetric Lights",
    metricLabel: "Cinematic Grade"
  }
];

export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      id="showcase" 
      className="py-24 md:py-36 px-4 md:px-6 max-w-7xl mx-auto relative overflow-hidden scroll-mt-24 md:scroll-mt-28"
    >
      {/* Background glow spot */}
      <div className="absolute top-[30%] left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-[#dc2626]/[0.03] blur-[150px] rounded-full pointer-events-none" />

      {/* Header Container */}
      <div className="mb-20 border-b border-zinc-900/60 light:border-zinc-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <span className="inline-flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <Sparkles size={12} /> The Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none">
            Editorial <span className="text-[#dc2626] italic">Showcase.</span>
          </h2>
        </div>
        <p className="text-zinc-500 light:text-zinc-600 text-sm md:text-base font-light max-w-sm leading-relaxed">
          A curated selection of design, code, and cinematic content built to position brands at the absolute top of their market.
        </p>
      </div>

      {/* Editorial Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {editorialWorks.map((work, index) => (
          <motion.div
            key={work.num}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col border border-zinc-900/40 bg-zinc-950/20 rounded-[2rem] p-6 md:p-8 backdrop-blur-sm relative overflow-hidden hover:border-[#dc2626]/40 hover:bg-[#dc2626]/[0.01] transition-all duration-500 light:bg-white/40 light:border-zinc-200 hover:light:border-[#dc2626]/30 hover:light:bg-zinc-50/30"
          >
            {/* Tag & Number Row */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] md:text-xs font-mono font-bold text-[#dc2626] bg-[#dc2626]/10 border border-[#dc2626]/20 px-2.5 py-1 rounded-md uppercase tracking-wider light:bg-red-50 light:border-red-100">
                {work.category}
              </span>
              <span className="text-2xl font-display font-light text-zinc-800/80 light:text-zinc-300">
                {work.num}
              </span>
            </div>

            {/* Editorial Image Wrapper with Mask */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-zinc-900/60 light:border-zinc-200 relative group/img cursor-pointer shadow-lg">
              <img 
                src={work.img} 
                alt={work.title} 
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-[#dc2626]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Case Study Details */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-tight mb-2 group-hover:text-brand transition-colors duration-300 flex items-center gap-1.5 cursor-pointer">
                  {work.title}
                  <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-brand transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <h4 className="text-[11px] md:text-xs text-zinc-500 light:text-zinc-500 uppercase tracking-widest leading-snug font-bold mb-4 font-display">
                  {work.subtitle}
                </h4>
                <p className="text-zinc-400 light:text-zinc-600 text-xs md:text-sm leading-relaxed font-light mb-6">
                  {work.desc}
                </p>
              </div>

              {/* Metric block at bottom of column */}
              <div className="pt-5 border-t border-zinc-900/60 light:border-zinc-150 flex items-center justify-between mt-auto">
                <div>
                  <div className="text-sm font-display font-bold text-white light:text-zinc-800 tracking-tight">
                    {work.metric}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mt-0.5">
                    {work.metricLabel}
                  </div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shadow-[0_0_8px_#dc2626]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
