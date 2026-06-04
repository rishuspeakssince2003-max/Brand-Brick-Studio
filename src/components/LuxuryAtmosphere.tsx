import { motion } from "motion/react";

export function LuxuryAtmosphere() {
  return (
    <div className="fixed inset-0 z-[-5] pointer-events-none overflow-hidden" style={{ transform: "translateZ(0)" }}>
      {/* 
        Luxury Ambient Studio Lighting (Aurora):
        Optimized for buttery smooth 60fps+ performance without flickering.
        Removed expensive CSS blurs and mix-blend modes to ensure premium quality.
      */}
      
      {/* Primary deep red central aura */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(220,38,38,0.08) 0%, transparent 60%)",
          x: "-50%",
          y: "-50%",
          willChange: "transform, opacity",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary offset aura for organic, slow-shifting light */}
      <motion.div
        className="absolute top-[30%] left-[70%] w-[90vw] h-[90vh] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(220,38,38,0.05) 0%, transparent 60%)",
          x: "-50%",
          y: "-50%",
          willChange: "transform",
        }}
        animate={{
          x: ["-50%", "-60%", "-50%"],
          y: ["-50%", "-40%", "-50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Tertiary subtle accent light */}
      <motion.div
        className="absolute bottom-[10%] left-[20%] w-[70vw] h-[70vh] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(153,27,27,0.06) 0%, transparent 60%)",
          x: "-50%",
          y: "-50%",
          willChange: "transform, opacity",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* 
        High-end Matte Film Grain (Noise)
        Hardware accelerated and separated to prevent rendering z-fighting/flickering.
      */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
