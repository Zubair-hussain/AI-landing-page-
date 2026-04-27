"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "10x", label: "Faster Than Traditional Shoots" },
  { num: "98%", label: "Client Satisfaction Rate" },
  { num: "50K+", label: "Products Transformed" },
  { num: "$0", label: "Photoshoot Cost" },
  { num: "3s", label: "AI Processing Time" },
  { num: "200+", label: "Style Templates" },
];

export default function StatsMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
      }
    );
  }, []);

  const items = [...STATS, ...STATS]; // duplicate for infinite loop

  return (
    <div ref={sectionRef} style={{
      borderTop: "1px solid var(--gray-200)", borderBottom: "1px solid var(--gray-200)",
      padding: "20px 0", overflow: "hidden", background: "#fff"
    }}>
      <div className="marquee-inner" ref={innerRef}>
        {items.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 48, flexShrink: 0
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span className="font-serif" style={{ fontSize: 28, color: "var(--black)", letterSpacing: "-0.02em" }}>
                {s.num}
              </span>
              <span style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 500, whiteSpace: "nowrap" }}>
                {s.label}
              </span>
            </div>
            <span style={{ color: "var(--gray-200)", fontSize: 20 }}>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
