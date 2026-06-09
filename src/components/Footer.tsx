import { motion } from "motion/react";
import { ArrowUpRight, Mail, Instagram, MapPin } from "lucide-react";
import { LiquidButton } from "./ui/LiquidButton";

const links = [
  { name: "Services", href: "/#services" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Our Tools", href: "/#stack" },
  { name: "Contact", href: "/#contact" }
];

export function Footer() {
  return (
    <footer className="bg-transparent pt-16 md:pt-24 pb-8 px-4 md:px-6 border-t border-zinc-900 relative" id="contact">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-brand text-xs font-bold tracking-widest uppercase mb-8 light:border-zinc-200 light:bg-white/50">
              Start Your Project
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white light:text-zinc-900 mb-6 leading-tight max-w-lg">
              Let’s build a brand people <span className="text-[#dc2626] italic">remember</span>
            </h2>
            <p className="text-lg text-zinc-400 light:text-zinc-600 leading-relaxed max-w-md mb-10">
              If your brand needs better content, stronger visuals, smarter digital execution, or a complete growth-ready system, Brand Brick Studio is ready to build with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LiquidButton href="mailto:brandbrickstudio@gmail.com" variant="solid">
                Book a Free Call
              </LiquidButton>
              <a 
                href="https://wa.me/917383386318" 
                target="_blank"
                rel="noreferrer"
                className="group relative bg-transparent border border-zinc-800 hover:border-brand/40 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white/[0.02] hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] transition-all duration-300 text-center inline-flex justify-center items-center gap-2 light:text-zinc-900 light:border-zinc-300 light:hover:bg-zinc-100/50"
              >
                Message Us on WhatsApp
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col lg:items-end gap-14">
            <div className="flex flex-col space-y-2 lg:items-end text-left lg:text-right">
              <div className="flex items-center gap-3 lg:flex-row-reverse">
                <img src="/logo.png" alt="Brand Brick Logo" className="w-[34px] md:w-10 h-auto shrink-0" />
                <div className="flex flex-col lg:items-end">
                  <span className="font-sans font-medium text-3xl md:text-[32px] tracking-tight text-white light:text-zinc-900 flex items-center leading-none">
                    Brand<span className="font-bold text-brand ml-[2px]">Brick</span>
                  </span>
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[0.35em] text-zinc-500 uppercase mt-1.5 ml-1 leading-none self-center lg:self-end text-center lg:text-right w-full lg:w-auto flex justify-center lg:justify-end font-display">
                    Studio
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Bricks Column */}
            <div className="flex flex-col gap-6 w-full max-w-lg lg:ml-auto">
              
              {/* Card 1: Email */}
              <a 
                href="mailto:brandbrickstudio@gmail.com"
                className="group relative flex items-center gap-6 p-6 md:p-7 rounded-[2rem] bg-zinc-950/40 backdrop-blur-md border border-zinc-800/40 hover:border-brand/40 hover:bg-zinc-950/80 transition-all duration-300 overflow-hidden shadow-lg light:bg-white/40 light:border-zinc-200 light:hover:bg-red-50 light:hover:border-red-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-brand/15 group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all duration-300 light:bg-zinc-100 light:border-zinc-200">
                  <Mail size={20} className="text-zinc-500 group-hover:text-brand transition-colors duration-300" />
                </div>
                <div className="flex-grow min-w-0">
                  <span className="text-[10px] md:text-xs font-bold text-[#dc2626] uppercase tracking-[0.2em] block mb-1">Direct Channel</span>
                  <span className="text-base md:text-lg lg:text-xl font-display font-bold text-zinc-300 light:text-zinc-700 block truncate group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300">
                    brandbrickstudio@gmail.com
                  </span>
                </div>
                <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
              </a>

              {/* Card 2: Instagram */}
              <a 
                href="https://instagram.com/brandbrickstudio"
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center gap-6 p-6 md:p-7 rounded-[2rem] bg-zinc-950/40 backdrop-blur-md border border-zinc-800/40 hover:border-brand/40 hover:bg-zinc-950/80 transition-all duration-300 overflow-hidden shadow-lg light:bg-white/40 light:border-zinc-200 light:hover:bg-red-50 light:hover:border-red-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-brand/15 group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all duration-300 light:bg-zinc-100 light:border-zinc-200">
                  <Instagram size={20} className="text-zinc-500 group-hover:text-brand transition-colors duration-300" />
                </div>
                <div className="flex-grow min-w-0">
                  <span className="text-[10px] md:text-xs font-bold text-[#dc2626] uppercase tracking-[0.2em] block mb-1">Social Engine</span>
                  <span className="text-base md:text-lg lg:text-xl font-display font-bold text-zinc-300 light:text-zinc-700 block truncate group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300">
                    @brandbrickstudio
                  </span>
                </div>
                <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
              </a>

              {/* Card 3: Location */}
              <div 
                className="group relative flex items-center gap-6 p-6 md:p-7 rounded-[2rem] bg-zinc-950/40 backdrop-blur-md border border-zinc-800/40 hover:border-brand/40 hover:bg-zinc-950/80 transition-all duration-300 overflow-hidden shadow-lg light:bg-white/40 light:border-zinc-200 light:hover:bg-red-50 light:hover:border-red-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-brand/15 group-hover:border-brand/40 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all duration-300 light:bg-zinc-100 light:border-zinc-200">
                  <MapPin size={20} className="text-zinc-500 group-hover:text-brand transition-colors duration-300" />
                </div>
                <div className="flex-grow min-w-0">
                  <span className="text-[10px] md:text-xs font-bold text-[#dc2626] uppercase tracking-[0.2em] block mb-1">Creative Base</span>
                  <span className="text-base md:text-lg lg:text-xl font-display font-bold text-zinc-300 light:text-zinc-700 block truncate group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300">
                    Silvassa, India
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Certified Credentials */}
        <div className="flex flex-wrap items-center gap-8 md:gap-12 py-8 border-t border-zinc-900/60 mb-8 mt-12 justify-center lg:justify-start light:border-zinc-200">
          <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.25em] w-full lg:w-auto text-center lg:text-left mb-2 lg:mb-0">
            Certified Studio Partner:
          </span>
          
          {/* Google Partner */}
          <div className="flex items-center gap-2 group cursor-default text-zinc-500 hover:text-white transition-all duration-300">
            <svg className="w-4 h-4 text-zinc-500 group-hover:text-[#dc2626] group-hover:drop-shadow-[0_0_8px_#dc2626] transition-all duration-300 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.92 1 12s4.92 11 11.24 11c6.59 0 11-4.64 11-11.2 0-.75-.08-1.33-.18-1.8H12.24z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Google Partner</span>
          </div>

          {/* Meta Partner */}
          <div className="flex items-center gap-2 group cursor-default text-zinc-500 hover:text-white transition-all duration-300">
            <svg className="w-4 h-4 text-zinc-500 group-hover:text-[#dc2626] group-hover:drop-shadow-[0_0_8px_#dc2626] transition-all duration-300 fill-current" viewBox="0 0 24 24">
              <path d="M12.5 13.5c-.8 0-1.5-.3-2.1-.9L7.5 9.7C6.9 9.1 6.1 8.8 5.2 8.8 3.4 8.8 2 10.2 2 12s1.4 3.2 3.2 3.2c.9 0 1.7-.3 2.3-.9l2.9-2.9c.6-.6 1.4-.9 2.2-.9.8 0 1.5.3 2.1.9l2.9 2.9c.6.6 1.4.9 2.3.9 1.8 0 3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2c-.9 0-1.7.3-2.3.9l-2.9 2.9c-.6.6-1.4.9-2.2.9z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Meta Partner</span>
          </div>

          {/* Shopify Expert */}
          <div className="flex items-center gap-2 group cursor-default text-zinc-500 hover:text-white transition-all duration-300">
            <svg className="w-4 h-4 text-zinc-500 group-hover:text-[#dc2626] group-hover:drop-shadow-[0_0_8px_#dc2626] transition-all duration-300 fill-current" viewBox="0 0 24 24">
              <path d="M19 6.5h-3v-1c0-1.4-1.1-2.5-2.5-2.5h-3C9.1 3 8 4.1 8 5.5v1H5c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2zm-9-1c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v1h-4v-1zm10 13c0 .3-.2.5-.5.5H5.5c-.3 0-.5-.2-.5-.5v-7.5h15v7.5zm0-9H4V8.5c0-.3.2-.5.5-.5h15c.3 0 .5.2.5.5v1.5z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Shopify Expert</span>
          </div>
        </div>

        {/* Regional SEO Presence */}
        <div className="py-6 border-t border-zinc-900/60 flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start light:border-zinc-200 text-xs">
          <span className="text-zinc-650 text-[10px] font-bold uppercase tracking-[0.25em] w-full lg:w-auto text-center lg:text-left">
            Regional Presence:
          </span>
          <a href="/branding-agency-surat" className="text-zinc-500 hover:text-[#dc2626] font-medium transition-colors">Branding Surat</a>
          <span className="text-zinc-800 light:text-zinc-300 hidden lg:inline">•</span>
          <a href="/creative-agency-surat" className="text-zinc-500 hover:text-[#dc2626] font-medium transition-colors">Creative Agency Surat</a>
          <span className="text-zinc-800 light:text-zinc-300 hidden lg:inline">•</span>
          <a href="/website-design-company-surat" className="text-zinc-500 hover:text-[#dc2626] font-medium transition-colors">Web Design Surat</a>
          <span className="text-zinc-800 light:text-zinc-300 hidden lg:inline">•</span>
          <a href="/social-media-marketing-agency-surat" className="text-zinc-500 hover:text-[#dc2626] font-medium transition-colors">Social Marketing Surat</a>
          <span className="text-zinc-800 light:text-zinc-300 hidden lg:inline">•</span>
          <a href="/branding-agency-gujarat" className="text-zinc-500 hover:text-[#dc2626] font-medium transition-colors">Branding Gujarat</a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-zinc-900 pt-8 light:border-zinc-200">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-medium text-zinc-500 hover:text-white light:text-zinc-500 light:hover:text-zinc-900 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-zinc-500 font-medium">Proudly built in India.</p>
            <p className="text-sm text-zinc-500 font-medium mt-1">Built to <span className="text-zinc-400">stand out.</span> Created for <span className="text-zinc-400">growth.</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
