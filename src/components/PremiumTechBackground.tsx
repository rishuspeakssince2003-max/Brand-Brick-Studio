import { useEffect, useRef } from "react";

interface Wave {
  y: number;
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
}

export function PremiumTechBackground({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Responsive scaling
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Support high DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    setSize();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setSize, 200);
    };
    window.addEventListener("resize", handleResize);

    // Mouse coordinates (default centered or off-screen)
    let mouse = { x: width / 2, y: height / 2, active: false };
    let targetMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Dynamic Waves (Aurora Mesh) configuration
    // Defined using multi-layered slow-moving sine curves
    const waves: Wave[] = [
      {
        y: height * 0.4,
        amplitude: 140,
        frequency: 0.0015,
        speed: 0.0003,
        color: "rgba(220, 38, 38, 0.06)", // Brand Red
        phase: 0,
      },
      {
        y: height * 0.5,
        amplitude: 180,
        frequency: 0.001,
        speed: -0.0002,
        color: "rgba(153, 27, 27, 0.04)", // Dark Ruby Red
        phase: Math.PI / 4,
      },
      {
        y: height * 0.6,
        amplitude: 120,
        frequency: 0.002,
        speed: 0.0004,
        color: "rgba(239, 68, 68, 0.03)", // Bright Coral Red
        phase: Math.PI / 2,
      },
    ];

    const isMobileDevice = typeof window !== "undefined" && (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
      (window.innerWidth < 768)
    );

    // Particle/Ember Configuration
    const particleCount = isMobileDevice ? 15 : Math.min(Math.floor((width * height) / 18000), 70);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(Math.random() * 0.3 + 0.1), // Float upwards
        radius: Math.random() * 2 + 1,
        alpha: Math.random(),
        maxAlpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.01 + 0.005,
      });
    }

    // Grid details
    const gridSize = 72; // Spacing of grid cells
    const spotlightRadius = 300;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      if (!activeRef.current) {
        ctx.fillStyle = "#040404";
        ctx.fillRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 1;

      // Smooth mouse follow (interpolation for fluid spotlight movement)
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      // 1. Draw base deep dark background (Pitch Black matte color)
      ctx.fillStyle = "#040404";
      ctx.fillRect(0, 0, width, height);

      // 2. Draw subtle dark red radial background vignette
      const centerGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      centerGlow.addColorStop(0, "rgba(24, 4, 4, 1)");
      centerGlow.addColorStop(0.5, "rgba(8, 2, 2, 1)");
      centerGlow.addColorStop(1, "rgba(4, 4, 4, 1)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw Organic Aurora Waves
      // Creates layered shifting fluid fields
      const activeWaves = isMobileDevice ? waves.slice(0, 1) : waves;
      activeWaves.forEach((wave) => {
        ctx.beginPath();
        const startY =
          wave.y +
          Math.sin(time * wave.speed + wave.phase) * wave.amplitude;
        ctx.moveTo(0, startY);

        const step = isMobileDevice ? 45 : 15;
        // Plot points along the screen width
        for (let x = 0; x <= width; x += step) {
          const currentY =
            wave.y +
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) *
              wave.amplitude *
              Math.cos(x * 0.0005 - time * 0.0002);
          ctx.lineTo(x, currentY);
        }

        // Connect back to corners to make a full bottom shape, or draw as a thick gradient ribbon
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Fill with linear gradient fading to bottom
        const grad = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, height);
        grad.addColorStop(0, wave.color);
        grad.addColorStop(0.6, "rgba(10, 2, 2, 0.0)");
        grad.addColorStop(1, "rgba(4, 4, 4, 0)");
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 4. Draw Interactive Grid
      // Fine dot network with mouse tracking activation
      if (!isMobileDevice) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.035)"; // Base faint color for cells
        
        const gridCols = Math.ceil(width / gridSize) + 1;
        const gridRows = Math.ceil(height / gridSize) + 1;

        for (let c = 0; c < gridCols; c++) {
          for (let r = 0; r < gridRows; r++) {
            const baseGridX = c * gridSize;
            const baseGridY = r * gridSize;

            // Mouse distance calculation
            const dx = baseGridX - mouse.x;
            const dy = baseGridY - mouse.y;
            const dist = Math.hypot(dx, dy);

            let gridX = baseGridX;
            let gridY = baseGridY;
            let intensity = 0;
            let dotRadius = 1;

            if (dist < spotlightRadius) {
              intensity = 1 - dist / spotlightRadius;
              
              // Subtle elastic distortion: pull grid dots slightly toward mouse (magnetic grid)
              const pushFactor = intensity * 4;
              gridX -= (dx / dist) * pushFactor;
              gridY -= (dy / dist) * pushFactor;
              
              // Adjust dot size when activated
              dotRadius = 1 + intensity * 0.8;
            }

            // Render Dot
            ctx.beginPath();
            ctx.arc(gridX, gridY, dotRadius, 0, Math.PI * 2);

            if (intensity > 0) {
              // Activated red glowing dot
              ctx.fillStyle = `rgba(220, 38, 38, ${0.05 + intensity * 0.35})`;
              ctx.fill();
              
              // Add a tiny secondary bloom ring around very close dots
              if (intensity > 0.75) {
                ctx.beginPath();
                ctx.arc(gridX, gridY, dotRadius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 38, 38, ${(intensity - 0.75) * 0.15})`;
                ctx.fill();
              }
            } else {
              // Dormant gray/white grid dot
              ctx.fillStyle = "rgba(100, 100, 100, 0.05)";
              ctx.fill();
            }
          }
        }
      }

      // 5. Draw Mouse Target Reticle (Advanced luxury tech look)
      if (!isMobileDevice && mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(220, 38, 38, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(220, 38, 38, 0.05)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 6. Draw particles / embers
      particles.forEach((p) => {
        // Drift upwards
        p.y += p.vy;
        p.x += p.vx + Math.sin(time * 0.01 + p.y * 0.005) * 0.05; // Gentle weave

        // Hover repulsion
        if (!isMobileDevice) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          
          if (dist < 180) {
            const force = (1 - dist / 180) * 0.4;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Fade in/out pulsing alpha
        p.alpha += p.pulseSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0) {
          p.pulseSpeed = -p.pulseSpeed;
        }
        p.alpha = Math.max(0.01, Math.min(p.alpha, p.maxAlpha));

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw ember
        if (isMobileDevice) {
          // Hardware-accelerated simple circles on mobile to avoid radial gradients
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 38, 38, ${p.alpha * 0.75})`;
          ctx.fill();
        } else {
          const glowGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius * 3
          );
          glowGrad.addColorStop(0, `rgba(220, 38, 38, ${p.alpha})`);
          glowGrad.addColorStop(0.3, `rgba(220, 38, 38, ${p.alpha * 0.4})`);
          glowGrad.addColorStop(1, "rgba(220, 38, 38, 0)");

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-[-50] pointer-events-none overflow-hidden select-none bg-[#040404]"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Dynamic Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Premium film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Vignette styling for a deep, cinematic contrast */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_95%)]" />
    </div>
  );
}
