import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LiquidButton } from "./ui/LiquidButton";
import { MenuBar } from "./ui/animated-menu-bar";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Why Us", href: "#why-us" },
  { name: "Our Tools", href: "#stack" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ["services", "why-us", "stack", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = "";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = section;
            break;
          }
        }
      }

      if (window.scrollY < 100) {
        currentSection = "";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-zinc-800 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex-shrink-0 relative z-50 flex items-center gap-3">
            <svg viewBox="0 0 100 116" className="w-[34px] md:w-10 h-auto shrink-0 text-brand fill-current" xmlns="http://www.w3.org/2000/svg">
              {/* Top Face */}
              <path d="M 47.5 40 L 24 26.5 L 47.5 13 L 71 26.5 Z" />
              {/* Left Face */}
              <path d="M 22 30.5 L 45.5 43.5 L 45.5 93.5 L 22 80.5 Z" />
              {/* Center Stem */}
              <path d="M 49.5 44.7 L 53.5 42.4 L 53.5 91.2 L 49.5 93.5 Z" />
              {/* Top Lobe */}
              <path d="M 57 40.4 L 74 30.6 C 83.5 36.1, 83.5 50.1, 74 55.5 L 57 65.3 Z" />
              {/* Bottom Lobe */}
              <path d="M 57 68.8 L 74 59.0 C 83.5 64.5, 83.5 78.4, 74 83.9 L 57 93.7 Z" />
            </svg>
            <div className="flex flex-col items-center">
              <span className="font-sans font-medium text-2xl md:text-[28px] tracking-tight text-white flex items-center leading-none">
                Brand<span className="font-bold text-brand ml-[2px]">Brick</span>
              </span>
              <span className="text-[9px] md:text-[10.5px] font-bold tracking-[0.35em] text-zinc-400 uppercase mt-1 ml-1 leading-none font-display">
                Studio
              </span>
            </div>
          </a>

          {/* Animated Menu Bar Center */}
          <div className="hidden lg:block flex-1 max-w-md mx-auto">
            <MenuBar activeSection={activeSection} />
          </div>

          {/* CTA Button + Discount Icon */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <a 
              href="#industry-discounts"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("industry-discounts");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="relative p-2.5 rounded-full border border-zinc-800 hover:border-amber-400 bg-zinc-900/50 hover:bg-amber-400/10 text-zinc-400 hover:text-white transition-all duration-300 group flex items-center justify-center animate-pulse"
              title="Special Partner Discounts"
            >
              {/* Spinning Golden outer ring border on hover */}
              <div className="absolute inset-0 rounded-full p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-full rounded-full border border-dashed border-amber-400/60 animate-[spin_8s_linear_infinite]" />
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]">
                <line x1="19" y1="5" x2="5" y2="19" />
                <circle cx="6.5" cy="6.5" r="2.5" fill="currentColor" />
                <circle cx="17.5" cy="17.5" r="2.5" fill="currentColor" />
              </svg>
            </a>
            <LiquidButton href="#contact" variant="solid" size="default">
              Book a Call
            </LiquidButton>
          </div>

          {/* Mobile Actions Container */}
          <div className="lg:hidden flex items-center gap-3 relative z-50">
            <a 
              href="#industry-discounts"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                const el = document.getElementById("industry-discounts");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="p-2.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-amber-400 flex items-center justify-center active:border-amber-400 animate-pulse"
              title="Special Partner Discounts"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]">
                <line x1="19" y1="5" x2="5" y2="19" />
                <circle cx="6.5" cy="6.5" r="2.5" fill="currentColor" />
                <circle cx="17.5" cy="17.5" r="2.5" fill="currentColor" />
              </svg>
            </a>
            <button
              className="p-2 -mr-2 text-zinc-300 hover:text-white transition-colors group"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} className="group-hover:hover-blink-icon" /> : <Menu size={24} className="group-hover:hover-blink-icon" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-28 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-display font-medium text-zinc-300 hover:text-white transition-colors border-b border-zinc-900 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <LiquidButton
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 self-start w-full"
              >
                Book a Call
              </LiquidButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
