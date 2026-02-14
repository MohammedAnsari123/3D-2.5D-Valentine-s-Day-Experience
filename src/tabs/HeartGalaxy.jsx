
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function HeartGalaxy() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
        stiffness: 150,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
        stiffness: 150,
        damping: 20,
    });

    const handleMouseMove = (e) => {
        const { width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX / width - 0.5;
        const y = e.clientY / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="w-full h-full relative flex items-center justify-center overflow-hidden bg-black perspective-[1000px] cursor-move"
        >
            {/* Dynamic Starfield Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a0b2e_0%,_#000000_100%)]"></div>
            {Array.from({ length: 100 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white animate-pulse"
                    style={{
                        width: Math.random() * 2 + 'px',
                        height: Math.random() * 2 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        opacity: Math.random() * 0.7 + 0.3,
                        animationDuration: Math.random() * 3 + 2 + 's',
                    }}
                />
            ))}

            {/* 3D Galaxy Container */}
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-[600px] h-[600px] preserve-3d"
            >
                {/* Volumetric Central Heart */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 preserve-3d">
                    {[0, 10, 20, -10, -20].map((z, i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 flex items-center justify-center text-9xl text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]"
                            style={{ translateZ: z }}
                            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                        >
                            ❤️
                        </motion.div>
                    ))}
                </div>

                {/* Complex Orbits */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/10 preserve-3d"
                        style={{
                            width: `${(i + 2) * 120}px`,
                            height: `${(i + 2) * 120}px`,
                            transform: `translate(-50%, -50%) rotateX(${55 + i * 8}deg) rotateY(${i * 30}deg)`,
                        }}
                    >
                        {/* Orbiting Planet */}
                        <div
                            className="absolute top-0 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-[0_0_20px_#ec4899] animate-[orbit_linear_infinite]"
                            style={{
                                animationDuration: `${8 + i * 3}s`,
                                animationDirection: i % 2 === 0 ? "normal" : "reverse"
                            }}
                        >
                            <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-600 rounded-full"></div>
                        </div>
                    </div>
                ))}

            </motion.div>

            {/* Text Overlay */}
            <div className="absolute bottom-20 left-0 w-full text-center pointer-events-none z-20">
                <h2 className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 font-serif tracking-widest drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] animate-pulse">
                    YOU ARE MY UNIVERSE
                </h2>
                <p className="text-purple-200/60 mt-4 tracking-[0.5em] text-sm uppercase">Gravity Pulls Me To You</p>
            </div>

            <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
        .perspective-[1000px] { perspective: 1000px; }
        @keyframes orbit {
            0% { transform: rotate(0deg) translateX(0) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(0) rotate(-360deg); }
        }
      `}</style>
        </div>
    );
}
