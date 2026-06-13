import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";
import { LiquidButton } from "./ui/LiquidButton";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-transparent relative overflow-hidden flex items-center justify-center min-h-[30vh] scroll-mt-24 md:scroll-mt-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#dc2626]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.25em] uppercase mb-8 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
            Let's Collaborate
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
            className="text-5xl md:text-8xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-[0.95] mb-12"
          >
            {["Ready", "To", "Build", "\n", "Something", "Remarkable?"].map((w, idx) => {
              if (w === "\n") {
                return <br key={idx} />;
              }
              return (
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
              );
            })}
          </motion.h2>

          <LiquidButton
            href="https://wa.me/917383386318"
            target="_blank"
            rel="noreferrer"
            variant="solid"
            size="lg"
            className="inline-flex gap-3 items-center"
          >
            <MessageSquare size={18} className="fill-current" />
            Start on WhatsApp
          </LiquidButton>
          
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-6">
            Direct Line to Rishu Tripathi / Response under 2 Hours
          </span>
        </motion.div>
      </div>
    </section>
  );
}
