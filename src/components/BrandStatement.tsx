import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function BrandStatement() {
  const sentence = "We believe great brands are built through strategy, creativity, and consistency.";
  const words = sentence.split(" ");

  const sectionRef = useRef<HTMLElement>(null);
  
  // Calculate scroll position of the section relative to viewport entry/exit
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    checkTheme();
    
    // Set up observer to track real-time changes in website themes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Scroll-driven color transitions for dark mode: Black -> White -> Black
  const bg = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["#0a0a0a", "#ffffff", "#ffffff", "#0a0a0a"]
  );
  const text = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["#ffffff", "#09090b", "#09090b", "#ffffff"]
  );

  // Fallback to static values if light theme mode is enabled
  const finalBg = isLight ? "#ffffff" : bg;
  const finalTextColor = isLight ? "#09090b" : text;

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor: finalBg }}
      className="w-full py-16 md:py-24 px-4 md:px-6 flex items-center justify-center min-h-[30vh] relative z-10"
    >
      <div className="max-w-5xl text-center mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
              }
            }
          }}
          className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-5 md:gap-y-4"
        >
          {words.map((word, idx) => (
            <span key={idx} className="overflow-hidden inline-block py-1">
              <motion.span
                variants={{
                  hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
                  visible: { 
                    y: 0, 
                    opacity: 1, 
                    filter: "blur(0px)",
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                style={{ color: finalTextColor }}
                className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
