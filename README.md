# Snapmind

**Create Studio-Quality Product Photos with AI**

A stunning, production-ready Next.js 14 landing page for an AI-powered product photography SaaS. Featuring smooth GSAP scroll animations, a mesmerizing Three.js particle background, interactive before/after slider, and a custom cursor.

![Snapmind Hero](https://picsum.photos/id/399/900/400)

## ✨ Features

- **Next.js 14** with App Router and TypeScript
- **GSAP 3** + ScrollTrigger for buttery-smooth animations
- **Three.js** WebGL particle field with mouse parallax (1,800+ particles)
- **Interactive Before/After Slider** – drag to compare raw vs AI-enhanced images
- **Custom Cursor** with lag effect and hover scaling
- **Fully Responsive** design with Tailwind CSS
- **Dark UI** with grain overlay and modern aesthetics
- **Optimized Performance** – dynamic imports, no SSR overhead for heavy components

### Highlighted Animations
- Navbar slide-in entrance
- Staggered hero element reveals
- Scroll-triggered section animations
- Mouse parallax on hero and particles
- Tab switching with image crossfade
- Infinite stats marquee

## 🚀 Tech Stack

| Technology       | Version      | Purpose                          |
|------------------|--------------|----------------------------------|
| Next.js          | 14.2+        | App Router, SSR, Routing        |
| TypeScript       | 5.x          | Type safety                     |
| Tailwind CSS     | 3.x          | Styling                         |
| GSAP             | 3.12+        | Scroll & entrance animations    |
| Three.js         | r163         | WebGL particle background       |
| React            | 18.3+        | UI Framework                    |

## 📁 Project Structure

```bash
snapmind/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── globals.css         # CSS variables, keyframes, grain
│   ├── page.tsx            # Main page composition
│   └── components/
│       ├── CustomCursor.tsx
│       ├── ThreeBackground.tsx
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── BeforeAfter.tsx
│       ├── Features.tsx
│       ├── Steps.tsx
│       ├── Results.tsx
│       └── Footer.tsx
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```


🛠️ Installation & Setup

Clone or Extract the project:

Bashtar -xzf snapmind-nextjs.tar.gz
cd snapmind

Install dependencies:

Bashnpm install

Run development server:

Bashnpm run dev
Open http://localhost:3000 to view it in the browser.
Production Build
Bashnpm run build
npm start
📸 Screenshots
<img src="https://picsum.photos/id/433/900/300" alt="Features Section">
Features section with GSAP tab switching
<img src="https://picsum.photos/id/157/900/300" alt="Three.js Background">
Three.js particle field with mouse interaction
<img src="https://picsum.photos/id/674/900/300" alt="Before/After Slider">
Interactive before/after comparison
🏷️ Tags
nextjs react typescript tailwindcss gsap three-js webgl particles parallax saas ai-photography landing-page product-photography scroll-animation custom-cursor
📜 License
This project is licensed under the MIT License.
👨‍💻 Author
Built by Zubair Hussain — Full Stack Developer & Freelancer
