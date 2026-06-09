import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import Lenis from "lenis";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { CaseStudies } from "./components/CaseStudies";
import { BeforeAfter } from "./components/BeforeAfter";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Process } from "./components/Process";
import { Proof } from "./components/Proof";
import { Stack } from "./components/Stack";
import { Packages } from "./components/Packages";
import { Team } from "./components/Team";
import { Instagram } from "./components/Instagram";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { PremiumTechBackground } from "./components/PremiumTechBackground";
import { CustomCursor } from "./components/CustomCursor";
import { SeoLandingPage } from "./components/SeoLandingPage";

const seoRoutes = [
  "/branding-agency-surat",
  "/creative-agency-surat",
  "/website-design-company-surat",
  "/social-media-marketing-agency-surat",
  "/branding-agency-gujarat"
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  const [path, setPath] = useState(() => (typeof window !== "undefined" ? window.location.pathname.replace(/\/$/, "") : "/"));

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname.replace(/\/$/, ""));
    };
    
    // Intercept clicks on links that are local routes to provide a smooth SPA transition
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href) {
        try {
          const url = new URL(anchor.href);
          if (url.origin === window.location.origin) {
            const cleanPath = url.pathname.replace(/\/$/, "");
            const isSeoRoute = seoRoutes.includes(cleanPath);
            if (cleanPath === "" || cleanPath === "/" || isSeoRoute) {
              e.preventDefault();
              window.history.pushState(null, "", url.href);
              setPath(cleanPath || "/");
              
              if (url.hash) {
                setTimeout(() => {
                  const targetEl = document.querySelector(url.hash);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }, 100);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }
          }
        } catch (err) {
          // Ignored
        }
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    document.addEventListener("click", handleLinkClick);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

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

  const isSeoPage = seoRoutes.includes(path);

  return (
    <div className="min-h-screen bg-transparent text-zinc-50 light:text-zinc-900 font-sans selection:bg-brand selection:text-white relative">
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
      <Navbar theme={theme} toggleTheme={toggleTheme} currentPath={path} />
      
      <main>
        <AnimatePresence mode="wait">
          {isSeoPage ? (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SeoLandingPage path={path} />
            </motion.div>
          ) : (
            <motion.div
              key="homepage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Hero />
              <Services />
              <CaseStudies />
              <BeforeAfter />
              <WhyChooseUs />
              <Process />
              <Proof />
              <Packages />
              <Stack />
              <Team />
              <Instagram />
              <FAQ />
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
