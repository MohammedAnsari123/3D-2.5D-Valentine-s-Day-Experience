
import { useEffect, useRef } from "react";

export default function ParticleField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let particles = [];
        const mouse = { x: null, y: null, radius: 100 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.size = Math.random() * 2 + 1;
                this.color = "rgba(255, 255, 255, 0.8)";
                this.vx = 0;
                this.vy = 0;
                this.friction = 0.9;
                this.ease = 0.1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Connect lines if close
                if (mouse.x) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(236, 72, 153, ${1 - distance / 100})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            update() {
                // Mouse direction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * 5; // Repulsion strength
                const directionY = forceDirectionY * force * 5;

                if (distance < mouse.radius) {
                    this.vx -= directionX;
                    this.vy -= directionY;
                } else {
                    // Return to origin
                    if (this.x !== this.originX) {
                        const dx = this.x - this.originX;
                        this.vx -= dx * this.ease;
                    }
                    if (this.y !== this.originY) {
                        const dy = this.y - this.originY;
                        this.vy -= dy * this.ease;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;
                this.vx *= this.friction;
                this.vy *= this.friction;
            }
        }

        const initParticles = () => {
            particles = [];
            const density = 40; // Pixel spacing
            for (let y = 0; y < canvas.height; y += density) {
                for (let x = 0; x < canvas.width; x += density) {
                    particles.push(new Particle(x, y));
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="w-full h-full relative bg-gray-950">
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <h1 className="text-[8rem] md:text-[12rem] font-bold text-white/5 select-none tracking-tighter leading-none">
                    I ❤️ U
                </h1>
                <p className="text-sky-300/30 text-lg md:text-2xl tracking-[1em] uppercase mt-[-2rem] md:mt-[-4rem]">
                    Every Part of Me Loves You
                </p>
            </div>
        </div>
    );
}
