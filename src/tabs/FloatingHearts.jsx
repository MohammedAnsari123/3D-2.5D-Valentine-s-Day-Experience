
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Heart = ({ id, x, scale, duration, delay, blur }) => {
    return (
        <motion.div
            initial={{ y: "110vh", opacity: 0 }}
            animate={{
                y: "-10vh",
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "linear",
            }}
            className="absolute text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] will-change-transform"
            style={{
                left: `${x}%`,
                fontSize: `${scale * 3}rem`, // Larger hearts
                filter: `blur(${blur}px)`, // Depth effect
                zIndex: Math.floor(scale * 10), // Larger hearts in front
            }}
        >
            ❤️
        </motion.div>
    );
};

export default function FloatingHearts() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const count = 30;
        const newHearts = Array.from({ length: count }).map((_, i) => {
            const scale = 0.5 + Math.random() * 1.5; // 0.5 to 2.0
            return {
                id: i,
                x: Math.random() * 100,
                scale: scale,
                duration: 8 + Math.random() * 10, // Slower, more majestic
                delay: Math.random() * 15,
                blur: (2 - scale) * 2, // Smaller hearts are blurrier (farther)
            };
        });
        setHearts(newHearts);
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-black via-pink-950/20 to-black">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent opacity-50"></div>

            {hearts.map((h) => (
                <Heart key={h.id} {...h} />
            ))}

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50">
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-200 to-pink-500 tracking-tighter drop-shadow-2xl text-center">
                    MY LOVE FOR YOU
                </h1>
                <h2 className="text-xl md:text-3xl font-light text-pink-100/80 tracking-[0.5em] mt-4 uppercase text-center">
                    Floats Forever
                </h2>
            </div>
        </div>
    );
}
