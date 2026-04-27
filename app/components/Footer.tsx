"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-content",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 85%" } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="footer" style={{
      padding: "80px 48px 0", background: "#fff", position: "relative",
      overflow: "hidden", borderTop: "1px solid var(--gray-100)"
    }}>
      {/* Dot pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.6,
        backgroundImage: "radial-gradient(circle, #d8d8d4 1.2px, transparent 1.2px)",
        backgroundSize: "22px 22px"
      }} />

      {/* Big watermark text */}
      <div className="font-serif" style={{
        position: "absolute", bottom: -20, left: 0, right: 0,
        fontSize: "clamp(80px,13vw,180px)", color: "rgba(0,0,0,0.06)",
        fontWeight: 400, letterSpacing: "-0.02em", textAlign: "left",
        paddingLeft: 40, pointerEvents: "none", userSelect: "none", lineHeight: 1, zIndex: 0
      }}>
        SNAPMIND
      </div>

      <div className="footer-content" style={{
        position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "1fr auto", gap: 60, marginBottom: 0
      }}>
        {/* Left */}
        <div>
          <h2 className="font-serif" style={{
            fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 28
          }}>
            AI-Powered<br />Product Photos
          </h2>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="email" placeholder="Enter your email address" style={{
              flex: 1, border: "1.5px solid var(--gray-200)", borderRadius: 30,
              padding: "13px 20px", fontFamily: "inherit", fontSize: 14,
              color: "var(--black)", background: "#fff", outline: "none",
              maxWidth: 320, transition: "border-color 0.2s"
            }} onFocus={e => e.target.style.borderColor = "var(--black)"}
              onBlur={e => e.target.style.borderColor = "var(--gray-200)"} />
            <button style={{
              background: "var(--black)", color: "#fff", border: "none", borderRadius: 30,
              padding: "13px 22px", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s"
            }}>Get Started</button>
          </div>
          <p style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 8, maxWidth: 320 }}>
            Transforming Products into Stunning,<br />Market-Ready Images Instantly.
          </p>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 60 }}>
          {[
            { title: "Product", links: ["AI Photography Tool", "Virtual Try-on", "Pricing"] },
            { title: "Company", links: ["About Us", "Careers", "Press"] },
            { title: "Support", links: ["Help Center", "API Documentation", "Contact Us"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--black)", marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => (
                <Link key={l} href="#" style={{
                  display: "block", fontSize: 13, color: "var(--gray-400)",
                  textDecoration: "none", marginBottom: 10, transition: "color 0.2s"
                }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--black)"}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--gray-400)"}
                >{l}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "28px 0 32px", borderTop: "1px solid var(--gray-100)",
        position: "relative", zIndex: 1, marginTop: 56
      }}>
        <span style={{ fontSize: 12, color: "var(--gray-400)" }}>© 2026 SNAPMIND. All rights reserved.</span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Term & Condition", "Privacy Policy"].map(l => (
            <Link key={l} href="#" style={{ fontSize: 12, color: "var(--gray-400)", textDecoration: "none" }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
