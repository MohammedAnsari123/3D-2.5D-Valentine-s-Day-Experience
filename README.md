# 💖 True 3D Valentine's Day Experience

A premium, interactive web experience built with **React**, **Three.js**, **React Three Fiber**, and **TailwindCSS**. This project features high-fidelity 3D animations and interactive physics.

## 🌟 Features

### 1. 🎈 3D Floating Hearts
-   **Visuals**: Volumetric 3D hearts floating in a void with cinematic lighting.
-   **Tech**: custom `extrudeGeometry` shapes in a R3F Canvas.

### 2. 🌌 3D Heart Galaxy
-   **Visuals**: A massive particle system (10k+ points) forming a glowing heart nebulae.
-   **Tech**: R3F `Points` with `AdditiveBlending` for high-performance glows.

### 3. 💥 3D Love Explosion
-   **Visuals**: Interactive physics burst! Click to spray 3D hearts across the screen.
-   **Tech**: Dynamic state-driven particle generation in 3D space.

### 4. 🌊 3D Particle Field
-   **Visuals**: An interactive 3D grid of voxels that ripple as you move your mouse.
-   **Tech**: `instancedMesh` for rendering thousands of interactive 3D objects at once.

## 🛠️ Tech Stack

-   **3D Engine**: Three.js
-   **React Bridge**: React Three Fiber (R3F)
-   **Helpers**: React Three Drei
-   **Frontend**: React 19 + Vite 6
-   **Styling**: TailwindCSS v4

## 🚀 Getting Started

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

---

*Made with love (and math) ❤️*
