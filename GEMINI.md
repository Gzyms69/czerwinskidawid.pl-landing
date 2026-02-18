# Gemini Project Context: Dawid Czerwiński Landing Page

## 1. Project Overview
**Name:** czerwinskidawid-pl
**URL:** czerwinskidawid.pl
**Type:** Modern Professional Developer Portfolio
**Core Concept:** High-end, dark-themed Bento-grid interface with neon accents, focusing on clean engineering and operational discipline.
**Primary Tech Stack:** React 18, Vite 7, Tailwind CSS, Framer Motion, Radix UI (via Shadcn).

## 2. Architecture & Structure

### Directory Map
- **`/client`**: The entire application core.
    - **`/components`**:
        - **`/ui`**: Shadcn/Radix primitives (Buttons, Dialogs, etc.).
        - **`BentoCard.tsx`**: The main structural unit for the grid layout. Supports `isTerminal` and `glowColor` props.
        - **`TechStackMarquee.tsx`**: High-performance infinite loop implementation.
        - **`TypewriterEffect.tsx`**: Custom mono-spaced text animation for roles.
    - **`/pages`**: Route components.
        - `Index.tsx`: Main landing page with the Bento grid.
        - `Portfolio.tsx` / `Katalog.tsx`: Detailed views.
    - **`/lib`**: Utility functions (`utils.ts`).
- **`public/`**: Static assets. Contains `favicon.svg` (custom developer icon) and `robots.txt`.
- **`dist/`**: Target directory for production builds.

### Key Workflows
- **Development**: `./dev.sh start` (Wraps `vite` with background execution and logging).
- **Build**: `npm run build` (Generates pure static SPA in `dist/`).
- **Vercel Config**: `vercel.json` handles SPA routing by rewriting all paths to `index.html`.

## 3. Design Standards (CRITICAL)

### A. Aesthetics & Branding
- **Color Palette**: 
    - Background: Absolute Black (`#000000`).
    - Primary Accent: Emerald/Neon Green (`#10b981`).
    - Secondary Accent: Blue/Cyan for Catalog.
    - Grays: Zinc scale for borders and secondary text.
- **Visual Effects**:
    - **Grid Background**: CSS-based grid pattern with vignette overlay.
    - **Neon Shimmer**: Glow effects on borders and text using `drop-shadow` and custom neon classes.
    - **Edge Fading**: Linear gradients on overflow containers to prevent "hard cuts" of moving elements.

### B. Typography
- **Headings**: Bold, high tracking-tight.
- **Roles/Code**: Monospace font for "Junior Software Engineer" and Terminal-style content.
- **Content**: Zinc-400 for readability against black background.

## 4. Technical Implementation Standards

### A. The "Twin Loop" Marquee Pattern
**File:** `client/components/TechStackMarquee.tsx`
To achieve a perfectly fluid, infinite loop without sub-pixel "jumping":
1. Use **two identical containers** (`MarqueeGroup`) rendered side-by-side in a flex row.
2. Animate both from `x: 0` to `x: "-100%"`.
3. The reset happens instantly when the first container leaves the view, and since the second is identical and at position 0, the jump is mathematically and visually invisible.
4. **Never** use arbitrary pixel values for resets; always use percentages relative to the container.

### B. Interactive Stability
- **Internal Links**: Always use `Link` from `react-router-dom`. Never use `<a>` for internal routes to avoid full page reloads and state loss.
- **Hover Transitions**: Use Framer Motion `whileHover` for scale and glow. Ensure `pointer-events-none` on decorative overlays to prevent stealing focus from buttons.

## 5. Deployment & Environment
- **Platform**: Vercel (Production).
- **Vite Config**: `fs.allow: ["."]` is mandatory because `index.html` is in the root, while assets are in `/client`.
- **Cleanup**: The project has been stripped of all Builder.io, Netlify, and Express server artifacts. It is now a pure frontend application.

## 6. Senior Engineering Lessons Learned
- **Reference Errors**: Always verify imports when refactoring components from raw HTML to React Router components. A missing `Link` import will crash the entire render tree (Black Screen).
- **Vite Security**: Vite blocks access to files outside the specified root. When moving files or changing the entry point, update `server.fs.allow` accordingly.
- **No Hacks Policy**: Professional infinite animations require duplicated DOM nodes and percentage shifts. Proportional shifts (like -33% for 3 sets) or "Twin Loops" (-100% for 2 sets) are the only stable solutions.
