import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeftRight, Check, AlertCircle } from "lucide-react";

export function BeforeAfter() {
  const [activeTab, setActiveTab] = useState<"logo" | "web">("logo");
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    if ("touches" in e) {
      document.addEventListener("touchmove", handleTouchMove, { passive: true });
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  return (
    <section className="py-24 md:py-36 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-28">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[#dc2626] text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md light:border-zinc-200 light:bg-white/50">
            Transformations
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none">
            Before & After.
          </h2>
        </div>
        
        {/* Toggle tabs */}
        <div className="flex bg-zinc-950/60 p-1.5 rounded-2xl border border-zinc-850 backdrop-blur-md light:bg-zinc-100 light:border-zinc-200">
          <button
            onClick={() => { setActiveTab("logo"); setSliderPos(50); }}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "logo"
                ? "bg-[#dc2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.25)]"
                : "text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-zinc-900"
            }`}
          >
            Brand Identity
          </button>
          <button
            onClick={() => { setActiveTab("web"); setSliderPos(50); }}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "web"
                ? "bg-[#dc2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.25)]"
                : "text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-zinc-900"
            }`}
          >
            Website UI
          </button>
        </div>
      </div>

      {/* Main Slider Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[380px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-zinc-900 select-none cursor-ew-resize bg-zinc-950 light:border-zinc-200"
      >
        {/* ================= BEFORE LAYER (Background) ================= */}
        <div className="absolute inset-0 w-full h-full p-8 md:p-12 flex items-center justify-center bg-zinc-900/60 light:bg-zinc-100">
          {activeTab === "logo" ? (
            // Before Logo
            <div className="text-center opacity-40 filter grayscale">
              <div className="w-24 h-24 border-2 border-dashed border-zinc-650 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-zinc-500 font-serif italic">bb</span>
              </div>
              <h3 className="text-3xl font-serif text-zinc-400">Brand-Brick</h3>
              <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">Marketing Services Since 2020</p>
            </div>
          ) : (
            // Before Web
            <div className="w-full max-w-2xl h-full border border-zinc-800 rounded-2xl bg-white text-black p-6 flex flex-col justify-between opacity-50 light:border-zinc-300">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="font-bold text-blue-600 text-lg font-serif">Welcome To Our Site!</div>
                <div className="flex gap-4 text-xs text-zinc-600">
                  <span>Home</span><span>About</span><span>Services</span><span>Contact</span>
                </div>
              </div>
              <div className="my-8">
                <div className="h-6 w-3/4 bg-zinc-200 mb-3 rounded" />
                <div className="h-4 w-full bg-zinc-100 mb-2 rounded" />
                <div className="h-4 w-5/6 bg-zinc-100 rounded" />
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-blue-500 text-white rounded text-xs">Submit Form</div>
                <div className="px-4 py-2 border rounded text-xs">Read More</div>
              </div>
            </div>
          )}
          
          {/* Label Before */}
          <div className="absolute left-6 bottom-6 z-20 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <AlertCircle size={10} className="text-amber-500" /> Before
          </div>
        </div>

        {/* ================= AFTER LAYER (Foreground / Sliding) ================= */}
        <div 
          className="absolute inset-0 h-full overflow-hidden bg-zinc-950 p-8 md:p-12 flex items-center justify-center border-r border-transparent"
          style={{ width: `${sliderPos}%` }}
        >
          {/* We must wrap content in a full-width container matching parent's width to prevent content squishing */}
          <div className="absolute inset-0 w-full h-full p-8 md:p-12 flex items-center justify-center pointer-events-none bg-[#050505] light:bg-[#fafafa]">
            {activeTab === "logo" ? (
              // After Logo
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-[#dc2626]/20 to-transparent border border-[#dc2626]/40 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(220,38,38,0.15)] relative">
                  <img src="/logo.png" alt="Brand Brick Studio Logo" className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-display font-bold text-white light:text-zinc-900 tracking-tight leading-none">
                  Brand<span className="text-[#dc2626]">Brick</span>
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mt-2">STUDIO</p>
              </div>
            ) : (
              // After Web
              <div className="w-full max-w-2xl h-full border border-zinc-800/40 rounded-2xl bg-zinc-950/40 backdrop-blur-md p-6 flex flex-col justify-between shadow-[0_15px_50px_rgba(0,0,0,0.5)] light:bg-white/70 light:border-zinc-200">
                <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4 light:border-zinc-200">
                  <div className="font-display font-bold text-white light:text-zinc-900 text-lg flex items-center gap-1.5">
                    Brand<span className="text-[#dc2626]">Brick</span>
                  </div>
                  <div className="flex gap-5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 light:text-zinc-600">
                    <span>Stack</span><span>Work</span><span>Approach</span>
                  </div>
                </div>
                <div className="my-8">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#dc2626]/10 text-[#dc2626] text-[8px] font-bold uppercase tracking-widest mb-3">Spatial Experience</span>
                  <div className="text-xl md:text-2xl font-display font-bold text-white light:text-zinc-900 mb-3 leading-none">
                    Engineered for <span className="text-[#dc2626] italic">growth</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden light:bg-zinc-200">
                    <div className="h-full w-1/3 bg-[#dc2626] rounded-full" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="px-5 py-2.5 bg-[#dc2626] text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.25)]">Start Project</div>
                  <div className="px-5 py-2.5 border border-zinc-800 text-zinc-400 rounded-full text-[10px] font-bold uppercase tracking-wider light:border-zinc-350 light:text-zinc-700">Explore Stack</div>
                </div>
              </div>
            )}
            
            {/* Label After */}
            <div className="absolute right-6 bottom-6 z-20 px-3 py-1.5 rounded-lg bg-[#dc2626]/15 border border-[#dc2626]/30 text-[#dc2626] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(220,38,38,0.15)]">
              <Check size={10} /> After
            </div>
          </div>
        </div>

        {/* ================= SLIDER BAR & HANDLE ================= */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-[#dc2626] shadow-[0_0_10px_#dc2626] z-30 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Floating drag button */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-zinc-950 border-2 border-[#dc2626] flex items-center justify-center cursor-ew-resize z-40 text-[#dc2626] shadow-[0_0_20px_rgba(220,38,38,0.4)] pointer-events-auto hover:scale-110 active:scale-95 transition-transform duration-200"
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <ArrowLeftRight size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}
