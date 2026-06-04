import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { cn } from "../lib/utils";

/* ───────────────── Animated Counter Hook ───────────────── */
function useCounter(target: number, duration: number = 2, inView: boolean) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration,
      ease: [0.16, 1, 0.3, 1], // expo-out
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [inView, target, duration, count, rounded]);

  return display;
}

/* ────────────────── Stats Data ────────────────── */
const stats = [
  { value: 3, suffix: "+", label: "Years Building\nBrands", accent: false },
  { value: 50, suffix: "+", label: "Brands\nServed", accent: true },
  { value: 20, suffix: "+", label: "Team\nMembers", accent: false },
  { value: 12, suffix: "", label: "Core\nServices", accent: false },
];

/* ────────────────── Reasons Data ────────────────── */
const reasons = [
  {
    num: "01",
    title: "One Team, Zero Friction",
    desc: "No agency hopping. No miscommunication. One unified team that owns your brand end to end from concept to conversion.",
  },
  {
    num: "02",
    title: "Engineered for Results",
    desc: "Every design, video, page, and campaign is built with a singular obsession: measurable business growth.",
  },
];

/* ────────────────── Testimonials Data ────────────────── */
const testimonials = [
  {
    id: 1,
    quote: "Brand Brick Studio completely overhauled our brand identity and marketing engine. We saw a 140% increase in qualified leads within 45 days. Their team is exceptionally fast and elite.",
    author: "Rohan Malhotra",
    role: "Founder, Nexus Capital",
    metrics: "140% Lead Growth",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "Their short-form content formula is magic. They didn't just edit videos—they engineered them for retention. Our channel reach exploded from 20k to 1.2M in less than two months.",
    author: "Ishita Sharma",
    role: "Growth Head, Vortex Media",
    metrics: "1.2M Reach Gained",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "Having a single team build our website, design our ads, and consult on our strategy saved us months of friction. Brand Brick is the ultimate growth partner for modern brands.",
    author: "Kabir Mehta",
    role: "CEO, Orion Retail",
    metrics: "Zero Friction Partners",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
  },
];

/* ────────────────── Marquee Text ────────────────── */
const marqueeText = "WHY BRANDS CHOOSE US  ✦  WHY BRANDS CHOOSE US  ✦  WHY BRANDS CHOOSE US  ✦  WHY BRANDS CHOOSE US  ✦  ";

/* ────────────────── MAIN COMPONENT ────────────────── */
export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });



  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-transparent px-4 md:px-6 overflow-hidden"
      id="why-us"
    >
      {/* ──── Background Glow ──── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#dc2626]/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ──── Section Header ──── */}
        <motion.div
          className="mb-20 md:mb-28"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block px-5 py-2 rounded-full border border-[#dc2626]/30 bg-[#dc2626]/5 text-[#dc2626] text-xs font-bold tracking-[0.25em] uppercase mb-6"
          >
            The Proof
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.05] max-w-4xl"
          >
            Why the best brands
            <br />
            <span className="text-[#dc2626] italic">choose us.</span>
          </motion.h2>
        </motion.div>

        {/* ──── Stats Grid ──── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-32"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
          }}
        >
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} inView={isInView} index={i} />
          ))}
        </motion.div>

        {/* ──── Standalone Marquee Ribbon (in blank space, no text overlap) ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full py-6 md:py-8 my-16 border-y border-zinc-900/60 overflow-hidden relative select-none pointer-events-none"
        >
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
          <div
            className="whitespace-nowrap text-lg md:text-2xl font-display font-black text-zinc-800/80 tracking-[0.2em] uppercase flex items-center"
            style={{
              animation: "proof-marquee 25s linear infinite",
              width: "max-content",
            }}
          >
            <span className="inline-block px-4">Why Brands Choose Us</span>
            <span className="text-[#dc2626] font-sans">✦</span>
            <span className="inline-block px-4">Engineered For Growth</span>
            <span className="text-[#dc2626] font-sans">✦</span>
            <span className="inline-block px-4">Zero Agency Friction</span>
            <span className="text-[#dc2626] font-sans">✦</span>
            <span className="inline-block px-4">Elite Execution</span>
            <span className="text-[#dc2626] font-sans">✦</span>

            <span className="inline-block px-4">Why Brands Choose Us</span>
            <span className="text-[#dc2626] font-sans">✦</span>
            <span className="inline-block px-4">Engineered For Growth</span>
            <span className="text-[#dc2626] font-sans">✦</span>
            <span className="inline-block px-4">Zero Agency Friction</span>
            <span className="text-[#dc2626] font-sans">✦</span>
            <span className="inline-block px-4">Elite Execution</span>
            <span className="text-[#dc2626] font-sans">✦</span>
          </div>
        </motion.div>

        {/* ──── Divider Line ──── */}
        <motion.div
          className="h-px w-full mb-20 md:mb-28 overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        >
          <div className="h-full w-full bg-gradient-to-r from-[#dc2626]/60 via-zinc-800 to-transparent" />
        </motion.div>

        {/* ──── Reasons ──── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2, delayChildren: 1 } },
          }}
        >
          {reasons.map((reason, i) => (
            <ReasonCard key={i} reason={reason} />
          ))}
        </motion.div>

        {/* ──── Client Testimonials ──── */}
        <div className="mt-28 pt-20 border-t border-zinc-900/60 w-full">
          <div className="mb-12 text-center md:text-left">
            <span className="text-[#dc2626] text-xs font-mono font-bold uppercase tracking-[0.2em]">Client Success</span>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white mt-2">What founders say about us.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 w-full">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col justify-between p-6 md:p-8 bg-zinc-950/25 border border-zinc-900/80 hover:border-[#dc2626]/30 rounded-[2rem] backdrop-blur-md transition-all duration-500 group overflow-hidden"
              >
                {/* Glowing radial accent background */}
                <div className="absolute -inset-px bg-gradient-to-br from-[#dc2626]/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-5">
                  {/* Top row: stars + metrics */}
                  <div className="flex items-center justify-between">
                    {/* Glowing Stars */}
                    <div className="flex gap-1 text-[#dc2626]">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>

                    {/* Metric badge */}
                    <span className="text-[10px] font-mono font-bold text-[#dc2626] bg-[#dc2626]/10 border border-[#dc2626]/20 px-2.5 py-1 rounded-md tracking-wider">
                      {testimonial.metrics}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative mt-2">
                    <span className="text-4xl font-serif text-[#dc2626]/20 absolute -top-4 -left-2 select-none">“</span>
                    <p className="relative z-10 pl-3 text-zinc-300 text-sm md:text-[15px] font-light leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>

                {/* Profile + Author Details */}
                <div className="relative z-10 flex items-center gap-3.5 mt-8 pt-5 border-t border-zinc-900/80">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-800/80 group-hover:ring-[#dc2626]/20 transition-all duration-500"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-100 tracking-wide">{testimonial.author}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5 tracking-wide">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ──── Marquee Keyframes ──── */}
      <style>{`
        @keyframes proof-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ────────────────── Stat Card ────────────────── */
function StatCard({
  stat,
  inView,
  index,
}: {
  stat: (typeof stats)[number];
  inView: boolean;
  index: number;
  key?: any;
}) {
  const count = useCounter(stat.value, 2.2, inView);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 18,
          },
        },
      }}
      className={`group relative rounded-3xl p-6 md:p-8 border overflow-hidden cursor-default transition-all duration-500
        ${stat.accent
          ? "bg-gradient-to-br from-[#dc2626] to-[#991b1b] border-[#dc2626]/50 shadow-[0_0_40px_rgba(220,38,38,0.15)]"
          : "bg-zinc-900/50 border-zinc-800/60 hover:border-[#dc2626]/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]"
        }`}
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl
        ${stat.accent ? "" : "bg-gradient-to-br from-[#dc2626]/[0.06] via-transparent to-transparent"}`}
      />

      <div className="relative z-10">
        <div className="flex items-baseline gap-1 mb-4">
          <span
            className={`text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-none tabular-nums
              ${stat.accent ? "text-white" : "text-white"}`}
          >
            {count}
          </span>
          {stat.suffix && (
            <span
              className={`text-3xl md:text-4xl font-display font-bold
                ${stat.accent ? "text-white/80" : "text-[#dc2626]"}`}
            >
              {stat.suffix}
            </span>
          )}
        </div>
        <span
          className={`text-xs md:text-sm font-bold uppercase tracking-[0.15em] whitespace-pre-line leading-snug
            ${stat.accent ? "text-white/70" : "text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300"}`}
        >
          {stat.label}
        </span>
      </div>

      {/* Decorative corner index */}
      <span
        className={`absolute bottom-3 right-4 text-[10px] font-mono font-bold tracking-wider
          ${stat.accent ? "text-white/20" : "text-zinc-800 group-hover:text-zinc-700 transition-colors duration-300"}`}
      >
        0{index + 1}
      </span>
    </motion.div>
  );
}

/* ────────────────── Reason Card ────────────────── */
function ReasonCard({ reason }: { reason: (typeof reasons)[number]; key?: any }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group relative flex gap-6 md:gap-8"
    >
      {/* Animated vertical accent bar */}
      <div className="relative flex flex-col items-center shrink-0">
        <span className="text-[#dc2626] text-sm font-mono font-bold mb-3">{reason.num}</span>
        <div className="w-px flex-1 bg-zinc-800 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 w-full bg-gradient-to-b from-[#dc2626] to-[#dc2626]/30 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top rounded-full" />
        </div>
      </div>

      <div className="pt-0.5">
        <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 group-hover:text-[#dc2626] transition-colors duration-300">
          {reason.title}
        </h3>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md group-hover:text-zinc-300 transition-colors duration-300">
          {reason.desc}
        </p>
      </div>
    </motion.div>
  );
}
