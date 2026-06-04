import { useEffect, useRef } from "react";

export function PremiumParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize performance
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Handle Resize
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();
    
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setSize, 200);
    };
    window.addEventListener("resize", handleResize);

    // Mouse Interaction
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Particle Configuration
    // Less particles on mobile, more on desktop for performance and aesthetics
    const particleCount = Math.min(Math.floor((width * height) / 12000), 120);
    const maxDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen gently
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 38, 38, 0.4)"; // Brand Red tinted
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const render = () => {
      // Create a deep, premium dark background
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      // Add a very subtle dark red ambient gradient in the center
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/1.5);
      grad.addColorStop(0, "rgba(30, 5, 5, 1)");
      grad.addColorStop(1, "rgba(3, 3, 3, 1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach(p => p.update());

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Opacity based on distance
            const opacity = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(220, 38, 38, ${opacity * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Magnetic Mouse Interaction
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // When mouse is close, draw bright connecting lines
        if (dist < maxDistance * 1.5) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = 1 - dist / (maxDistance * 1.5);
          ctx.strokeStyle = `rgba(220, 38, 38, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Gently pull particles towards mouse to create a cool interactive magnetic effect
          if (dist < maxDistance) {
            particles[i].x -= dx * 0.015;
            particles[i].y -= dy * 0.015;
          }
        }
        
        particles[i].draw();
      }

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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-50"
    />
  );
}
