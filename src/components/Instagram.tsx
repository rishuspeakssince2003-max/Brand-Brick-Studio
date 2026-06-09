import { motion } from "motion/react";
import { Instagram as InstaIcon, Play, Heart, MessageCircle } from "lucide-react";

const reels = [
  {
    title: "Why Minimal Rebranding Outperforms Flashy Visuals",
    metric: "420K Views",
    likes: "32.4K",
    comments: "840",
    category: "Branding Tip",
    color: "from-purple-900/40 via-red-950/20 to-black"
  },
  {
    title: "Cinematic Volumetric Shoots Behind The Scenes",
    metric: "890K Views",
    likes: "74.1K",
    comments: "1.9K",
    category: "Video Production",
    color: "from-[#dc2626]/20 via-zinc-950 to-black"
  },
  {
    title: "Designing Spatial Glassmorphism in 3 Minutes",
    metric: "280K Views",
    likes: "19.8K",
    comments: "312",
    category: "Web Design",
    color: "from-blue-950/40 via-purple-950/20 to-black"
  },
  {
    title: "How to Build a High-converting Landing Page",
    metric: "610K Views",
    likes: "48.2K",
    comments: "1.1K",
    category: "Tech & Coding",
    color: "from-amber-950/30 via-red-950/15 to-black"
  }
];

export function Instagram() {
  return (
    <section className="py-24 md:py-36 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28" id="social">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
            Social Engine
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none">
            Instagram Feed.
          </h2>
        </div>
        
        <a
          href="https://instagram.com/brandbrickstudio"
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-950 hover:border-[#dc2626]/40 hover:bg-[#dc2626]/5 transition-all duration-300 text-xs font-bold uppercase tracking-wider text-white light:text-zinc-900 light:border-zinc-300 light:hover:bg-zinc-100"
        >
          <InstaIcon size={14} className="text-[#dc2626]" />
          Follow @brandbrickstudio
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reels.map((reel, idx) => (
          <motion.div
            key={idx}
            className={`group relative rounded-[2.5rem] border border-zinc-900 aspect-[9/16] overflow-hidden bg-gradient-to-b ${reel.color} shadow-lg cursor-pointer light:border-zinc-200`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Visual Cover Placeholder grid design */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
              <span className="px-2.5 py-1 rounded bg-black/60 border border-zinc-800 text-[8px] font-bold uppercase tracking-widest text-zinc-300 self-start">
                {reel.category}
              </span>
              
              {/* Play Icon Trigger */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <Play size={18} fill="white" className="ml-0.5" />
              </div>

              <div>
                <h3 className="text-base font-display font-medium text-white tracking-tight mb-4 leading-tight group-hover:text-[#dc2626] transition-colors duration-300">
                  {reel.title}
                </h3>
                
                {/* Stats row */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-bold uppercase text-zinc-400">
                  <span>{reel.metric}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart size={10} className="text-[#dc2626]" /> {reel.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={10} /> {reel.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Soft Ambient Shadow Overlay */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
