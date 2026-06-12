import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useDeviceProfile } from "../lib/useDeviceProfile";

const MetaIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <path d="M7 16c0-5 3-9 5.5-9S16 11 16 16s3.5 9 5.5 9S27 21 27 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M27 16c0 5-3 9-5.5 9S16 21 16 16s-3.5-9-5.5-9S7 11 7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <path d="M6 24L16 6l10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="24" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const WordPressIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <path d="M4 8l5 16 3-10 3 10 5-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 8l5 16 3-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="2" y1="28" x2="30" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const LandingPageIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <rect x="6" y="3" width="20" height="26" rx="2.5" stroke="currentColor" strokeWidth="2" />
    <path d="M11 10h10M11 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 18v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 21l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CRMIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <circle cx="16" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="7" cy="24" r="3.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="25" cy="24" r="3.5" stroke="currentColor" strokeWidth="2" />
    <path d="M14 11L9 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 11l5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10.5 24h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SEOIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 16l3-4 3 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const tools = [
  {
    id: "meta",
    title: "Meta Ads",
    desc: "Precision-targeted campaigns on Facebook & Instagram that turn scrollers into paying customers.",
    metric: "4.2x",
    metricLabel: "Avg. ROAS",
    icon: <MetaIcon />,
    color: "#dc2626",
  },
  {
    id: "google",
    title: "Google Ads",
    desc: "Intent-capturing search & display campaigns built to dominate when it matters most.",
    metric: "320%",
    metricLabel: "Traffic Lift",
    icon: <GoogleIcon />,
    color: "#dc2626",
  },
  {
    id: "wordpress",
    title: "Web Architecture",
    desc: "Scalable, manageable websites that look premium and load in milliseconds.",
    metric: "0.8s",
    metricLabel: "Avg. Load",
    icon: <WordPressIcon />,
    color: "#dc2626",
  },
  {
    id: "landing",
    title: "Landing Pages",
    desc: "Conversion-obsessed single-page experiences for launches, offers, and funnels.",
    metric: "12%",
    metricLabel: "Conv. Rate",
    icon: <LandingPageIcon />,
    color: "#dc2626",
  },
  {
    id: "crm",
    title: "CRM Workflows",
    desc: "Automated systems that eliminate chaos and keep your team in perfect sync.",
    metric: "60%",
    metricLabel: "Time Saved",
    icon: <CRMIcon />,
    color: "#dc2626",
  },
  {
    id: "seo",
    title: "SEO & Content",
    desc: "Data-backed optimization that puts you on page one and keeps you there.",
    metric: "#1",
    metricLabel: "Page Rank",
    icon: <SEOIcon />,
    color: "#dc2626",
  },
];

export function Stack() {
  const { isMobile, lowPerformanceMode } = useDeviceProfile();
  const [activeTool, setActiveTool] = useState(tools[0]);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const displayTool = tools.find((t) => t.id === hoveredTool) || activeTool;

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-transparent overflow-hidden px-4 md:px-0" id="stack">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[150px] opacity-5 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: displayTool.color }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
            Our Growth Engine
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            The architecture of <span className="text-[#dc2626] italic">scale.</span>
          </h2>
        </motion.div>

        <motion.div
          className="relative w-full max-w-4xl min-h-[420px] md:min-h-0 md:aspect-[21/9] rounded-[2rem] md:rounded-3xl border-solid border-[1px] bg-[#050505]/80 backdrop-blur-2xl md:backdrop-blur-3xl overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between p-6 sm:p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95, borderColor: "rgba(220,38,38,0.1)", boxShadow: "0 20px 60px -15px rgba(0,0,0,0.8), 0 0 0px 0px rgba(220,38,38,0)" }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  ...(lowPerformanceMode
                    ? {}
                    : {
                        boxShadow: [
                          "0 20px 60px -15px rgba(0,0,0,0.8), 0 0 10px 0px rgba(220,38,38,0.1)",
                          "0 20px 60px -15px rgba(0,0,0,0.8), 0 0 20px 2px rgba(220,38,38,0.25)",
                          "0 20px 60px -15px rgba(0,0,0,0.8), 0 0 10px 0px rgba(220,38,38,0.1)",
                        ],
                        borderColor: [
                          "rgba(220,38,38,0.1)",
                          "rgba(220,38,38,0.3)",
                          "rgba(220,38,38,0.1)",
                        ],
                      }),
                }
              : {}
          }
          transition={{
            opacity: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            ...(lowPerformanceMode
              ? {}
              : {
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }),
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={displayTool.id}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center h-full max-w-md z-10 w-full"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-inner"
                style={{ backgroundColor: `${displayTool.color}15`, color: displayTool.color }}
              >
                <div className="w-6 h-6">{displayTool.icon}</div>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">
                {displayTool.title}
              </h3>
              <p className="text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                {displayTool.desc}
              </p>

              <div>
                <div
                  className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-1 transition-colors duration-500"
                  style={{ color: displayTool.color }}
                >
                  {displayTool.metric}
                </div>
                <div className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                  {displayTool.metricLabel}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={`absolute right-[-10%] md:right-0 top-0 bottom-0 w-[80%] md:w-1/2 ${isMobile ? "opacity-10" : "opacity-20"} pointer-events-none overflow-hidden flex items-center justify-center`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={displayTool.id}
                initial={{ opacity: 0, scale: lowPerformanceMode ? 1 : 0.8, rotate: lowPerformanceMode ? 0 : -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: lowPerformanceMode ? 1 : 1.1, rotate: lowPerformanceMode ? 0 : 15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative flex items-center justify-center w-full h-full"
                style={{ color: displayTool.color }}
              >
                <div className="absolute w-[150%] h-[150%] blur-3xl opacity-30">{displayTool.icon}</div>
                <div className="absolute w-[80%] h-[80%] opacity-50 drop-shadow-[0_0_20px_currentColor]">{displayTool.icon}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-20 relative w-full md:w-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 md:gap-10 px-4 sm:px-6 md:px-12 py-4 md:py-8 rounded-[2rem] md:rounded-[2.5rem] border border-zinc-800/50 bg-[#050505]/40 backdrop-blur-2xl shadow-2xl overflow-x-auto hide-scrollbar w-full max-w-full">
            {tools.map((tool) => {
              const isHovered = hoveredTool === tool.id;
              const isActive = activeTool.id === tool.id && !hoveredTool;

              return (
                <button
                  key={tool.id}
                  onMouseEnter={() => !lowPerformanceMode && setHoveredTool(tool.id)}
                  onMouseLeave={() => !lowPerformanceMode && setHoveredTool(null)}
                  onClick={() => setActiveTool(tool)}
                  className="relative group transition-all duration-300 outline-none shrink-0"
                >
                  <motion.div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center relative z-10 border-solid border-[1px]"
                    animate={{
                      scale: isHovered ? 1.18 : isActive ? 1.08 : 1,
                      y: isHovered && !lowPerformanceMode ? -8 : 0,
                      ...(lowPerformanceMode
                        ? {
                            boxShadow: isActive ? "0 0 18px 0 rgba(220,38,38,0.24)" : "0 0 0 0 rgba(220,38,38,0)",
                            borderColor: isActive ? "rgba(220,38,38,0.55)" : "rgba(220,38,38,0.16)",
                          }
                        : {
                            boxShadow: isHovered || isActive
                              ? [
                                  "0 0 10px 0px rgba(220,38,38,0.3)",
                                  "0 0 20px 4px rgba(220,38,38,0.5)",
                                  "0 0 10px 0px rgba(220,38,38,0.3)",
                                ]
                              : [
                                  "0 0 2px 0px rgba(220,38,38,0.1)",
                                  "0 0 5px 1px rgba(220,38,38,0.2)",
                                  "0 0 2px 0px rgba(220,38,38,0.1)",
                                ],
                            borderColor: isHovered || isActive
                              ? [
                                  "rgba(220,38,38,0.3)",
                                  "rgba(220,38,38,0.7)",
                                  "rgba(220,38,38,0.3)",
                                ]
                              : [
                                  "rgba(220,38,38,0.1)",
                                  "rgba(220,38,38,0.3)",
                                  "rgba(220,38,38,0.1)",
                                ],
                          }),
                    }}
                    transition={{
                      ...(lowPerformanceMode
                        ? {}
                        : {
                            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                            borderColor: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                          }),
                      default: { type: "spring", stiffness: 300, damping: 20 },
                    }}
                    style={{
                      backgroundColor: isHovered || isActive ? `${tool.color}15` : `${tool.color}08`,
                      color: isHovered || isActive ? tool.color : `${tool.color}70`,
                    }}
                  >
                    <div className="w-6 h-6 md:w-7 md:h-7">{tool.icon}</div>
                  </motion.div>

                  <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0,
                      backgroundColor: tool.color,
                      boxShadow: `0 0 8px ${tool.color}`,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
