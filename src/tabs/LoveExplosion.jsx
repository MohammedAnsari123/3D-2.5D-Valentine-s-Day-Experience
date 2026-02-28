import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Instance, Instances, Float } from "@react-three/drei";
import SceneContainer from "../components/SceneContainer";

const BurstParticles = ({ count = 100, origin = [0, 0, 0] }) => {
    const particles = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            ).normalize().multiplyScalar(Math.random() * 0.5 + 0.2),
            rotationSpeed: new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.1),
            scale: Math.random() * 0.2 + 0.1
        }));
    }, [count]);

    const instancesRef = useRef();

    useFrame((state, delta) => {
        if (instancesRef.current) {
            // This is a bit complex for a simple Instance component without a single loop
            // But within R3F Instance, we usually animate via props or refs if using manually.
            // Simplified: we'll animate the group instead or use a simpler individual component approach.
        }
    });

    return (
        <group>
            {particles.map((p, i) => (
                <IndividualHeart key={i} {...p} origin={origin} />
            ))}
        </group>
    );
};

const IndividualHeart = ({ velocity, rotationSpeed, scale, origin }) => {
    const meshRef = useRef();
    const [pos] = useState(() => new THREE.Vector3(...origin));
    const [rot] = useState(() => new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0));

    useFrame((state, delta) => {
        if (meshRef.current) {
            pos.add(velocity);
            meshRef.current.position.copy(pos);
            meshRef.current.rotation.x += rotationSpeed.x;
            meshRef.current.rotation.y += rotationSpeed.y;

            // Recycle
            if (pos.length() > 20) {
                pos.set(...origin);
            }
        }
    });

    return (
        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
            <mesh ref={meshRef} scale={scale}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
            </mesh>
        </Float>
    );
};

export default function LoveExplosion() {
    const [bursts, setBursts] = useState([]);

    const handlePointerDown = (e) => {
        // Add a new burst at origin for now, or world space if we calculate
        setBursts(prev => [...prev.slice(-4), Date.now()]);
    };

    return (
        <div className="w-full h-full bg-black relative cursor-pointer" onPointerDown={handlePointerDown}>
            <SceneContainer cameraPos={[0, 0, 15]}>
                {bursts.map(id => (
                    <BurstParticles key={id} count={30} />
                ))}
                <BurstParticles count={50} /> {/* Steady burst */}
            </SceneContainer>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
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
