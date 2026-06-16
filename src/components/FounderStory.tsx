import React, { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { Quote } from "lucide-react";

export function FounderStory() {
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

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28" id="founder">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Visual Frame */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 relative aspect-[657/1024] max-w-md lg:max-w-none rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-zinc-950/40 backdrop-blur-md flex items-center justify-center light:border-zinc-200 light:bg-white/50 light:shadow-lg"
        >
          {/* Founder Image */}
          <img 
            src="/founder.jpg" 
            alt="Rishu Tripathi" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          
          {/* Dark gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col items-end text-right">
            <span className="text-2xl font-display font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Rishu Tripathi</span>
            <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Founder & Lead Strategist</span>
          </div>
        </motion.div>

        {/* Narrative Column */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
              Founder Story
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
              {["Rishu", "Tripathi."].map((w, idx) => (
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
            <h3 className="text-lg md:text-xl font-display font-bold text-zinc-400 light:text-zinc-600 mb-8 leading-tight">
              Strategy-First Creative Agency Leadership
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-zinc-400 light:text-zinc-600 leading-relaxed"
          >
            <p className="text-lg font-light">
              I started Brand Brick Studio because I saw tremendous opportunities for businesses to grow through{" "}
              <span className="text-white light:text-zinc-900 font-semibold transition-colors duration-300">
                strong branding, powerful websites, and a strategic digital presence.
              </span>
            </p>
            
            <p className="text-base font-light">
              Ambitious brands don't need cookie-cutter templates or bloated agency teams that operate without direct alignment. They need{" "}
              <span className="text-white light:text-zinc-900 font-semibold transition-colors duration-300">
                unified execution
              </span>{" "}
              — where strategy, visual design, software engineering, and customer acquisition operate as a{" "}
              <span className="text-white light:text-zinc-900 font-semibold transition-colors duration-300">
                single engine.
              </span>
            </p>
            
            <div className="pt-8">
              <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  rectRef.current = null;
                }}
                onMouseMove={handleMouseMove}
                className="group flex gap-4 p-8 rounded-3xl bg-white border border-zinc-200 hover:bg-zinc-50/50 shadow-sm relative overflow-hidden transition-all duration-500 hover:border-[#dc2626]/20 cursor-pointer"
              >
                {/* Interactive Spotlight */}
                <motion.div
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{
                    background: useMotionTemplate`
                      radial-gradient(
                        250px circle at ${mouseX}px ${mouseY}px,
                        rgba(220, 38, 38, 0.04),
                        rgba(220, 38, 38, 0.005) 40%,
                        transparent 80%
                      )
                    `,
                  }}
                />
                <Quote size={36} className="text-[#dc2626] shrink-0 opacity-40 mt-1 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col gap-2 relative z-10">
                  <p className="text-zinc-800 font-medium italic text-lg leading-relaxed group-hover:text-zinc-950 transition-colors duration-300">
                    "I started Brand Brick Studio because I saw tremendous opportunities for businesses to grow through strong branding, powerful websites, and a strategic digital presence."
                  </p>
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mt-2 group-hover:text-[#dc2626] transition-colors duration-300">
                    — Rishu Tripathi, Founder
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
