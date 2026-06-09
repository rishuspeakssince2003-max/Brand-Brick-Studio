import { motion } from "motion/react";
import { User2, Calendar, Target, Video, ShieldCheck, Palette, Cpu } from "lucide-react";

const teamMembers = [
  {
    name: "Rishu",
    role: "Lead — Business Development",
    dept: "Leads & Growth",
    icon: Target,
    focus: ["Prospecting", "Cold Outreach", "Client Onboarding", "Brand Scaling"]
  },
  {
    name: "Krishna Dasani",
    role: "Operations & Social Media Head",
    dept: "Operations & Social Strategy",
    icon: Calendar,
    focus: ["Workflow Allocation", "Posting Strategy", "Project Tracking", "Client Comms"]
  },
  {
    name: "Om",
    role: "Web & Software Developer",
    dept: "Tech & Dev",
    icon: Cpu,
    focus: ["React / Next.js", "CRM Integrations", "Database Architecture", "Server Deployments"]
  },
  {
    name: "Dilip",
    role: "Graphic Designer",
    dept: "Creative Design",
    icon: Palette,
    focus: ["Brand Identities", "Packaging Designs", "Ad Creatives", "Presentations"]
  },
  {
    name: "Rajan",
    role: "Digital Marketer",
    dept: "Performance Ads",
    icon: Target,
    focus: ["Meta Ads Manager", "Audience Sizing", "A/B Testing", "ROAS Optimization"]
  },
  {
    name: "Raj, Prem & Vikas",
    role: "Video Editors & Cinematographers",
    dept: "Video Production",
    icon: Video,
    focus: ["Video Shoots", "Reels & Shorts", "Color Grading", "Visual FX & Sound"]
  },
  {
    name: "CA Eshaan Sharma",
    role: "Finance & Accounts",
    dept: "Compliance & Audit",
    icon: ShieldCheck,
    focus: ["GST Filing", "Payroll Management", "Invoicing Systems", "Compliance"]
  }
];

export function Team() {
  return (
    <section className="py-24 md:py-40 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28" id="team">
      <div className="mb-16 md:mb-24">
        <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
          The Guild
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none">
          Engineers of Impact.
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, idx) => {
          const IconComp = member.icon;
          return (
            <motion.div
              key={idx}
              className="group relative p-8 rounded-[2.5rem] bg-zinc-950/40 border border-zinc-850 backdrop-blur-md overflow-hidden hover:border-[#dc2626]/20 transition-all duration-300 shadow-lg flex flex-col justify-between min-h-[300px] light:bg-white/50 light:border-zinc-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#dc2626]/5 rounded-full blur-2xl group-hover:bg-[#dc2626]/10 transition-all duration-500" />
              
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#dc2626] uppercase tracking-wider block mb-1">
                      {member.dept}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white light:text-zinc-900 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {member.role}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400 group-hover:text-[#dc2626] group-hover:border-[#dc2626]/30 transition-all duration-300 light:bg-zinc-100 light:border-zinc-200">
                    <IconComp size={16} />
                  </div>
                </div>

                {/* Core focus items */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {member.focus.map((item, fIdx) => (
                    <span
                      key={fIdx}
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-850 text-zinc-400 light:bg-zinc-100 light:border-zinc-250 light:text-zinc-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified seal */}
              <div className="mt-8 pt-4 border-t border-zinc-900/60 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-650 light:border-zinc-200">
                <ShieldCheck size={12} className="text-[#dc2626]" /> Verified Studio Partner
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
