"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NextGenHeader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ padding: "80px 48px 40px", textAlign: "center" }}>
      <h2 className="font-serif" style={{
        fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 10
      }}>
        Next-Gen Fashion Photoshoot
      </h2>
      <p style={{ fontSize: 14, color: "var(--gray-600)", marginTop: 10, lineHeight: 1.65 }}>
        Create Stunning Fashion Visuals Without A Real Photoshoot.
      </p>
    </div>
  );
}
