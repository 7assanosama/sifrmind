"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  depth: number;
  char: string;
}

const SPACING = 40;
const MOUSE_RADIUS = 200;

export default function InteractiveSifrBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf: number;
    let isVisible = true;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];

      for (let y = SPACING / 2; y < canvas.height; y += SPACING) {
        for (let x = SPACING / 2; x < canvas.width; x += SPACING) {
          particles.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            depth: Math.random(),
            char: Math.random() > 0.5 ? "0" : "1",
          });
        }
      }
    };

    const animate = () => {
      if (!isVisible) {
        raf = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const colors = { bright: "#FAFAFA", mid: "#A1A1AA", dim: "#333333" };

      ctx.font = "12px 'IBM Plex Sans Arabic', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const driftX = Math.sin(time + i * 0.3) * 1.5;
        const driftY = Math.cos(time + i * 0.3) * 1.5;

        const targetX = p.ox + driftX;
        const targetY = p.oy + driftY;

        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx -= (dx / dist) * force * 2;
          p.vy -= (dy / dist) * force * 2;

          const wave = Math.sin(dist * 0.05 - time * 2) * 2;
          p.vx += (dx / dist) * wave * 0.15;
          p.vy += (dy / dist) * wave * 0.15;
        }

        p.vx += (targetX - p.x) * 0.06;
        p.vy += (targetY - p.y) * 0.06;

        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        const active = dist < MOUSE_RADIUS;
        const ratio = active ? 1 - dist / MOUSE_RADIUS : 0;

        const scale = 1 + ratio * (1.5 + p.depth);
        const opacity = 0.15 + p.depth * 0.25 + ratio * 0.6;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        ctx.fillStyle =
          ratio > 0.5 ? colors.bright : ratio > 0.2 ? colors.mid : colors.dim;

        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      raf = requestAnimationFrame(animate);
    };

    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const leave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    init();

    if (!shouldReduceMotion) {
      animate();
    }

    visibilityObserver.observe(canvas);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      visibilityObserver.disconnect();
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
