import React, { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { Building2, UtensilsCrossed, Coffee, Hotel, Sparkles } from "lucide-react";

const industriesList = [
  {
    title: "Real Estate Developers",
    desc: "We design premium property branding, immersive physical sales brochures, and high-performance digital pre-launch portals to accelerate booking cycles.",
    icon: Building2,
    tag: "High-Ticket Lead Gen"
  },
  {
    title: "Restaurants & Dining",
    desc: "We craft visual menus, produce cinematic culinary content, and implement local map SEO strategies that turn digital foot traffic into packed dining rooms.",
    icon: UtensilsCrossed,
    tag: "Foot Traffic Engine"
  },
  {
    title: "Specialty Cafés",
    desc: "We develop sleek, modern packaging designs, clear brand guidelines, and high-retention social media reels that turn coffee drinkers into brand evangelists.",
    icon: Coffee,
    tag: "Community Building"
  },
  {
    title: "Hospitality Brands",
    desc: "We engineer premium boutique resort branding, immersive spatial website layouts, and high-end volumetric campaign video shoots that command luxury bookings.",
    icon: Hotel,
    tag: "Luxury Positioning"
  },
  {
    title: "Ambitious Growth Businesses",
    desc: "We provide strategy-first visual design, high-converting React software builds, and multi-channel performance marketing structures to scale conversions.",
    icon: Sparkles,
    tag: "Full-Stack Scale"
  }
];

const IndustryCard: React.FC<{
  ind: typeof industriesList[number];
  index: number;
}> = ({
  ind,
  index
}) => {
  const Icon = ind.icon;
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
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-8 md:p-10 rounded-[2.5rem] bg-zinc-950/40 border border-zinc-850 backdrop-blur-md overflow-hidden hover:bg-zinc-950/60 transition-colors duration-500 cursor-pointer light:bg-white/50 light:border-zinc-200 light:hover:bg-zinc-100/50"
    >
      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(220, 38, 38, 0.12),
              rgba(220, 38, 38, 0.02) 40%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Watermark Index Number */}
      <span className="absolute -right-2 -top-4 text-[6rem] font-display font-bold leading-none text-white/[0.01] light:text-zinc-900/[0.01] group-hover:text-[#dc2626]/[0.03] transition-all duration-500 select-none pointer-events-none tracking-tighter group-hover:scale-110 group-hover:-translate-x-2 group-hover:translate-y-2">
        {num}
      </span>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-[#dc2626] group-hover:border-[#dc2626]/20 group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 light:bg-zinc-50 light:border-zinc-200">
              <Icon size={22} />
            </div>
            <span className="px-2.5 py-0.5 rounded-md border border-zinc-850 bg-zinc-900/40 text-zinc-450 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 group-hover:border-[#dc2626]/20 group-hover:bg-[#dc2626]/5 group-hover:text-[#dc2626] light:border-zinc-200 light:bg-zinc-50 light:text-zinc-500">
              {ind.tag}
            </span>
          </div>

          <h4 className="text-xl font-display font-bold text-white light:text-zinc-900 mb-3 group-hover:text-[#dc2626] group-hover:translate-x-1.5 transition-all duration-400">
            {ind.title}
          </h4>
          
          <p className="text-sm text-zinc-400 light:text-zinc-650 leading-relaxed group-hover:text-zinc-300 light:group-hover:text-zinc-800 transition-colors duration-300">
            {ind.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export function Industries() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28" id="industries">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-24"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
          Industries We Help
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
          className="text-4xl md:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none mb-6"
        >
          {["Sectors", "We", "Scale."].map((w, idx) => (
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
        <p className="text-lg text-zinc-400 light:text-zinc-655 leading-relaxed max-w-2xl">
          We focus on industries where visual prestige, brand strategy, and speed of digital execution determine market leadership.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industriesList.map((ind, idx) => (
          <IndustryCard key={idx} ind={ind} index={idx} />
        ))}
      </div>
    </section>
  );
}
