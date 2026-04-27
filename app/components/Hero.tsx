"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

const PREMIUM_IMAGES = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0c500ba14174?q=80&w=600&auto=format&fit=crop",
];

const ARC_CARDS = [
  { angle: -38, w: 100, h: 140, src: PREMIUM_IMAGES[5], overlay: "rgba(80,200,190,0.35)" },
  { angle: -24, w: 120, h: 160, src: PREMIUM_IMAGES[0], overlay: "rgba(220,140,50,0.3)" },
  { angle: -11, w: 140, h: 190, src: PREMIUM_IMAGES[1], overlay: "rgba(210,160,220,0.35)" },
  { angle: 0,   w: 160, h: 220, src: PREMIUM_IMAGES[2], overlay: "rgba(0,0,0,0)" },
  { angle: 11,  w: 140, h: 190, src: PREMIUM_IMAGES[3], overlay: "rgba(160,200,220,0.3)" },
  { angle: 24,  w: 120, h: 160, src: PREMIUM_IMAGES[4], overlay: "rgba(240,130,150,0.35)" },
  { angle: 38,  w: 100, h: 140, src: PREMIUM_IMAGES[6], overlay: "rgba(120,200,170,0.3)" },
];
const RADIUS = 380;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = arcRef.current?.querySelectorAll(".arc-card") as NodeListOf<HTMLElement>;
    if (!cards) return;

    // Initial state
    gsap.set(cards, { opacity: 0, scale: 0.8 });
    gsap.set([titleRef.current, subRef.current, uploadRef.current], { opacity: 0, y: 30 });

    // Stagger in arc cards
    gsap.to(cards, {
      opacity: 1, scale: 1, duration: 1.2, stagger: 0.1,
      ease: "expo.out", delay: 0.5
    });

    // Hero text
    gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "expo.out" });
    gsap.to(subRef.current, { opacity: 1, y: 0, duration: 1, delay: 1.0, ease: "expo.out" });
    gsap.to(uploadRef.current, { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "expo.out" });

    // Mouse parallax on arc
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      gsap.to(arcRef.current, {
        x: dx * 30, y: dy * 15, duration: 1.2, ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={heroRef} style={{
      position: "relative", height: "100vh", minHeight: 700,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", overflow: "hidden", background: "#fff"
    }}>
      <ThreeBackground />

      {/* Purple glow */}
      <div style={{
        position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)",
        width: 800, height: 600, borderRadius: "50%",
        background: "radial-gradient(ellipse at center,#ede6fa 0%,#f2edfc 38%,transparent 72%)",
        pointerEvents: "none", zIndex: 2
      }} />

      <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 5 }}>
        {/* Arc pivot */}
        <div ref={arcRef} style={{
          position: "absolute", top: 300, left: "50%", transform: "translateX(-50%)",
          width: 0, height: 0, zIndex: 3, pointerEvents: "none"
        }}>
          {ARC_CARDS.map((c, i) => {
            const rad = c.angle * Math.PI / 180;
            const bx = Math.sin(rad) * 320;
            const by = -Math.cos(rad) * 320;
            const zIndex = 10 - Math.abs(3 - i);
            return (
              <div key={i} className="arc-card" style={{
                width: c.w, height: c.h,
                left: bx - c.w / 2,
                top: by - c.h,
                zIndex,
                transform: `rotate(${c.angle}deg)`,
                transformOrigin: "50% 100%",
                boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                ...(i <= 1 ? { maskImage: "linear-gradient(to right,transparent 0%,black 100%)", opacity: i === 0 ? 0.3 : 0.8 } : {}),
                ...(i >= 5 ? { maskImage: "linear-gradient(to left,transparent 0%,black 100%)", opacity: i === 6 ? 0.3 : 0.8 } : {}),
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: c.overlay, mixBlendMode: "multiply", borderRadius: 18 }} />
              </div>
            );
          })}
        </div>

        {/* Hero text */}
        <div ref={textRef} style={{ textAlign: "center", maxWidth: 560, padding: "0 16px", marginTop: 0 }}>
          <h1 ref={titleRef} style={{
            fontSize: "clamp(42px,5.5vw,68px)", lineHeight: 1.05,
            letterSpacing: "-0.04em", fontWeight: 500, marginBottom: 16,
            color: "var(--black)"
          }}>
            Create Studio-Quality<br />Photos With AI
          </h1>
          <p ref={subRef} style={{ fontSize: 14, color: "var(--gray-600)", marginBottom: 34, lineHeight: 1.65 }}>
            Transform Simple Product Images Into High-Converting Visuals<br />Using AI – No Photoshoot Required.
          </p>

          <div ref={uploadRef} className="upload-shimmer" style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 9,
            background: "rgba(250,249,254,0.92)", border: "1.5px solid rgba(210,205,225,0.55)",
            borderRadius: 16, padding: "28px 80px", cursor: "pointer", position: "relative",
            width: 500, maxWidth: "90vw", transition: "all 0.25s", margin: "0 auto"
          }}
            onMouseEnter={e => gsap.to(e.currentTarget, { y: -4, boxShadow: "0 12px 40px rgba(160,140,200,0.18)", duration: 0.3 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, boxShadow: "none", duration: 0.3 })}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 15V3m0 0L8 7m4-4 4 4" /><rect x="3" y="17" width="18" height="4" rx="2" fill="none" />
            </svg>
            <span style={{ fontSize: 13.5, color: "var(--gray-600)", fontWeight: 500 }}>Upload Or Drag Your Files Here</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 5
      }}>
        <span style={{ fontSize: 11, color: "var(--gray-400)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{
          width: 1, height: 36, background: "linear-gradient(to bottom, var(--gray-400), transparent)",
          animation: "float 2s ease-in-out infinite"
        }} />
      </div>
    </section>
  );
}
