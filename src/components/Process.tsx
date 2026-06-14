import React, { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { Compass, Target, PenTool, Code, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Discovery",
    desc: "We dive deep into your business objectives, audit brand assets, map out competitor landscapes, and uncover customer psychographics.",
    deliverables: ["Brand audit report", "Competitor matrix", "Audience research"],
    image: "/process_discovery.png"
  },
  {
    icon: Target,
    title: "Strategy",
    desc: "We define your brand positioning, formulate marketing campaigns, design a vertical video strategy, and outline an SEO roadmap.",
    deliverables: ["Positioning blueprint", "Reels calendar", "SEO & Playbook"],
    image: "/process_strategy.png"
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "We translate strategic direction into high-fidelity premium visual assets, corporate brand systems, and sleek UI layouts.",
    deliverables: ["Brand guidelines", "Figma UI/UX layouts", "Campaign mockups"],
    image: "/process_design.png"
  },
  {
    icon: Code,
    title: "Development",
    desc: "We construct custom frontend experiences in React/Next.js, ensuring smooth micro-animations, lightning-fast loading speeds, and robust SEO tags.",
    deliverables: ["React / Next.js code", "Analytics & Tracking", "Domain deployment"],
    image: "/process_development.png"
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "We test across viewports, run accessibility audits, verify page speeds, and push the campaign/website live with zero downtime.",
    deliverables: ["Cross-browser QA check", "Production build", "Live launch validation"],
    image: "/process_launch.png"
  },
  {
    icon: BarChart3,
    title: "Growth",
    desc: "We scale your client acquisitions through continuous conversion audits, creative A/B testing, and data-driven updates.",
    deliverables: ["Conversion rate audit", "A/B test logs", "Expansion sprints"],
    image: "/process_growth.png"
  }
];

const ProcessCard: React.FC<{
  step: typeof steps[number];
  index: number;
}> = ({
  step,
  index
}) => {
  const IconComp = step.icon;
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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
      }}
      className="group relative flex flex-col justify-between p-8 rounded-[2.5rem] border border-zinc-200 bg-white overflow-hidden hover:bg-zinc-50/50 transition-all duration-300 cursor-pointer shadow-sm"
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
          {/* Step Index & Icon */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#dc2626]/5 border border-[#dc2626]/20 flex items-center justify-center text-[#dc2626] group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
              <IconComp size={20} className="transition-transform duration-300" />
            </div>
            <span className="px-2.5 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-800 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 group-hover:border-[#dc2626]/20 group-hover:bg-[#dc2626]/5 group-hover:text-[#dc2626]">
              STEP {num}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-xl md:text-2xl font-display font-bold text-[#dc2626] mb-3 leading-tight group-hover:translate-x-1.5 transition-all duration-400">
            {step.title}
          </h3>
          <p className="text-sm text-zinc-650 leading-relaxed mb-6 font-normal group-hover:text-zinc-800 transition-colors duration-300">
            {step.desc}
          </p>

          {/* Step Mockup Image */}
          <div className="my-6 relative rounded-2xl overflow-hidden border border-zinc-200 aspect-square bg-zinc-50 flex items-center justify-center shadow-sm select-none pointer-events-none">
            <img 
              src={step.image} 
              alt={step.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Deliverables tags */}
      <div className="relative z-10 border-t border-zinc-100 pt-5 flex flex-wrap gap-2">
        {step.deliverables.map((del, dIdx) => (
          <span
            key={dIdx}
            className="px-3 py-1 rounded-[0.5rem] border border-[#dc2626]/20 bg-[#dc2626]/5 text-[#dc2626] text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
          >
            {del}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export function Process() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28" id="process">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-24"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 light:border-zinc-200 light:bg-white/50">
          Our Process
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
          {["How", "We", "Build", "Empires."].map((w, idx) => (
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

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {/* Subtle timeline track overlay for decorative purpose */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent hidden lg:block pointer-events-none -translate-y-1/2" />
        
        {steps.map((step, idx) => (
          <ProcessCard key={idx} step={step} index={idx} />
        ))}
      </div>
    </section>
  );
}
