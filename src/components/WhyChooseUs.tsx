import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

interface StatItemProps {
  label: string;
  target: number;
  suffix: string;
  desc: string;
}

const StatCard: React.FC<StatItemProps> = ({ label, target, suffix, desc }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // ~60fps
    let timer: number;

    const updateCount = () => {
      start += increment;
      if (start >= target) {
        setCount(target);
      } else {
        setCount(Math.floor(start));
        timer = requestAnimationFrame(updateCount);
      }
    };

    timer = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(timer);
  }, [isInView, target]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-8 md:p-10 rounded-[2.5rem] bg-zinc-950/40 border border-zinc-850 backdrop-blur-md overflow-hidden hover:border-[#dc2626]/20 transition-all duration-300 shadow-lg text-center light:bg-white/50 light:border-zinc-200"
    >
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#dc2626]/5 rounded-full blur-2xl group-hover:bg-[#dc2626]/10 transition-all duration-500" />
      
      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] block mb-4">
        {label}
      </span>
      
      <div className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none mb-4 group-hover:scale-105 transition-transform duration-300">
        {count}
        <span className="text-[#dc2626]">{suffix}</span>
      </div>

      <p className="text-sm text-zinc-400 light:text-zinc-650 leading-relaxed max-w-[240px] mx-auto">
        {desc}
      </p>
    </motion.div>
  );
};

export function WhyChooseUs() {
  const stats = [
    {
      label: "Active Scaling",
      target: 50,
      suffix: "+",
      desc: "Brands partnered and successfully scaled in their respective sectors."
    },
    {
      label: "Engineered Scope",
      target: 250,
      suffix: "+",
      desc: "High-performance digital products and premium projects delivered."
    },
    {
      label: "Organic Reach",
      target: 50,
      suffix: "M+",
      desc: "Video views and digital impressions generated across campaigns."
    },
    {
      label: "Trust Verified",
      target: 99,
      suffix: "%",
      desc: "Client satisfaction rate driven by transparency and elite execution."
    }
  ];

  return (
    <section className="py-24 md:py-36 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
            Why Partner With Us
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none">
            Metrics That Matter.
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg text-zinc-400 light:text-zinc-600 leading-relaxed"
        >
          We don't sell layouts, animations, or edits. We design strategic leverage. Every decision, line of code, and visual cut is engineered to command attention and scale conversions.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            label={stat.label}
            target={stat.target}
            suffix={stat.suffix}
            desc={stat.desc}
          />
        ))}
      </div>
    </section>
  );
}
