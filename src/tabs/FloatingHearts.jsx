import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import SceneContainer from "../components/SceneContainer";

// Simple 3D Heart Geometry using Shape
const HeartShape = ({ position, color, scale, speed }) => {
    const meshRef = useRef();
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(0, 0);
        s.bezierCurveTo(0, -3, -5, -3, -5, 0);
        s.bezierCurveTo(-5, 3, 0, 6, 0, 10);
        s.bezierCurveTo(0, 6, 5, 3, 5, 0);
        s.bezierCurveTo(5, -3, 0, -3, 0, 0);
        return s;
    }, []);

    const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.position.y += speed * delta;
            if (meshRef.current.position.y > 15) meshRef.current.position.y = -15;
            meshRef.current.rotation.y += delta;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale} rotation={[Math.PI, 0, 0]}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
        </mesh>
    );
};

export default function FloatingHearts() {
    const heartCount = 40;
    const hearts = useMemo(() => {
        return Array.from({ length: heartCount }).map((_, i) => ({
            id: i,
            position: [
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20
            ],
            color: `hsl(${Math.random() * 20 + 340}, 80%, 60%)`,
            scale: 0.1 + Math.random() * 0.2,
            speed: 1 + Math.random() * 2
        }));
    }, []);

    return (
        <div className="w-full h-full bg-black relative">
            <SceneContainer cameraPos={[0, 0, 20]}>
                {hearts.map(h => (
                    <HeartShape key={h.id} {...h} />
                ))}
            </SceneContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
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
