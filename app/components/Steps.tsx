"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400&auto=format&fit=crop"
];

export default function Steps() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".steps-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".steps-title", start: "top 80%" } }
      );

      gsap.fromTo(".step-card-item",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="steps" style={{ padding: "80px 48px", background: "#fff" }}>
      <div className="steps-title" style={{ textAlign: "center", marginBottom: 60 }}>
        <h2 className="font-serif" style={{
          fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 10
        }}>
          Stunning Photos In 4 Steps
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.65 }}>
          From Raw Image To Publish-Ready Visuals In Under 60 Seconds.
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3,1fr)",
        gap: 24, maxWidth: 1100, margin: "0 auto"
      }}>
        {/* Step 1 */}
        <div className="step-card-item" style={{
          borderRadius: 20, overflow: "hidden", background: "var(--gray-100)",
          minHeight: 300, display: "flex", flexDirection: "column"
        }}>
          <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Upload Your Product</span>
            <span style={{ fontSize: 11, color: "var(--gray-400)", background: "var(--gray-200)", borderRadius: 20, padding: "3px 10px" }}>Step 1</span>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{
              background: "#fff", borderRadius: 14, width: "100%", padding: 24,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
              boxShadow: "var(--shadow-sm)"
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M12 15V3m0 0L8 7m4-4 4 4" /><rect x="3" y="17" width="18" height="4" rx="2" />
              </svg>
              <button style={{
                background: "var(--black)", color: "#fff", border: "none", borderRadius: 30,
                padding: "10px 24px", fontFamily: "inherit", fontSize: 13, fontWeight: 600,
                cursor: "pointer", width: "100%"
              }}>Upload File</button>
            </div>
          </div>
          <p style={{ fontSize: 11, color: "var(--gray-400)", padding: "0 20px 16px", lineHeight: 1.5 }}>
            Start by uploading images or 3D models of your product.
          </p>
        </div>

        {/* Step 2 */}
        <div className="step-card-item" style={{
          borderRadius: 20, overflow: "hidden", background: "#fff",
          border: "1.5px solid var(--gray-200)", minHeight: 300,
          display: "flex", flexDirection: "column"
        }}>
          <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Pose Optimization</span>
            <span style={{ fontSize: 11, color: "var(--gray-400)", background: "var(--gray-100)", borderRadius: 20, padding: "3px 10px" }}>Step 2</span>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
            <div style={{ background: "var(--gray-100)", borderRadius: 14, padding: 16, width: "100%", boxShadow: "var(--shadow-sm)" }}>
              {[
                [{ w: 40 }, { w: 32, accent: true }, { w: 56 }],
                [{ w: 80 }, { w: 40 }],
                [{ w: 60 }, { w: 50 }, { w: 30 }],
                [{ w: 100 }]
              ].map((row, ri) => (
                <div key={ri} style={{ display: "flex", gap: 8, marginBottom: ri < 3 ? 8 : 0 }}>
                  {row.map((b, bi) => (
                    <div key={bi} style={{
                      height: ri === 0 ? 14 : 8, width: b.w,
                      borderRadius: 4,
                      background: (b as { w: number; accent?: boolean }).accent ? "#d4c84a" : "var(--gray-200)"
                    }} />
                  ))}
                </div>
              ))}
            </div>
            <span style={{ position: "absolute", bottom: 40, right: 30, fontSize: 24 }}>▶</span>
          </div>
          <p style={{ fontSize: 11, color: "var(--gray-400)", padding: "0 20px 16px", lineHeight: 1.5 }}>
            AI simulates multiple angles for clothing and accessories.
          </p>
        </div>

        {/* Step 3 */}
        <div className="step-card-item" style={{
          borderRadius: 20, overflow: "hidden", background: "var(--gray-100)",
          minHeight: 300, display: "flex", flexDirection: "column"
        }}>
          <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Ready for E-commerce</span>
            <span style={{ fontSize: 11, color: "var(--gray-400)", background: "var(--gray-200)", borderRadius: 20, padding: "3px 10px" }}>Step 3</span>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ position: "relative", width: 180, height: 170 }}>
              <div style={{
                position: "absolute", top: 0, right: 0, width: 130, height: 150,
                borderRadius: 14, overflow: "hidden", transform: "rotate(6deg)",
                boxShadow: "var(--shadow-md)"
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMAGES[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{
                position: "absolute", bottom: 0, left: 0, width: 130, height: 150,
                borderRadius: 14, overflow: "hidden", transform: "rotate(-4deg)",
                boxShadow: "var(--shadow-lg)", border: "3px solid #fff"
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMAGES[1]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{
                position: "absolute", bottom: -6, right: 0,
                width: 28, height: 28, borderRadius: "50%",
                background: "#fff", border: "2px solid var(--gray-200)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#4caf50", fontSize: 14, boxShadow: "var(--shadow-sm)"
              }}>✓</div>
            </div>
          </div>
          <p style={{ fontSize: 11, color: "var(--gray-400)", padding: "0 20px 16px", lineHeight: 1.5 }}>
            High-resolution images ready for your website or marketplace.
          </p>
        </div>
      </div>
    </section>
  );
}
