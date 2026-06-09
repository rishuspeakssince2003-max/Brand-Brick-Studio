import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const projects = [
  {
    title: "Rebranding a Luxury Tech Brand",
    client: "Apex Labs",
    category: "Branding & Identity",
    metric: "+140% Lead Growth",
    image: "/brand_identity_mockup.png",
    problem: "Apex Labs struggled with a fragmented visual identity and an outdated logo that failed to resonate with premium enterprise clients. Their positioning felt like a commodity rather than an industry leader.",
    solution: "We engineered a complete structural design system, creating an iconic 3D isometric brand mark, unified guidelines, and sleek luxury packaging. We aligned all digital touchpoints under a minimalist, high-contrast aesthetic.",
    results: [
      "Secured 8 major enterprise contracts in first 3 months",
      "Unified all digital and print brand assets",
      "Brand recognition metrics climbed by 140%"
    ]
  },
  {
    title: "Next-Gen Spatial Web Application",
    client: "Nexus Systems",
    category: "Website Design & Dev",
    metric: "+85% Conversion Rate",
    image: "/web_design_showcase.png",
    problem: "Nexus Systems suffered from high bounce rates and slow load times on their legacy website. Their complex SaaS product was poorly explained, causing lost leads and high customer support costs.",
    solution: "We designed and coded a lightning-fast, spatial glassmorphic landing experience utilizing custom WebGL particles, Lenis smooth scrolling, and interactive product demo modals. Clean layout, zero clutter.",
    results: [
      "Reduced bounce rate from 68% to 22%",
      "Increased user sign-up conversion rate by 85%",
      "Page speed score improved to 98/100 on desktop"
    ]
  },
  {
    title: "Cinematic Product Launch Campaign",
    client: "Vortex Wearables",
    category: "Video Production & Content",
    metric: "1.2M+ Views Gained",
    image: "/video_production_frame.png",
    problem: "Vortex was launching their flagship smart ring but lacked a powerful visual hook to build organic hype. Plain mockups and stock videos weren't generating engagement on social platforms.",
    solution: "Our team executed a high-end volumetric video shoot in a custom neon-lit studio. We created a cinematic teaser, 6 high-impact Instagram Reels, and customized ad creatives highlighting the product's premium aesthetic.",
    results: [
      "Generated 1.2M+ organic views within 2 weeks of launch",
      "Drove 12,000 pre-orders directly from social channels",
      "Established standard video template for future launches"
    ]
  }
];

export function CaseStudies() {
  return (
    <section className="py-24 md:py-40 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28" id="work">
      <div className="mb-16 md:mb-24">
        <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
          Featured Work
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none">
          Projects That Shaped Brands.
        </h2>
      </div>

      <div className="space-y-24 md:space-y-36">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start border-b border-zinc-900/60 pb-16 md:pb-24 light:border-zinc-200/80"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Visual Column */}
            <div className="w-full lg:w-1/2 group relative rounded-[2rem] overflow-hidden border border-zinc-850 bg-zinc-950/20 aspect-video light:border-zinc-200">
              <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:opacity-20" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
              />
              
              {/* Floating Metric Badge */}
              <div className="absolute top-6 left-6 z-20 px-4 py-2 rounded-xl bg-[#dc2626] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                {project.metric}
              </div>
            </div>

            {/* Narrative Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{project.client}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <span className="text-sm font-bold text-[#dc2626] uppercase tracking-widest">{project.category}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white light:text-zinc-900 mb-8 flex items-center justify-between group cursor-pointer hover:text-[#dc2626] transition-colors duration-300">
                  {project.title}
                  <ArrowUpRight size={24} className="text-zinc-600 group-hover:text-[#dc2626] transition-colors" />
                </h3>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">The Challenge</h4>
                    <p className="text-zinc-400 light:text-zinc-600 text-sm leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Our Execution</h4>
                    <p className="text-zinc-400 light:text-zinc-600 text-sm leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Outcomes */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Key Outcomes</h4>
                  <ul className="space-y-2.5">
                    {project.results.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-3 text-zinc-350 light:text-zinc-700 text-sm">
                        <CheckCircle2 size={16} className="text-[#dc2626] shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
