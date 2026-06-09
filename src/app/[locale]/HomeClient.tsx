"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

const ibm = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const InteractiveZeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let particles: {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      depth: number;
      char: string;
    }[] = [];
    let raf: number;

    const spacing = 40;
    const mouseRadius = 200;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];

      for (let y = spacing / 2; y < canvas.height; y += spacing) {
        for (let x = spacing / 2; x < canvas.width; x += spacing) {
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      ctx.font = "12px IBM Plex Sans Arabic";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      particles.forEach((p, i) => {
        // breathing motion
        const driftX = Math.sin(time + i * 0.3) * 1.5;
        const driftY = Math.cos(time + i * 0.3) * 1.5;

        const targetX = p.ox + driftX;
        const targetY = p.oy + driftY;

        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;

          // soft push
          p.vx -= (dx / dist) * force * 2;
          p.vy -= (dy / dist) * force * 2;

          // wave ripple
          const wave = Math.sin(dist * 0.05 - time * 2) * 2;
          p.vx += (dx / dist) * wave * 0.15;
          p.vy += (dy / dist) * wave * 0.15;
        }

        // spring back
        p.vx += (targetX - p.x) * 0.06;
        p.vy += (targetY - p.y) * 0.06;

        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        const active = dist < mouseRadius;
        const ratio = active ? 1 - dist / mouseRadius : 0;

        const scale = 1 + ratio * (1.5 + p.depth);
        const opacity = 0.15 + p.depth * 0.25 + ratio * 0.6;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        ctx.fillStyle =
          ratio > 0.5 ? "#ffffff" : ratio > 0.2 ? "#999999" : "#333333";

        ctx.fillText(p.char, 0, 0);

        ctx.restore();
      });

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

    init();
    animate();

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", init);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

interface HomeClientProps {
  messages: { heroText1: string; heroText2: string; soon: string };
}

export default function HomeClient({ messages }: HomeClientProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), {
    damping: 40,
    stiffness: 120,
  });

  const y = useSpring(useTransform(mouseY, [-500, 500], [-15, 15]), {
    damping: 40,
    stiffness: 120,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${ibm.className} relative h-screen w-full bg-black flex items-center justify-center overflow-hidden`}
    >
      {/* grain */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* zeros */}
      <InteractiveZeroBackground />

      {/* cursor glow */}
      <motion.div
        className="pointer-events-none fixed w-40 h-40 rounded-full bg-white/5 blur-3xl"
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* center */}
      <motion.div style={{ x, y }} className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-3xl md:text-5xl lg:text-7xl font-semibold leading-[1.1]"
        >
          {messages.heroText1} <br />{" "}
          <span className="opacity-90">{messages.heroText2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ delay: 1.2, duration: 2 }}
          className="mt-10 text-gray-500 text-sm uppercase"
        >
          {messages.soon}
        </motion.p>
      </motion.div>

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,black_100%)]" />
    </div>
  );
}
