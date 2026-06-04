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

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote);
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role);
  const [displayedMetric, setDisplayedMetric] = useState(testimonials[0].metrics);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(window.innerWidth < 768);
    const handleResize = () => setIsMobileDevice(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote);
      setDisplayedRole(testimonials[index].role);
      setDisplayedMetric(testimonials[index].metrics);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 400);
    }, 200);
  };

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
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2">What founders say about us.</h3>
          </div>
          
          <div className="flex flex-col items-center gap-10 py-10 md:py-16 bg-zinc-950/20 border border-zinc-900/60 rounded-[2.5rem] px-6 md:px-12 backdrop-blur-md relative overflow-hidden">
            {/* Glowing spot in the middle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#dc2626]/5 blur-[80px] rounded-full pointer-events-none" />

            {/* Quote Container */}
            <div className="relative px-4 md:px-12 w-full flex flex-col items-center min-h-[180px] md:min-h-[130px] justify-center z-10">
              <span className="absolute left-0 md:left-6 top-0 text-7xl md:text-8xl font-serif text-[#dc2626]/[0.08] select-none pointer-events-none">
                “
              </span>

              <p
                className={cn(
                  "text-base sm:text-lg md:text-xl lg:text-2xl font-light text-zinc-200 text-center max-w-2xl leading-relaxed transition-all duration-400 ease-out",
                  isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100",
                )}
              >
                {displayedQuote}
              </p>

              <span className="absolute right-0 md:right-6 bottom-0 text-7xl md:text-8xl font-serif text-[#dc2626]/[0.08] select-none pointer-events-none">
                ”
              </span>
            </div>

            <div className="flex flex-col items-center gap-6 mt-2 z-10 w-full">
              {/* Metadata row: Role + Metric tag */}
              <div
                className={cn(
                  "flex flex-col sm:flex-row items-center gap-3 transition-all duration-500 ease-out text-center",
                  isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
                )}
              >
                <p className="text-xs text-zinc-500 tracking-[0.2em] uppercase font-semibold">
                  {displayedRole}
                </p>
                <span className="hidden sm:inline text-zinc-800">•</span>
                <span className="text-[10px] font-mono font-bold text-[#dc2626] bg-[#dc2626]/10 border border-[#dc2626]/20 px-2.5 py-1 rounded-md shrink-0">
                  {displayedMetric}
                </span>
              </div>

              {/* Avatar Selector Grid */}
              <div className="flex items-center justify-center gap-2 md:gap-3 flex-nowrap max-w-full overflow-x-auto hide-scrollbar py-2">
                {testimonials.map((testimonial, index) => {
                  const isActive = activeIndex === index;
                  // Only allow hover name expansion on desktop (non-mobile) devices to prevent layout shift/wrapping bugs on touchscreens
                  const isHovered = hoveredIndex === index && !isActive && !isMobileDevice;
                  const showName = isActive || isHovered;

                  return (
                    <button
                      key={testimonial.id}
                      onClick={() => handleSelect(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={cn(
                        "relative flex items-center rounded-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border border-transparent shadow-md shrink-0",
                        isActive 
                          ? "bg-[#dc2626] border-[#dc2626]/50 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] pr-4 pl-1.5 py-1.5" 
                          : "bg-zinc-900/40 hover:bg-zinc-900/80 border-zinc-850 text-zinc-400 hover:text-zinc-200 p-1.5",
                        showName && !isActive ? "pr-4 pl-1.5 py-1.5" : ""
                      )}
                    >
                      {/* Avatar with smooth ring animation */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className={cn(
                            "w-8 h-8 rounded-full object-cover",
                            "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                            isActive ? "ring-2 ring-white/20" : "ring-0",
                            !isActive && "hover:scale-105",
                          )}
                        />
                      </div>

                      <div
                        className={cn(
                          "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                          showName ? "grid-cols-[1fr] opacity-100 ml-2" : "grid-cols-[0fr] opacity-0 ml-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <span
                            className={cn(
                              "text-xs font-bold whitespace-nowrap block tracking-wide",
                              "transition-colors duration-300",
                              isActive ? "text-white" : "text-zinc-300",
                            )}
                          >
                            {testimonial.author}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
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
