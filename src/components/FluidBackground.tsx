import { useEffect, useRef } from "react";
// @ts-ignore
import webGLFluidEnhancement from "webgl-fluid";

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize fluid simulation
    webGLFluidEnhancement(canvasRef.current, {
      IMMEDIATE: false,
      TRIGGER: "hover",
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 2,
      VELOCITY_DISSIPATION: 0.98,
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,
      SPLAT_RADIUS: 0.25,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLORFUL: false,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      BACK_COLOR: { r: 5, g: 5, b: 5 },
      TRANSPARENT: false,
      BLOOM: true,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.8,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: true,
      SUNRAYS_RESOLUTION: 196,
      SUNRAYS_WEIGHT: 1.0,
      SPLAT_COLOR: { r: 220, g: 0, b: 0 } // Red bioluminescence
    });

    const canvas = canvasRef.current;

    // Forward window mouse/touch events to the canvas so it works even when z-index is -1
    const forwardEvent = (e: MouseEvent | TouchEvent, type: string) => {
      if (!canvas) return;
      let clientX, clientY;
      
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        return;
      }

      const syntheticEvent = new MouseEvent(type, {
        clientX,
        clientY,
        bubbles: true
      });
      
      // webgl-fluid uses offsetX/Y or pageX/Y, let's mock both
      Object.defineProperty(syntheticEvent, 'offsetX', { get: () => clientX });
      Object.defineProperty(syntheticEvent, 'offsetY', { get: () => clientY });
      Object.defineProperty(syntheticEvent, 'pageX', { get: () => clientX });
      Object.defineProperty(syntheticEvent, 'pageY', { get: () => clientY });
      
      // Also attach targetTouches for touch events
      if (e instanceof TouchEvent) {
        Object.defineProperty(syntheticEvent, 'targetTouches', { get: () => e.targetTouches });
        Object.defineProperty(syntheticEvent, 'changedTouches', { get: () => e.changedTouches });
      }
      
      canvas.dispatchEvent(syntheticEvent);
    };

    const handleMouseMove = (e: MouseEvent) => forwardEvent(e, 'mousemove');
    const handleMouseDown = (e: MouseEvent) => forwardEvent(e, 'mousedown');
    const handleMouseUp = (e: MouseEvent) => forwardEvent(e, 'mouseup');
    const handleTouchStart = (e: TouchEvent) => forwardEvent(e, 'touchstart');
    const handleTouchMove = (e: TouchEvent) => forwardEvent(e, 'touchmove');
    const handleTouchEnd = (e: TouchEvent) => forwardEvent(e, 'touchend');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-10] pointer-events-none"
    />
  );
}
