import React, { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { Compass, Layers, MapPin, Award, UserCheck, BarChart3 } from "lucide-react";

const pillars = [
  {
    title: "Strategy-First Approach",
    desc: "We don't just push pixels or run cookie-cutter templates. We dissect your business model and engineer strategic brand assets.",
    icon: Compass
  },
  {
    title: "One-Stop Solution",
    desc: "We deliver everything from naming blueprints and premium brand identities to custom Next.js software setups and high-yield acquisition funnels.",
    icon: Layers
  },
  {
    title: "Local Market Understanding",
    desc: "We maintain a deep understanding of regional business dynamics, customer psychographics, and local competitive densities.",
    icon: MapPin
  },
  {
    title: "Global Creative Standards",
    desc: "We produce world-class campaign aesthetics inspired by global design hubs to attract international clients.",
    icon: Award
  },
  {
    title: "Founder-Led Execution",
    desc: "You will coordinate and plan strategy directly with founder Rishu Tripathi, ensuring zero account managers and pure alignment.",
    icon: UserCheck
  },
  {
    title: "Business-Focused Thinking",
    desc: "We put creativity in service of commercial growth, designing visual experiences specifically configured to drive revenue.",
    icon: BarChart3
  }
];

const PillarCard: React.FC<{
  pillar: typeof pillars[number];
  index: number;
}> = ({
  pillar,
  index
}) => {
  const Icon = pillar.icon;
  const [isHovered, setIsHovered] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    mouseX.set(e.clientX - rectRef.current.left);
    mouseY.set(e.clientY - rectRef.current.top);
  }

  const num = String(index + 1).padStart(2, "0");

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
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
              <Icon size={22} />
            </div>
            <span className="px-2.5 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-800 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 group-hover:border-[#dc2626]/20 group-hover:bg-[#dc2626]/5 group-hover:text-[#dc2626]">
              Pillar {num}
            </span>
          </div>

          <h3 className="text-xl font-display font-bold text-[#dc2626] mb-3 group-hover:translate-x-1.5 transition-all duration-400">
            {pillar.title}
          </h3>
          
          <p className="text-sm text-zinc-650 leading-relaxed group-hover:text-zinc-800 transition-colors duration-300 font-normal">
            {pillar.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28" id="why-us">
      {/* Header with Strategic Leverage 3D Render Asset */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16 md:mb-24">
        <div className="flex flex-col gap-6 lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
              Why Brand Brick Studio
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
              {["Strategic", "Leverage."].map((w, idx) => (
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
            className="text-base md:text-lg text-zinc-400 light:text-zinc-600 leading-relaxed font-light"
          >
            "We don't just create designs. We create brand experiences that help businesses grow." We align strategy, creativity, and business focus under one unified execution team.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden border border-zinc-200 bg-white aspect-[16/10] flex items-center justify-center shadow-sm group cursor-pointer lg:col-span-1"
        >
          <img 
            src="/strategic_leverage.png" 
            alt="Strategic Leverage Mockup" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => (
          <PillarCard key={idx} pillar={pillar} index={idx} />
        ))}
      </div>
    </section>
  );
}
