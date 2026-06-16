import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export function PremiumTechBackground({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const isMobileDevice = typeof window !== "undefined" && (
      window.innerWidth < 768
    );

    // Static red/coral ambient particles representing the soft glowing specks in the screenshot
    const particleCount = isMobileDevice ? 8 : 15;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // radius between 12px and 24px for a nice, soft radial bokeh blur
        radius: Math.random() * 12 + 12,
        // extremely soft transparency to match the subtle background detail
        alpha: Math.random() * 0.25 + 0.15,
      });
    }

    const draw = () => {
      const isLight = document.documentElement.classList.contains("light");

      // 1. Draw base off-white canvas (perfect match for the premium screenshot color)
      ctx.fillStyle = isLight ? "#faf9f9" : "#040404";
      ctx.fillRect(0, 0, width, height);

      // 2. Draw subtle, giant center-bottom ambient red/coral radial glow
      const centerGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.7, // Positioned lower on the screen for a natural bottom horizon glow
        0,
        width / 2,
        height * 0.7,
        Math.max(width, height) * 0.7
      );
      if (isLight) {
        // Soft peach/pink glow fading to the main off-white background
        centerGlow.addColorStop(0, "rgba(220, 38, 38, 0.03)");
        centerGlow.addColorStop(0.5, "rgba(255, 245, 245, 0.4)");
        centerGlow.addColorStop(1, "#faf9f9");
      } else {
        centerGlow.addColorStop(0, "rgba(24, 4, 4, 1)");
        centerGlow.addColorStop(0.5, "rgba(8, 2, 2, 1)");
        centerGlow.addColorStop(1, "rgba(4, 4, 4, 1)");
      }
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw static soft blurry bokeh lights/specks (same to same with screenshot)
      particles.forEach((p) => {
        const x = p.x;
        const y = p.y;
        const radius = isMobileDevice ? p.radius * 0.8 : p.radius;

        ctx.beginPath();
        const particleGlow = ctx.createRadialGradient(x, y, 0, x, y, radius);
        if (isLight) {
          // Soft coral glow fading to fully transparent at the particle boundary
          particleGlow.addColorStop(0, `rgba(220, 38, 38, ${p.alpha * 0.08})`);
          particleGlow.addColorStop(0.4, `rgba(220, 38, 38, ${p.alpha * 0.03})`);
          particleGlow.addColorStop(1, "rgba(220, 38, 38, 0)");
        } else {
          particleGlow.addColorStop(0, `rgba(220, 38, 38, ${p.alpha * 0.12})`);
          particleGlow.addColorStop(1, "rgba(220, 38, 38, 0)");
        }
        ctx.fillStyle = particleGlow;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Responsive scaling and drawing
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      draw();
    };
    setSize();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setSize, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-[-50] pointer-events-none overflow-hidden select-none bg-[#040404] light:bg-[#faf9f9]"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Premium film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] light:opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none vignette-overlay" />
    </div>
  );
}
