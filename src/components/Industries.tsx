import React, { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { Building2, UtensilsCrossed, Coffee, Hotel, Sparkles, ShoppingBag } from "lucide-react";

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
    title: "E-commerce & D2C Brands",
    desc: "We craft high-yield D2C digital storefronts, premium product packaging designs, and conversion-optimized ad creatives that scale transaction volumes and repeat acquisitions.",
    icon: ShoppingBag,
    tag: "Scale & Volume"
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
              {ind.tag}
            </span>
          </div>

          <h4 className="text-xl font-display font-bold text-[#dc2626] mb-3 group-hover:translate-x-1.5 transition-all duration-400">
            {ind.title}
          </h4>
          
          <p className="text-sm text-zinc-650 leading-relaxed group-hover:text-zinc-800 transition-colors duration-300 font-normal">
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
        <p className="text-lg text-zinc-400 light:text-zinc-600 leading-relaxed max-w-2xl">
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
