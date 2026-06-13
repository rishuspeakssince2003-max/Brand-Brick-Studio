import { motion } from "motion/react";
import { ArrowUpRight, Mail, Instagram, MapPin } from "lucide-react";
import { LiquidButton } from "./ui/LiquidButton";

const links = [
  { name: "Process", href: "/#process" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Founder", href: "/#founder" },
  { name: "Contact", href: "/#contact" }
];

export function Footer() {
  return (
    <footer className="bg-transparent pt-12 md:pt-16 pb-8 px-4 md:px-6 border-t border-zinc-900 light:border-zinc-200 relative" id="contact">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-brand text-xs font-bold tracking-widest uppercase mb-8 light:border-zinc-200 light:bg-white/50">
              Start Your Project
            </span>
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              className="text-5xl md:text-7xl font-display font-bold text-white light:text-zinc-900 mb-6 leading-tight max-w-lg"
            >
              {["Let’s", "build", "a", "brand", "people"].map((w, idx) => (
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
              
              <span className="relative inline-block">
                <motion.span
                  variants={{
                    hidden: { y: 30, opacity: 0, scale: 0.95, filter: "blur(6px)" },
                    visible: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-[#dc2626] italic inline-block"
                >
                  remember
                </motion.span>
                
                {/* Underline swoosh drawing itself */}
                <motion.svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 w-full h-3"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, delay: 0.8, ease: "easeOut" } }
                  }}
                >
                  <path
                    d="M2 8 C40 2, 80 2, 100 6 S160 12, 198 4"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-zinc-400 light:text-zinc-600 leading-relaxed max-w-md mb-10"
            >
              If your brand needs better content, stronger visuals, smarter digital execution, or a complete growth-ready system, Brand Brick Studio is ready to build with you.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <LiquidButton href="https://wa.me/917383386318" target="_blank" rel="noreferrer" variant="solid">
                Chat on WhatsApp
              </LiquidButton>
              <LiquidButton 
                href="mailto:brandbrickstudio@gmail.com" 
                variant="outline"
                className="inline-flex gap-2 items-center text-sm"
              >
                Email Our Team
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300" />
              </LiquidButton>
            </motion.div>
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
