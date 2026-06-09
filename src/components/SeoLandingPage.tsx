import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, MapPin } from "lucide-react";
import { Contact } from "./Contact";
import { CaseStudies } from "./CaseStudies";
import { Services } from "./Services";
import { WhyChooseUs } from "./WhyChooseUs";

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
    subtitle: "One team handling branding, website engineering, volumetric shoots, and social media scaling for Surat's industry leaders.",
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
    subtitle: "High-impact Reels creation, daily workflow planning, and Meta ad management to scale your customer acquisitions in Surat.",
    description: "We help brands command attention on Instagram and YouTube. As a top social media marketing agency in Surat, we handle daily workflow allocation, graphic assets, cinematic edits, and lead-gen campaigns that drive measurable ROI.",
    targetService: "Social Media Management",
    metaDesc: "Scale your reach with Surat's top social media marketing agency. We manage cinematic reels creation, posting strategy, and Meta ads campaigns."
  },
  "/branding-agency-gujarat": {
    title: "Branding Agency Gujarat | Brand Brick Studio",
    headline: "Gujarat's Leading Branding Team.",
    subtitle: "Positioning blueprints, custom digital execution, and premium brand identities for scaling empires across Gujarat.",
    description: "Operating from Silvassa, we serve high-value manufacturing, textile, real estate, and consumer brands across Gujarat. We design the logos, packaging systems, and digital portals that command high-ticket deals.",
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
    <div className="pt-24 md:pt-32 relative overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#dc2626]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* SEO Hero Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
            Regional Partner / {config.targetService}
          </span>
          
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-[0.9] mb-8">
            {config.headline}
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 light:text-zinc-650 font-light leading-relaxed mb-10 max-w-2xl">
            {config.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="group relative bg-[#dc2626] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#b91c1c] transition-all duration-300 text-center inline-flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.25)]"
            >
              Initiate Growth
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#services"
              className="group relative bg-transparent border border-zinc-800 text-zinc-400 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:border-zinc-500 hover:text-white transition-all duration-300 text-center inline-flex justify-center items-center gap-2 light:border-zinc-350 light:text-zinc-700 light:hover:text-zinc-900"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Main contextual description card */}
      <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="bg-zinc-950/40 border border-zinc-850 p-8 md:p-12 lg:p-16 rounded-[2.5rem] backdrop-blur-md light:bg-white/50 light:border-zinc-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <span className="text-[10px] font-bold text-[#dc2626] uppercase tracking-[0.2em] block mb-2">Locally Engineered. Globally Scaled.</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none mb-6">
                Premium visual execution for Surat and Gujarat's leading enterprises.
              </h2>
              <p className="text-zinc-400 light:text-zinc-600 leading-relaxed">
                {config.description}
              </p>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-zinc-900/60 border border-zinc-850 flex flex-col gap-6 light:bg-zinc-100 light:border-zinc-200">
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
            </div>
          </div>
        </div>
      </section>

      {/* Reusable Core Sections */}
      <div id="services">
        <Services />
      </div>
      
      <WhyChooseUs />
      
      <CaseStudies />
      
      <div id="contact">
        <Contact />
      </div>

    </div>
  );
}
