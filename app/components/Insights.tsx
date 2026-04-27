"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_ITEMS = [
  { year: "2020", desc: "How AI is Revolutionizing Product Photography", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" },
  { year: "2023", desc: "AI Doubles E-commerce Sales Conversion", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop" },
  { year: "2025", desc: "Next-Generation AI Image Transformation", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop" },
  { year: "2026", desc: "Real-time Rendering Becomes Standard", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" },
];

export default function Insights() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".insights-left-content",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
      gsap.fromTo(".ti-item-el",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } }
      );
    });
    return () => ctx.revert();
  }, []);

  const switchItem = (i: number) => {
    if (!imgRef.current) return;
    setActive(i);
    gsap.to(imgRef.current, {
      opacity: 0, scale: 0.96, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        if (imgRef.current) imgRef.current.src = TIMELINE_ITEMS[i].img;
        gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" });
      }
    });
  };

  return (
    <section ref={sectionRef} style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
        alignItems: "start", maxWidth: 1200, margin: "0 auto", padding: "0 48px"
      }}>
        {/* Left */}
        <div className="insights-left-content">
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 10 }}>
            Blog & Trends
          </p>
          <h2 className="font-serif" style={{
            fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 1.08, letterSpacing: "-0.02em"
          }}>
            Insights &amp; Trends<br />In AI Photography
          </h2>
          {/* Timeline image */}
          <div style={{ marginTop: 40, borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 240 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={TIMELINE_ITEMS[0].img} alt="AI Photography trend"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>

        {/* Right timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {TIMELINE_ITEMS.map((item, i) => (
            <div key={item.year} className="ti-item-el" onClick={() => switchItem(i)} style={{
              display: "flex", alignItems: "flex-start", gap: 20,
              padding: "24px 0",
              borderTop: "1px solid var(--gray-200)",
              borderBottom: i === TIMELINE_ITEMS.length - 1 ? "1px solid var(--gray-200)" : undefined,
              cursor: "pointer", transition: "all 0.2s", position: "relative"
            }}>
              <div className="font-serif" style={{
                fontSize: "clamp(28px,3vw,44px)", fontWeight: 400,
                color: i === active ? "var(--black)" : "var(--gray-200)",
                transition: "color 0.3s", minWidth: 110, lineHeight: 1
              }}>
                {item.year}
              </div>
              <div style={{
                fontSize: 13, color: i === active ? "var(--gray-600)" : "var(--gray-400)",
                lineHeight: 1.55, paddingTop: 6, transition: "color 0.3s"
              }}>
                {item.desc}
              </div>
              {i === active && (
                <div style={{
                  marginLeft: "auto", color: "var(--gray-400)", flexShrink: 0, paddingTop: 4
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%", background: "var(--black)",
                    border: "none", color: "#fff", cursor: "pointer", fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "var(--shadow-sm)"
                  }}>→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
