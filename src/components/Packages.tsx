import { motion } from "motion/react";
import { Check, Home, Coffee } from "lucide-react";
import { useDeviceProfile } from "../lib/useDeviceProfile";

const packages = [
  {
    name: "Silver Brick",
    price: "Project Scope",
    period: "Tailored Per Project",
    desc: "High-impact creative sprints, brand design, and modern website launches.",
    features: [
      "Brand & Identity Design",
      "High-Converting Websites",
      "Video & Photo Production",
      "Ad Creative Sprints"
    ],
    cta: "Scope Your Project",
    popular: false
  },
  {
    name: "Gold Brick",
    price: "Growth Engine",
    period: "Monthly Partnership",
    desc: "Continuous social content, high-retention video, and paid ad management.",
    features: [
      "Premium Social Content",
      "Engineered Reels & Videos",
      "Meta & Google Ads Engine",
      "Weekly Strategy Audits"
    ],
    cta: "Start Your Engine",
    popular: true
  },
  {
    name: "Platinum Brick",
    price: "Elite Partner",
    period: "Long-Term Growth",
    desc: "Your fully integrated growth division for complete creative and technical scale.",
    features: [
      "Omnichannel Marketing",
      "Full-Scale Production",
      "Custom Software Dev",
      "Dedicated Growth Director"
    ],
    cta: "Request VIP Access",
    popular: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

export function Packages() {
  const { lowPerformanceMode } = useDeviceProfile();

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative overflow-hidden" id="packages">
      {/* Background glow behind pricing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-[#dc2626]/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand font-bold text-sm tracking-widest uppercase mb-4"
        >
          Partnerships
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight"
        >
          Tailored execution for elite scaling.
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-zinc-400 font-light"
        >
          No generic templates. No rigid plans. We design every project around your specific growth needs.
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {packages.map((pkg, i) => (
          <motion.div 
            key={i} 
            variants={cardVariants}
            className={`relative flex flex-col p-8 md:p-10 rounded-[2rem] backdrop-blur-md transition-all duration-500 group ${
              pkg.popular 
                ? "bg-[#050505]/90 shadow-[0_0_60px_rgba(220,38,38,0.15)] lg:-translate-y-4 hover:shadow-[0_0_80px_rgba(220,38,38,0.25)] z-10" 
                : "bg-black/40 border border-zinc-800/40 hover:border-transparent hover:bg-[#050505]/75"
            }`}
          >
            {/* Animated Conic Border Trace */}
            <div className={`absolute inset-0 rounded-[2rem] p-[1.5px] overflow-hidden pointer-events-none z-0 transition-opacity duration-500 ${
              pkg.popular ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}>
              <div
                className="absolute inset-[-200%]"
                style={{
                  background: pkg.popular 
                    ? "conic-gradient(from 0deg, transparent 40%, #dc2626 50%, transparent 60%, transparent 100%)"
                    : "conic-gradient(from 0deg, transparent 45%, #dc2626 50%, transparent 55%, transparent 100%)",
                  animation: lowPerformanceMode ? "none" : "card-border-spin 4s linear infinite",
                }}
              />
              <div className="absolute inset-[1.5px] rounded-[calc(2rem-1.5px)] bg-[#050505]" />
            </div>

            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.6)] animate-pulse z-10">
                Most Popular
              </div>
            )}
            
            <div className="mb-8 relative z-10">
              <h4 className={`text-xl font-display font-bold uppercase tracking-wider mb-2 ${pkg.popular ? "text-brand" : "text-white"}`}>{pkg.name}</h4>
              <div className="flex flex-col mb-4">
                <span className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-none">{pkg.price}</span>
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.15em] mt-2">{pkg.period}</span>
              </div>
              <p className="text-sm text-zinc-400 h-16 leading-relaxed font-light">{pkg.desc}</p>
            </div>
            
            <div className="flex-grow mb-10 line-clamp-none relative z-10">
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-6 border-b border-zinc-800 pb-3">The Scope</p>
              <motion.ul 
                className="space-y-5"
                variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
              >
                {pkg.features.map((feature, idx) => (
                  <motion.li key={idx} variants={featureVariants} className="flex items-start gap-4 text-sm text-zinc-300">
                    <div className={`mt-0.5 rounded-full p-1 ${pkg.popular ? "bg-brand/20 text-brand" : "bg-zinc-800 text-zinc-400"}`}>
                      <Check size={12} strokeWidth={3} className={pkg.popular ? "drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" : ""} />
                    </div>
                    <span className="leading-tight font-medium">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            <a 
              href="#contact" 
              className={`w-full py-5 rounded-full text-sm font-bold tracking-widest uppercase text-center transition-all duration-300 relative overflow-hidden group/btn z-10 ${
                pkg.popular 
                  ? "bg-brand text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)]" 
                  : "bg-transparent border-2 border-zinc-700 text-white hover:border-white hover:bg-white hover:text-black"
              }`}
            >
              {pkg.popular && <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out" />}
              <span className="relative z-10">{pkg.cta}</span>
            </a>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Special Industry Partner Discounts ── */}
      <motion.div
        id="industry-discounts"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 mb-8 max-w-4xl mx-auto relative z-10"
      >
        <div className="relative p-6 md:p-8 rounded-3xl bg-zinc-950/60 border border-zinc-800/40 backdrop-blur-md hover:border-amber-500/30 transition-all duration-500 group/promo overflow-hidden">
          {/* Golden ticket cut-out notches on sides */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#050505] rounded-r-full border-r border-y border-zinc-800/40 transition-colors duration-500 group-hover/promo:border-amber-500/30 -ml-[1px] z-10" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#050505] rounded-l-full border-l border-y border-zinc-800/40 transition-colors duration-500 group-hover/promo:border-amber-500/30 -mr-[1px] z-10" />
          
          {/* Subtle golden lighting corner glow */}
          <div className="absolute -right-24 -top-24 w-48 h-48 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none transition-all duration-500 group-hover/promo:bg-amber-500/15" />
          <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-amber-500/[0.02] blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 shrink-0">
                {/* Real Estate Icon */}
                <div className="relative flex flex-col items-center">
                  <Home className="w-8 h-8 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]" strokeWidth={1.5} />
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1.5">Real Estate</span>
                </div>
                
                {/* Divider inside icons */}
                <div className="w-px h-10 bg-zinc-800 self-center" />
                
                {/* Cafe & Restaurant Icon */}
                <div className="relative flex flex-col items-center">
                  <Coffee className="w-8 h-8 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]" strokeWidth={1.5} />
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1.5">Cafe/Resto</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    Special Partner Offer
                  </span>
                </div>
                <h4 className="text-lg md:text-xl font-display font-bold text-white mt-2 group-hover/promo:text-amber-300 transition-colors duration-300">Special Discount for Real Estate & Cafe/Restaurants</h4>
                <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed font-light">
                  Enjoy a special <span className="text-amber-400 font-bold font-mono">15% discount</span> on monthly retainers & project scopes. Engineered to scale listing leads and foot-traffic.
                </p>
              </div>
            </div>
            
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500 hover:bg-amber-400 text-black transition-all duration-300 shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] text-center font-extrabold"
            >
              Claim Discount
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center relative z-10"
      >
        <p className="text-xs text-zinc-500 font-medium tracking-wide">
          All solutions are fully customizable. Ad spend is billed separately. Custom agreements available on request.
        </p>
      </motion.div>

      {/* ── CSS Animations ── */}
      <style>{`
        @keyframes card-border-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
