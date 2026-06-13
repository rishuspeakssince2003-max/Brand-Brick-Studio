import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, MapPin } from "lucide-react";
import { FinalCTA } from "./FinalCTA";
import { WhyChooseUs } from "./WhyChooseUs";
import { LiquidButton } from "./ui/LiquidButton";

interface SeoPageConfig {
  title: string;
  headline: string;
  subtitle: string;
  description: string;
  targetService: string;
  metaDesc: string;
}

const seoPages: Record<string, SeoPageConfig> = {
  "/branding-agency-surat": {
    title: "Branding Agency Surat | Brand Brick Studio",
    headline: "Surat's Premium Branding Agency.",
    subtitle: "We construct unforgettable brand identities, style guidelines, and high-end logo packages for high-growth enterprises in Surat.",
    description: "Brand Brick Studio is the premier branding agency in Surat, Gujarat. We specialize in transforming local companies into legendary national brands. From custom typographic design and premium corporate stylebooks to complete visual design architectures, we build leverage.",
    targetService: "Branding & Identity",
    metaDesc: "Looking for the best branding agency in Surat? Brand Brick Studio designs premium logo packages, complete visual identity guidelines, and spatial designs for elite businesses."
  },
  "/creative-agency-surat": {
    title: "Creative Agency Surat | Brand Brick Studio",
    headline: "Surat's Elite Creative Agency.",
    subtitle: "We are one team handling branding, website engineering, volumetric shoots, and social media scaling for Surat's industry leaders.",
    description: "As Surat's most forward-thinking creative agency, we integrate high-end visual design, production shoots, web development, and performance advertising under one roof. No outsourcing. Zero friction. Only absolute growth.",
    targetService: "General Inquiry",
    metaDesc: "Brand Brick Studio is Surat's elite creative agency. We unify premium web design, branding, reels production, and ad campaigns for elite scaling."
  },
  "/website-design-company-surat": {
    title: "Website Design Company Surat | Brand Brick Studio",
    headline: "Elite Web Design in Surat.",
    subtitle: "We design and develop ultra-premium, fast, glassmorphic websites and high-converting custom portals for Surat's scaling brands.",
    description: "Stop building generic template pages. Brand Brick Studio is the leading website design company in Surat, engineering custom React, Vite, and Next.js applications that load under 200ms, feature inertial scrolling, and convert views into clients.",
    targetService: "Website Development",
    metaDesc: "Need a premium website design company in Surat? We engineer high-speed, glassmorphic spatial websites and custom software solutions."
  },
  "/social-media-marketing-agency-surat": {
    title: "Social Media Marketing Agency Surat | Brand Brick Studio",
    headline: "Surat's Top Social Marketing Agency.",
    subtitle: "We leverage high-impact Reels creation, daily workflow planning, and Meta ad management to scale your customer acquisitions in Surat.",
    description: "We help brands command attention on Instagram and YouTube. As a top social media marketing agency in Surat, we handle daily workflow allocation, graphic assets, cinematic edits, and lead-gen campaigns that drive measurable ROI.",
    targetService: "Social Media Management",
    metaDesc: "Scale your reach with Surat's top social media marketing agency. We manage cinematic reels creation, posting strategy, and Meta ads campaigns."
  },
  "/branding-agency-gujarat": {
    title: "Branding Agency Gujarat | Brand Brick Studio",
    headline: "Gujarat's Leading Branding Team.",
    subtitle: "We build positioning blueprints, custom digital execution plans, and premium brand identities for scaling empires across Gujarat.",
    description: "Operating from Silvassa, we serve high-value manufacturing, textile, real estate, and consumer brands across Gujarat. We design logos, packaging systems, and digital portals that command high-ticket deals.",
    targetService: "Branding & Identity",
    metaDesc: "Gujarat's leading branding team for premium enterprises. We craft brand identities, marketing strategies, and custom web builds."
  }
};

export function SeoLandingPage({ path }: { path: string }) {
  const config = seoPages[path] || seoPages["/creative-agency-surat"];

  useEffect(() => {
    // Dynamic Head Updates
    document.title = config.title;
    
    // Update Meta Description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
      metaDescTag.setAttribute("content", config.metaDesc);
    } else {
      metaDescTag = document.createElement("meta");
      metaDescTag.setAttribute("name", "description");
      metaDescTag.setAttribute("content", config.metaDesc);
      document.head.appendChild(metaDescTag);
    }
  }, [config]);

  return (
    <div key={path} className="pt-24 md:pt-32 relative overflow-hidden">
      
      {/* Background spotlights */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.8, 1, 0.8],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#dc2626]/5 rounded-full blur-[120px] pointer-events-none"
      />
      
      {/* SEO Hero Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50"
          >
            Regional Partner / {config.targetService}
          </motion.span>
          
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.15
                }
              }
            }}
            className="text-5xl md:text-8xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-[0.9] mb-8"
          >
            {config.headline.split(" ").map((w, idx) => (
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
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-zinc-400 light:text-zinc-600 font-light leading-relaxed mb-10 max-w-2xl"
          >
            {config.subtitle}
          </motion.p>
 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <LiquidButton
              href="#contact"
              variant="solid"
              className="inline-flex gap-2 items-center text-sm"
            >
              Initiate Growth
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </LiquidButton>
          </motion.div>
        </div>
      </section>
 
      {/* Main contextual description card */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.1
            }
          }
        }}
        className="py-12 px-4 md:px-6 max-w-7xl mx-auto"
      >
        <div className="bg-zinc-950/40 border border-zinc-800 p-8 md:p-12 lg:p-16 rounded-[2.5rem] backdrop-blur-md light:bg-white/50 light:border-zinc-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="lg:col-span-2"
            >
              <span className="text-[10px] font-bold text-[#dc2626] uppercase tracking-[0.2em] block mb-2">Locally Engineered. Globally Scaled.</span>
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="text-3xl md:text-4xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none mb-6"
              >
                {"Premium visual execution for Surat and Gujarat's leading enterprises.".split(" ").map((w, idx) => (
                  <motion.span
                    key={idx}
                    variants={{
                      hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
                      visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="inline-block mr-[0.25em]"
                  >
                    {w}
                  </motion.span>
                ))}
              </motion.h2>
              <p className="text-zinc-400 light:text-zinc-600 leading-relaxed">
                {config.description}
              </p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="p-8 rounded-[2rem] bg-zinc-900/60 border border-zinc-800 flex flex-col gap-6 light:bg-zinc-100 light:border-zinc-200"
            >
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#dc2626]" />
                <span className="text-sm font-bold text-white light:text-zinc-900 uppercase tracking-widest">Surat / Gujarat Operations</span>
              </div>
              <p className="text-xs text-zinc-400 light:text-zinc-600 leading-relaxed">
                We set up digital and physical content operations directly matching the compliance standards, accounting requirements, and brand standards of businesses in Gujarat.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#dc2626]">
                <ShieldCheck size={14} /> Full Liability Indemnity
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <WhyChooseUs />
      
      <div id="contact">
        <FinalCTA />
      </div>

    </div>
  );
}
