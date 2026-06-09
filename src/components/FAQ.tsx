import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What services does Brand Brick Studio specialize in?",
    answer: "We are a full-service creative agency. Our core expertise spans 12 disciplines, including Brand Strategy & Identity design, Custom Website Development (React/Vite/Next.js), Social Media Operations, Performance Marketing (Meta & Google Ads), and high-end Video Production (on-location shoots, editing, and Reels creation)."
  },
  {
    question: "How long does a typical custom website design and build take?",
    answer: "A standard, premium marketing website takes between 3 to 6 weeks from initial wireframe design to code deployment. More complex custom software tools, web applications with dashboard integrations, or complete client portals take 6 to 10 weeks depending on operational scope."
  },
  {
    question: "Can you film video content remotely, or do you shoot on-location?",
    answer: "Both. Our production leads (Raj, Prem, and Vikas) execute professional on-location camera shoots across India. However, we also offer remote high-end post-production services: you upload raw video clips or product samples, and we handle scripting, editing, volumetric audio, motion graphics, and thumbnail cuts."
  },
  {
    question: "How does the Google Sheets lead synchronization work?",
    answer: "When a potential client submits an inquiry through our consultation forms, the database handler instantly pushes the lead details (Name, Phone, Email, Service, Message) to Google's backend. This syncs directly to your linked Google Sheet in less than 200 milliseconds, allowing real-time pipeline management."
  },
  {
    question: "Do you handle Meta and Google advertising campaigns end-to-end?",
    answer: "Yes. Our performance lead (Rajan) structures, targets, launches, and optimizes Meta and Google campaigns. We coordinate with Dilip (Graphics) and our video team to produce raw creatives, write high-converting copy, run audience split tests, and continuously monitor analytics to maximize your ROAS."
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
            <p className="text-sm md:text-base text-zinc-400 light:text-zinc-650 leading-relaxed max-w-3xl">
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
    <section className="py-24 md:py-36 px-4 md:px-6 max-w-4xl mx-auto scroll-mt-24 md:scroll-mt-28" id="faq">
      <div className="text-center mb-16 md:mb-24">
        <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
          Support Vault
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none">
          Frequently Answered.
        </h2>
      </div>

      {/* Accordion container */}
      <div className="bg-zinc-950/40 border border-zinc-850 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-md shadow-lg light:bg-white/50 light:border-zinc-200">
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIdx === idx}
            onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
}
