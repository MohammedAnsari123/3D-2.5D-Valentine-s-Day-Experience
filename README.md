# 💖 3D/2.5D Valentine's Day Experience

A premium, interactive web experience built with **React**, **Vite**, **Framer Motion**, and **TailwindCSS**. This project features high-fidelity 2D and 2.5D animations designed to impress.

## Features

### 1. Floating Hearts (Parallax)
-   **Visuals**: Floating hearts with varying depths, blur effects, and speeds to create a 2.5D parallax effect.
-   **Tech**: Framer Motion `AnimatePresence` + CSS Filters.

### 2. Heart Galaxy (3D CSS)
-   **Visuals**: A volumetric, rotating solar system of hearts and planets.
-   **Tech**: advanced CSS 3D transforms (`preserve-3d`, `perspective`) and mouse-driven parallax tilt.

### 3. Love Explosion (Physics)
-   **Visuals**: High-performance particle physics simulation. Click to trigger a burst of gravity-affected particles.
-   **Tech**: HTML5 Canvas API for rendering hundreds of particles at 60fps.

### 4. Particle Field (Interactive)
-   **Visuals**: A responsive grid of particles that reacts to mouse movement with repulsion and attraction forces.
-   **Tech**: HTML5 Canvas API with custom physics logic.

## Tech Stack

-   **Frontend**: React 19 + Vite 6
-   **Styling**: TailwindCSS v4
-   **Animation**: Framer Motion 12
-   **Graphics**: Native HTML5 Canvas

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Navigate to `http://localhost:5173`.

## Customization

-   **Text**: Edit the text overlays in `src/tabs/*.jsx` files.
-   **Colors**: Tailwind classes are used throughout. Modify `bg-pink-950`, `text-red-500`, etc.
-   **Physics**: Adjust particle counts and speeds in `LoveExplosion.jsx` and `ParticleField.jsx`.

---

*Made with love ❤️*
