import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What makes Brand Brick Studio different from local digital marketing agencies?",
    answer: "We are a strategy-first creative agency. We don't just sell social posts or template websites. We construct premium brand experiences—unifying brand strategy, visual design, custom software development, cinematic content production, and customer acquisition into a single, high-performance engine."
  },
  {
    question: "How long does a typical branding and visual identity project take?",
    answer: "A comprehensive branding and visual identity system takes between 3 to 5 weeks. This includes initial brand discovery, positioning research, typographic development, corporate color mapping, packaging/stationary mockups, and deployment of a vector brand style guide."
  },
  {
    question: "Do you design websites using templates or custom code?",
    answer: "We write clean, high-performance custom code utilizing React, Next.js, Vite, and Framer Motion. This guarantees load speeds under 200ms, premium interactive scroll effects, high-end SEO compliance, and complete design freedom without the bulk or security flaws of WordPress templates."
  },
  {
    question: "What is your content creation and vertical video (Reels) workflow?",
    answer: "We manage the entire lifecycle: formulation of high-conversion hooks, scripting, visual art direction, cinematic filming, and high-retention post-production edits (sound design, color grading, pacing). All content is custom-designed to build genuine brand authority."
  },
  {
    question: "How does your pricing structure work?",
    answer: "We operate on project-based pricing and monthly strategy retainers. We do not sell commodity packages. Every engagement is custom-scoped to match the commercial objectives of high-ticket real estate developers, hospitality brands, specialty cafés, and growing businesses."
  }
];

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void }> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-zinc-900/60 pb-6 pt-6 first:pt-0 last:border-b-0 light:border-zinc-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
      >
        <span className="text-lg md:text-xl font-display font-bold text-white light:text-zinc-900 group-hover:text-[#dc2626] transition-colors duration-300">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 transition-all duration-300 group-hover:border-[#dc2626]/30 group-hover:text-white group-hover:bg-[#dc2626]/5 ${isOpen ? "bg-[#dc2626]/10 border-[#dc2626]/40 text-[#dc2626]" : ""} light:border-zinc-200 light:bg-zinc-50`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-base text-zinc-400 light:text-zinc-600 leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-4xl mx-auto scroll-mt-24 md:scroll-mt-28" id="faq">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 md:mb-24"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
          FAQ
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
          {["Frequently", "Answered."].map((w, idx) => (
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

      {/* Accordion container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-zinc-950/40 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-md shadow-lg light:bg-white/50 light:border-zinc-200"
      >
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIdx === idx}
            onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
          />
        ))}
      </motion.div>
    </section>
  );
}
