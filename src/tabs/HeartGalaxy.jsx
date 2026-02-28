import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial, Sparkles } from "@react-three/drei";
import SceneContainer from "../components/SceneContainer";

const HeartGalaxyModel = () => {
    const pointsRef = useRef();

    // Generate points in a heart shape
    const particlesCount = 10000;
    const pos = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            const t = Math.random() * Math.PI * 2;
            // Heart shape formula
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

            // Randomize slightly and add depth
            const r = Math.random() * 2;
            positions[i * 3] = (x + (Math.random() - 0.5) * r) * 0.5;
            positions[i * 3 + 1] = (y + (Math.random() - 0.5) * r) * 0.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.z += delta * 0.1;
            pointsRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group>
            <Points ref={pointsRef} positions={pos} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ff1e56"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
            <Sparkles count={100} scale={20} size={2} speed={0.4} opacity={0.5} color="#ec4899" />
        </group>
    );
};

export default function HeartGalaxy() {
    return (
        <div className="w-full h-full bg-black relative">
            <SceneContainer cameraPos={[0, 0, 15]}>
                <HeartGalaxyModel />
            </SceneContainer>

            <div className="absolute bottom-20 left-0 w-full text-center pointer-events-none z-20">
                <h2 className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 font-serif tracking-widest drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] animate-pulse">
                    YOU ARE MY UNIVERSE
                </h2>
                <p className="text-purple-200/60 mt-4 tracking-[0.5em] text-sm uppercase">Gravity Pulls Me To You</p>
            </div>
        </div>
    );
}
