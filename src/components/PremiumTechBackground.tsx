import { useEffect, useRef } from "react";

interface Wave {
  y: number;
  amplitude: number;
  frequency: number;
  color: string;
  phase: number;
}

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

    // Static waves configuration
    const waves: Wave[] = [
      {
        y: height * 0.4,
        amplitude: 140,
        frequency: 0.0015,
        color: "rgba(220, 38, 38, 0.06)", // Brand Red
        phase: Math.PI / 6,
      },
      {
        y: height * 0.5,
        amplitude: 180,
        frequency: 0.001,
        color: "rgba(153, 27, 27, 0.04)", // Dark Ruby Red
        phase: Math.PI / 3,
      },
      {
        y: height * 0.6,
        amplitude: 120,
        frequency: 0.002,
        color: "rgba(239, 68, 68, 0.03)", // Bright Coral Red
        phase: Math.PI / 2,
      },
    ];

    const isMobileDevice = typeof window !== "undefined" && (
      window.innerWidth < 768
    );

    // Static embers / particles
    const particleCount = isMobileDevice ? 15 : Math.min(Math.floor((width * height) / 18000), 70);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const gridSize = 100;

    const draw = () => {
      const isLight = document.documentElement.classList.contains("light");

      // 1. Draw base background
      ctx.fillStyle = isLight ? "#ffffff" : "#040404";
      ctx.fillRect(0, 0, width, height);

      // 2. Draw subtle radial background vignette
      const centerGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      if (isLight) {
        centerGlow.addColorStop(0, "rgba(255, 230, 230, 0.3)");
        centerGlow.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
        centerGlow.addColorStop(1, "rgba(255, 255, 255, 1)");
      } else {
        centerGlow.addColorStop(0, "rgba(24, 4, 4, 1)");
        centerGlow.addColorStop(0.5, "rgba(8, 2, 2, 1)");
        centerGlow.addColorStop(1, "rgba(4, 4, 4, 1)");
      }
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw Organic Aurora Waves (Static)
      const activeWaves = isMobileDevice ? waves.slice(0, 1) : waves;
      activeWaves.forEach((wave) => {
        ctx.beginPath();
        const startY = wave.y + Math.sin(wave.phase) * wave.amplitude;
        ctx.moveTo(0, startY);

        const step = isMobileDevice ? 45 : 35;
        for (let x = 0; x <= width; x += step) {
          const currentY =
            wave.y +
            Math.sin(x * wave.frequency + wave.phase) *
              wave.amplitude *
              Math.cos(x * 0.0005);
          ctx.lineTo(x, currentY);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, height);
        grad.addColorStop(0, wave.color);
        if (isLight) {
          grad.addColorStop(0.6, "rgba(255, 255, 255, 0.0)");
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        } else {
          grad.addColorStop(0.6, "rgba(10, 2, 2, 0.0)");
          grad.addColorStop(1, "rgba(4, 4, 4, 0)");
        }
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 4. Draw Static Grid
      if (!isMobileDevice) {
        const gridCols = Math.ceil(width / gridSize) + 1;
        const gridRows = Math.ceil(height / gridSize) + 1;

        for (let c = 0; c < gridCols; c++) {
          for (let r = 0; r < gridRows; r++) {
            const gridX = c * gridSize;
            const gridY = r * gridSize;

            ctx.beginPath();
            ctx.arc(gridX, gridY, 1, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? "rgba(100, 100, 100, 0.08)" : "rgba(100, 100, 100, 0.05)";
            ctx.fill();
          }
        }
      }

      // 5. Draw static embers
      particles.forEach((p) => {
        ctx.beginPath();
        const drawRadius = isMobileDevice ? p.radius * 2 : p.radius * 2.5;
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha * (isLight ? 0.75 : 0.65)})`;
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
      className="fixed inset-0 w-full h-full z-[-50] pointer-events-none overflow-hidden select-none bg-[#040404] light:bg-[#ffffff]"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Static Canvas */}
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

      {/* Vignette styling for a deep, cinematic contrast */}
      <div className="absolute inset-0 pointer-events-none vignette-overlay" />
    </div>
  );
}
