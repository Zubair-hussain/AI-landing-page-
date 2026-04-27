"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BEFORE_IMG = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=10&w=144&blur=2&auto=format&fit=crop";
const AFTER_IMG = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=100&w=2000&auto=format&fit=crop";

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".magic-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".magic-title", start: "top 80%" } }
      );
      gsap.fromTo(".ba-card-before",
        { opacity: 0, x: -60, rotate: -8 },
        { opacity: 1, x: 0, rotate: -6, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(".ba-card-after",
        { opacity: 0, x: 60, rotate: 8 },
        { opacity: 1, x: 0, rotate: 6, duration: 1, ease: "expo.out", delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    });
    return () => ctx.revert();
  }, []);

  const getPercent = (e: MouseEvent | TouchEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const p = ((clientX - rect.left) / rect.width) * 100;
    return Math.max(5, Math.min(95, p));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onDown = () => { dragging.current = true; };
    const onUp = () => { dragging.current = false; };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      setPos(getPercent(e));
    };
    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <div>
      {/* Section header */}
      <div style={{ padding: "60px 48px 40px", textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <h2 className="magic-title font-serif" style={{
          fontSize: "clamp(32px,4vw,54px)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 10
        }}>
          See The Magic Of AI Transformation
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.65 }}>
          Drag The Slider For The Difference Between Raw And AI-Enhanced Product Imagery.
        </p>
      </div>

      {/* Interactive slider */}
      <div ref={sectionRef} style={{
        maxWidth: 700, margin: "0 auto", padding: "0 48px 60px"
      }}>
        <div ref={containerRef} className="ba-container" style={{ height: 420, cursor: "ew-resize" }}>
          {/* Before layer (now shows After image in background) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={AFTER_IMG} alt="After" style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none"
          }} />

          {/* After layer clipped (now shows Before image on left) */}
          <div className="ba-after-clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BEFORE_IMG} alt="Before" style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              position: "absolute", inset: 0
            }} />
          </div>

          {/* Divider */}
          <div className="ba-divider" style={{ left: `${pos}%` }}>
            <div className="ba-handle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 12H16M8 12L5 9M8 12L5 15M16 12L19 9M16 12L19 15" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div style={{
            position: "absolute", bottom: 16, left: 16,
            background: "rgba(0,0,0,0.6)", color: "#fff",
            borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700,
            pointerEvents: "none"
          }}>Before</div>
          <div style={{
            position: "absolute", bottom: 16, right: 16,
            background: "rgba(184,224,74,0.9)", color: "var(--black)",
            borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700,
            pointerEvents: "none"
          }}>After — AI Enhanced</div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--gray-400)", marginTop: 12 }}>
          ← Drag to compare →
        </p>
      </div>
    </div>
  );
}
