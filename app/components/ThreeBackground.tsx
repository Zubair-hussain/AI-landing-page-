"use client";
import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let Three: typeof import("three");
    let renderer: import("three").WebGLRenderer;
    let animId: number;

    async function init() {
      Three = await import("three");
      const { Scene, PerspectiveCamera, WebGLRenderer, BufferGeometry, BufferAttribute, Points, PointsMaterial, AdditiveBlending, Color } = Three;

      const el = mountRef.current;
      if (!el) return;

      const scene = new Scene();
      scene.background = null;

      const camera = new PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      // Create particle field
      const count = 1800;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const palette = [
        new Color("#b8e04a"),
        new Color("#70f0b0"),
        new Color("#aaccff"),
        new Color("#e8aaf0"),
        new Color("#d4c84a"),
      ];

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3]     = (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 20;
        positions[i3 + 2] = (Math.random() - 0.5) * 10 - 2;
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i3]     = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;
        sizes[i] = Math.random() * 3 + 1;
      }

      const geo = new BufferGeometry();
      geo.setAttribute("position", new BufferAttribute(positions, 3));
      geo.setAttribute("color", new BufferAttribute(colors, 3));
      geo.setAttribute("size", new BufferAttribute(sizes, 1));

      const mat = new PointsMaterial({
        size: 0.05,
        vertexColors: true,
        blending: AdditiveBlending,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      });

      const points = new Points(geo, mat);
      scene.add(points);

      // Mouse parallax
      let mouseX = 0, mouseY = 0;
      const onMouse = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse);

      // Resize
      const onResize = () => {
        if (!el) return;
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(el.clientWidth, el.clientHeight);
      };
      window.addEventListener("resize", onResize);

      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.001;

        // Gentle rotation + mouse parallax
        points.rotation.y = t * 0.08 + mouseX * 0.1;
        points.rotation.x = mouseY * 0.05;

        // Wave the particles
        const pos = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          pos[i3 + 1] += Math.sin(t * 0.5 + pos[i3] * 0.3) * 0.0008;
        }
        geo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    }

    const cleanup = init();
    return () => {
      cleanup.then(fn => fn?.());
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none"
    }} />
  );
}
