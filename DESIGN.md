# UI/UX Pro Max Guidelines for Ekspora Redesign

You are executing a top-tier B2B website redesign for "Ekspora" (a premium Indonesian export and agricultural commodity company). You must utilize your UI/UX Pro Max skills and fetch necessary high-end components via MCP 21st.dev and Context7. 

The aesthetic must scream: Professional, Global SaaS-like, High-Trust, and Premium.

## 1. Hero Section Architecture (Critical Instructions)

### A. Background Layer (Dynamic Ambient Video)
- **Task for AI:** Use MCP 21st.dev / Context7 to source, build, or integrate a **Full-Screen Ambient Video Background component**.
- **Video Content Parameters:** The video must be high-resolution (4K aesthetic) and played in **slow-motion**. It MUST connect to Ekspora's core business (e.g., cinematic macro shots of premium coffee beans, spices, essential oil extraction, or elegant modern maritime logistics/ocean freight).
- **Treatment:** The video must NOT distract the user. Apply a heavy dark overlay or mesh gradient overlay (e.g., `bg-black/75` or a radial dark gradient fading into deep `#0A0A0A`).

### B. Glassmorphism & Layout (Foreground)
- The main content (Headline, Sub-headline, and CTA buttons) must float inside a premium glassmorphic container or layout.
- **Glassmorphism Specs:** Use Tailwind classes like `backdrop-blur-xl`, `bg-white/5` (very subtle), `border border-white/10`, and soft glowing drop shadows `shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]`.
- **Layout:** Asymmetrical or perfectly centered professional alignment. Use generous whitespace (padding/margins) so the UI breathes.

### C. Proper Animations (Framer Motion)
- **Entrance:** Do not just render elements instantly. Use Framer Motion for a `staggered fade-up` effect for the Headline, Subtext, and Buttons. 
- **Physics:** Use spring animations (e.g., `stiffness: 100, damping: 20`) so it feels organic and premium, not rigid.
- **Micro-interactions:** CTA buttons must have magnetic hover effects or a subtle `scale: 1.05` on hover, accompanied by a soft background glow transition.

### D. Deep Gradients & Color Palette
- **Base Theme:** Dark Mode (Obsidian / Deep Charcoal `#050505`).
- **Gradients:** Implement subtle, animated mesh gradients or glowing orbs (using `text-emerald-400` or `text-amber-500` tones) that react to mouse movement in the background or within text highlights (`bg-clip-text text-transparent`).

## 2. General Output Rules
- Ensure 100% English copywriting with a professional, B2B corporate tone.
- Code output must be clean, modular Next.js (App Router) + Tailwind CSS + Framer Motion.
- DO NOT output standard, flat designs. Every card, navbar, and section must reflect the Glassmorphism and animated depth described above.