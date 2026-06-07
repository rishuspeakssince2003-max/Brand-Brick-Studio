import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import Lenis from "lenis";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Proof } from "./components/Proof";
import { Stack } from "./components/Stack";
import { Packages } from "./components/Packages";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { Chatbot } from "./components/Chatbot";
import { PremiumTechBackground } from "./components/PremiumTechBackground";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // 1. Lenis Smooth Inertial Scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);

  // 2. Framer Motion Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-transparent text-zinc-50 font-sans selection:bg-brand selection:text-white relative">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#dc2626] origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <PremiumTechBackground active={!loading} />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Services />
        <Proof />
        <Packages />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
