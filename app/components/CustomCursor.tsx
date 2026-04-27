"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: "power2.out" });
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      gsap.set(ring, { x: ringX, y: ringY });
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => gsap.to([dot, ring], { scale: 2, duration: 0.3 });
    const onLeave = () => gsap.to([dot, ring], { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,.magnetic-btn").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", width: 10, height: 10, background: "#0a0a0a",
        borderRadius: "50%", pointerEvents: "none", zIndex: 9999,
        transform: "translate(-50%,-50%)", mixBlendMode: "difference", top: 0, left: 0
      }} />
      <div ref={ringRef} style={{
        position: "fixed", width: 36, height: 36, border: "1.5px solid rgba(0,0,0,0.25)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 9998,
        transform: "translate(-50%,-50%)", top: 0, left: 0
      }} />
    </>
  );
}
