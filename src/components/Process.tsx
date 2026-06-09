import { motion } from "motion/react";
import { Compass, Target, PenTool, Code, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Discover",
    desc: "We dive deep into your business, auditing your current assets, researching competitors, and hosting brand alignment workshops.",
    deliverables: ["Brand audit report", "Competitor matrix", "Target audience personas"]
  },
  {
    icon: Target,
    title: "Strategy",
    desc: "We define your brand positioning, design a content blueprint, formulate advertising roadmaps, and set conversion benchmarks.",
    deliverables: ["Positioning blueprint", "Marketing campaign plan", "SEO roadmap"]
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "We bring concepts to life, designing high-fidelity brand systems, creative visual campaigns, and premium spatial website wireframes.",
    deliverables: ["Vector brand style guide", "Figma UI/UX layouts", "Volumetric shoots moodboard"]
  },
  {
    icon: Code,
    title: "Develop",
    desc: "We write clean, optimized code. Our developers build high-speed frontend pages, integrate CRMs, and set up analytics pipelines.",
    deliverables: ["Vite + React code repo", "Database & CRM integrations", "Vercel pipeline deployment"]
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "We conduct end-to-end quality assurance, optimize page speed performance, and launch your campaign/website with zero downtime.",
    deliverables: ["QA validation check", "Domain DNS setup", "Public launch checklist"]
  },
  {
    icon: BarChart3,
    title: "Scale",
    desc: "We don't just launch and leave. We continuously track engagement metrics, A/B test ad hooks, and execute optimization sprints.",
    deliverables: ["Monthly ROAS audit", "Heatmap usability analysis", "Speed & content updates"]
  }
];

export function Process() {
  return (
    <section className="py-24 md:py-40 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28" id="approach">
      <div className="mb-16 md:mb-24">
        <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
          Our Process
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none">
          How We Build Empires.
        </h2>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {/* Subtle timeline track overlay for decorative purpose */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent hidden lg:block pointer-events-none -translate-y-1/2" />
        
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <motion.div
              key={idx}
              className="group relative flex flex-col justify-between p-8 rounded-[2.5rem] bg-zinc-950/40 border border-zinc-850 backdrop-blur-md overflow-hidden hover:border-[#dc2626]/30 transition-all duration-300 shadow-lg min-h-[340px] light:bg-white/50 light:border-zinc-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle ambient light dot inside cards */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#dc2626]/5 rounded-full blur-2xl group-hover:bg-[#dc2626]/10 transition-all duration-500" />
              
              <div>
                {/* Step Index & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.1)] group-hover:bg-[#dc2626]/10 group-hover:border-[#dc2626]/30 transition-all duration-300 light:bg-zinc-100 light:border-zinc-200">
                    <IconComp size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="font-display font-bold text-4xl text-zinc-800/40 group-hover:text-[#dc2626]/35 transition-colors duration-300 light:text-zinc-300 light:group-hover:text-[#dc2626]/20">
                    0{idx + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-white light:text-zinc-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 light:text-zinc-600 leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Deliverables tags */}
              <div className="border-t border-zinc-900/60 pt-4 flex flex-wrap gap-2 light:border-zinc-200">
                {step.deliverables.map((del, dIdx) => (
                  <span
                    key={dIdx}
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-500 light:bg-zinc-100 light:border-zinc-200 light:text-zinc-650"
                  >
                    {del}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
