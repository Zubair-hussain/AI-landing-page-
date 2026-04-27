"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.2 }
    );

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} style={{
      position: "sticky", top: 0, zIndex: 200,
      background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.88)",
      backdropFilter: "blur(20px)",
      padding: "12px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      transition: "all 0.3s"
    }}>
      <Link href="#" style={{
        fontWeight: 700, fontSize: 15, letterSpacing: "0.12em",
        textTransform: "uppercase", color: "var(--black)", textDecoration: "none"
      }}>
        Snapmind
      </Link>

      <ul style={{
        display: "flex", alignItems: "center", gap: 4,
        background: "var(--gray-100)", borderRadius: 40, padding: 5, listStyle: "none"
      }}>
        {["Home", "Features", "Videos", "Pricing"].map((item, i) => (
          <li key={item}>
            <Link href={i === 0 ? "#" : i === 1 ? "#features" : i === 2 ? "#steps" : "#footer"}
              className={`nav-pill${i === 0 ? " active" : ""}`}
              style={{
                padding: "7px 17px", borderRadius: 30, fontSize: 13.5, fontWeight: 500,
                color: i === 0 ? "#fff" : "var(--gray-600)",
                background: i === 0 ? "var(--black)" : "transparent",
                textDecoration: "none", display: "flex", alignItems: "center", gap: 5,
                transition: "all 0.2s"
              }}
            >
              {item === "Videos" && (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  background: "#fff", border: "1.5px solid var(--gray-200)",
                  color: "var(--black)", padding: "7px 17px", borderRadius: 30,
                  margin: "-7px -17px"
                }}>
                  Videos
                  <span style={{ width: 7, height: 7, background: "#b8e04a", borderRadius: "50%", display: "inline-block" }} />
                </span>
              )}
              {item !== "Videos" && item}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="#" style={{
        background: "var(--black)", color: "#fff", border: "none", borderRadius: 30,
        padding: "11px 22px", fontSize: 13.5, fontWeight: 600, cursor: "pointer",
        textDecoration: "none", display: "inline-block", transition: "all 0.2s"
      }}>
        Get Started
      </Link>
    </nav>
  );
}
