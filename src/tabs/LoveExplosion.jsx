
import { useEffect, useRef } from "react";

export default function LoveExplosion() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let particles = [];
        const colors = ["#ef4444", "#ec4899", "#f472b6", "#fda4af", "#ffffff"];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.angle = Math.random() * Math.PI * 2;
                this.velocity = Math.random() * 10 + 2;
                this.size = Math.random() * 5 + 2;
                this.life = 100;
                this.decay = Math.random() * 1 + 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.gravity = 0.2;
            }

            update() {
                this.x += Math.cos(this.angle) * this.velocity;
                this.y += Math.sin(this.angle) * this.velocity + this.gravity; // Gravity adds to Y
                this.velocity *= 0.95; // Friction
                this.life -= this.decay;
                this.size *= 0.98; // Shrink
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.life / 100;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        const animate = () => {
            // Trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();
                if (p.life <= 0 || p.size <= 0.1) {
                    particles.splice(index, 1);
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Explosion burst
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(x, y));
            }
        };

        canvas.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="w-full h-full relative bg-gray-900 overflow-hidden cursor-crosshair">
            <canvas ref={canvasRef} className="absolute inset-0 z-10" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="text-center pointer-events-none select-none">
                    <h1 className="text-5xl md:text-7xl font-bold text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] tracking-tight">
                        MY HEART BURSTS
                    </h1>
                    <p className="text-pink-200 text-xl tracking-[0.3em] uppercase">For You, Every Moment</p>
                    <p className="text-white/30 text-xs mt-8 animate-pulse">Touch to feel the love</p>
                </div>
            </div>
        </div>
    );
}
