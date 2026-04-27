"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PREMIUM_IMAGES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop"
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".results-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".results-title", start: "top 80%" } }
      );

      // Horizontal scroll reveal
      const photos = rowRef.current?.querySelectorAll(".result-item");
      if (photos) {
        gsap.fromTo(photos,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
            scrollTrigger: { trigger: rowRef.current, start: "top 80%" }
          }
        );
      }

      // Subtle parallax on photos on scroll
      gsap.to(rowRef.current, {
        x: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "80px 0", overflow: "hidden" }}>
      <div className="results-title" style={{ textAlign: "center", padding: "0 48px", marginBottom: 50 }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 10 }}>
          Real Businesses
        </p>
        <h2 className="font-serif" style={{
          fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 10
        }}>
          Real Results. Real Businesses
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.65 }}>
          See How Brands Are Transforming Their Product Visuals With AI.
        </p>
      </div>

      <div ref={rowRef} style={{
        display: "flex", alignItems: "stretch", gap: 16,
        padding: "0 48px", overflowX: "auto"
      }} className="scrollbar-hide">
        {/* Narrow sliver */}
        <div className="result-item" style={{ flexShrink: 0, width: 70, height: 340, borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PREMIUM_IMAGES[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Full photo */}
        <div className="result-item" style={{ flexShrink: 0, width: 280, height: 340, borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PREMIUM_IMAGES[1]} alt="fashion result" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Testimonial card */}
        <div className="result-item" style={{
          flexShrink: 0, width: 280, background: "#fff",
          border: "1.5px solid var(--gray-200)", borderRadius: 20, padding: 28,
          position: "relative", boxShadow: "var(--shadow-md)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          alignSelf: "center", minHeight: 280
        }}>
          <button style={{
            position: "absolute", top: 14, right: 14, width: 26, height: 26,
            borderRadius: "50%", background: "var(--gray-100)", border: "none",
            cursor: "pointer", fontSize: 12, color: "var(--gray-600)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>✕</button>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Randal Boucher</div>
          <div style={{ width: "100%", height: 1, background: "var(--gray-200)", marginBottom: 14 }} />
          <div style={{ color: "#f5c842", fontSize: 15, marginBottom: 12 }}>★★★★★</div>
          <p style={{ fontSize: 13, color: "var(--gray-600)", lineHeight: 1.65 }}>
            Saved us thousands in photoshoot costs. The AI backgrounds are indistinguishable from real studio shots, delivering professional results with perfect lighting and depth.
          </p>
        </div>

        {/* Full photo */}
        <div className="result-item" style={{ flexShrink: 0, width: 280, height: 340, borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PREMIUM_IMAGES[2]} alt="fashion result" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Narrow sliver */}
        <div className="result-item" style={{ flexShrink: 0, width: 70, height: 340, borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PREMIUM_IMAGES[3]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}
