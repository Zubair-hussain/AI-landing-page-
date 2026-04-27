"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = ["Dynamic Angle Control", "Fabric Enhance", "AI Background", "Rapid Model Swapping"];
const PREMIUM_IMAGES = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLImageElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFeat, setActiveFeat] = useState(0);
  const [selThumb, setSelThumb] = useState(2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".feat-list-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );
      gsap.fromTo(mockupRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const switchImage = (id: number) => {
    if (!mainImgRef.current) return;
    gsap.to(mainImgRef.current, {
      opacity: 0, scale: 0.96, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        if (mainImgRef.current) mainImgRef.current.src = PREMIUM_IMAGES[id];
        gsap.to(mainImgRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
      }
    });
  };

  return (
    <section ref={sectionRef} id="features" style={{
      padding: "0 48px 80px", display: "flex", gap: 60,
      maxWidth: 1240, margin: "0 auto", alignItems: "flex-start"
    }}>
      {/* Left feature list */}
      <div style={{ width: 220, flexShrink: 0, paddingTop: 80 }}>
        {FEATURES.map((f, i) => (
          <div key={f} className="feat-list-item" onClick={() => setActiveFeat(i)} style={{
            padding: "18px 0",
            borderBottom: "1px solid var(--gray-200)",
            borderTop: i === 0 ? "1px solid var(--gray-200)" : undefined,
            cursor: "pointer", transition: "all 0.2s"
          }}>
            <span style={{
              fontSize: 15, fontWeight: i === activeFeat ? 600 : 500,
              color: i === activeFeat ? "var(--black)" : "var(--gray-600)",
              transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8
            }}>
              {i === activeFeat && (
                <span style={{ width: 6, height: 6, background: "#b8e04a", borderRadius: "50%", display: "inline-block" }} />
              )}
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* Center mockup */}
      <div ref={mockupRef} style={{ flex: 1 }}>
        <div style={{
          background: "#1b1f2e", borderRadius: 22, overflow: "hidden",
          boxShadow: "var(--shadow-lg)", position: "relative"
        }}>
          {/* Badge */}
          <div style={{
            position: "absolute", top: -14, right: 40, background: "#fff",
            borderRadius: 12, padding: "10px 14px", boxShadow: "var(--shadow-md)",
            display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, zIndex: 10
          }}>
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2].map(id => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={id} src={PREMIUM_IMAGES[id]} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
              ))}
            </div>
            Video Effect <span>▶</span>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, padding: "16px 16px 0", background: "#1b1f2e" }}>
            {["Pose Control", "Style Transfer", "Fabric Swap", "Background AI"].map((t, i) => (
              <button key={t} onClick={() => setActiveTab(i)} style={{
                padding: "9px 18px", borderRadius: 30, fontSize: 13, fontWeight: i === activeTab ? 600 : 500,
                background: i === activeTab ? "#fff" : "transparent",
                border: "none", color: i === activeTab ? "var(--black)" : "rgba(255,255,255,0.45)",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s"
              }}>
                {t}
              </button>
            ))}
          </div>

          {/* Main image */}
          <div style={{ margin: 14, borderRadius: 14, overflow: "hidden", height: 320, position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={mainImgRef} src={PREMIUM_IMAGES[2]} alt="fashion model"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>

          {/* Thumb strip */}
          <div style={{ display: "flex", gap: 10, padding: "14px 16px", overflow: "hidden" }}>
            {PREMIUM_IMAGES.map((src, i) => (
              <div key={i} onClick={() => { setSelThumb(i); switchImage(i); }} style={{
                flex: 1, minWidth: 0, borderRadius: 12, overflow: "hidden", height: 110,
                cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
                outline: i === selThumb ? "2px solid #d4c84a" : "none",
                outlineOffset: 2,
                opacity: (i === 0 || i === PREMIUM_IMAGES.length - 1) ? 0.5 : 1,
                transform: i === selThumb ? "scale(1.03)" : "scale(1)"
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
