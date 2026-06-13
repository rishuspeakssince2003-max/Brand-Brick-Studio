import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LiquidButton } from "./ui/LiquidButton";
import { MenuBar } from "./ui/animated-menu-bar";

const navLinks = [
  { name: "Process", href: "/#process" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Founder", href: "/#founder" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar({ theme, toggleTheme, currentPath }: { theme: "dark" | "light"; toggleTheme: () => void; currentPath: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ["work", "process", "why-us", "founder", "contact"];
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
        className={`fixed top-0 left-0 z-50 transition-all duration-300 w-full ${
          scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-zinc-800 py-3 light:bg-white/80 light:border-zinc-200" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 relative z-50 flex items-center gap-3">
            <img src="/logo.png" alt="Brand Brick Logo" className="w-[34px] md:w-10 h-auto shrink-0" />
            <div className="flex flex-col items-center">
              <span className="font-sans font-medium text-2xl md:text-[28px] tracking-tight text-white light:text-zinc-900 flex items-center leading-none">
                Brand<span className="font-bold text-brand ml-[2px]">Brick</span>
              </span>
              <span className="text-[9px] md:text-[10.5px] font-bold tracking-[0.35em] text-zinc-400 light:text-zinc-500 uppercase mt-1 ml-1 leading-none font-display">
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
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-800/20 text-zinc-400 hover:text-white transition-all duration-300 group flex items-center justify-center cursor-pointer light:border-zinc-200 light:bg-white/50 light:hover:bg-zinc-100 light:text-zinc-600 light:hover:text-zinc-950"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "light" ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.div>
            </button>
            <LiquidButton href="https://wa.me/917383386318" target="_blank" rel="noreferrer" variant="solid" size="default">
              Start Chat
            </LiquidButton>
          </div>

          {/* Mobile Actions Container */}
          <div className="lg:hidden flex items-center gap-3 relative z-50">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 flex items-center justify-center active:border-zinc-600 cursor-pointer light:border-zinc-200 light:bg-white/50 light:text-zinc-600"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              className="p-2 -mr-2 text-zinc-300 hover:text-white light:text-zinc-600 light:hover:text-zinc-950 transition-colors group"
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
            className="fixed inset-0 z-40 bg-[#050505] light:bg-[#ffffff] pt-28 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-display font-medium text-zinc-300 hover:text-white light:text-zinc-700 light:hover:text-zinc-950 transition-colors border-b border-zinc-900 light:border-zinc-100 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <LiquidButton
                href="https://wa.me/917383386318"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-4 self-start w-full text-center"
              >
                Start Chat
              </LiquidButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
