import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import SceneContainer from "../components/SceneContainer";

const InteractiveGrid = () => {
    const meshRef = useRef();
    const { mouse } = useThree();

    const gridSize = 30;
    const spacing = 0.8;
    const boxesCount = gridSize * gridSize;

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(boxesCount * 3);
        const col = new Float32Array(boxesCount * 3);
        const color = new THREE.Color();

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const idx = i * gridSize + j;
                pos[idx * 3] = (i - gridSize / 2) * spacing;
                pos[idx * 3 + 1] = (j - gridSize / 2) * spacing;
                pos[idx * 3 + 2] = 0;

                color.setHSL(0.9, 0.8, 0.2 + (i / gridSize) * 0.2);
                col[idx * 3] = color.r;
                col[idx * 3 + 1] = color.g;
                col[idx * 3 + 2] = color.b;
            }
        }
        return [pos, col];
    }, []);

    const tempObject = new THREE.Object3D();

    useFrame((state) => {
        for (let i = 0; i < boxesCount; i++) {
            const ix = i * 3;
            const x = positions[ix];
            const y = positions[ix + 1];

            // Distance to mouse
            const dx = (mouse.x * 15) - x;
            const dy = (mouse.y * 15) - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const z = Math.max(0, (5 - dist) * 2);

            tempObject.position.set(x, y, z);
            tempObject.scale.setScalar(0.5 + z * 0.1);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, boxesCount]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
        </instancedMesh>
    );
};

export default function ParticleField() {
    return (
        <div className="w-full h-full bg-black relative">
            <SceneContainer cameraPos={[0, 0, 20]} showStars={false}>
                <InteractiveGrid />
            </SceneContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <h1 className="text-[8rem] md:text-[12rem] font-bold text-white/5 select-none tracking-tighter leading-none uppercase italic">
                    I ❤️ U
                </h1>
                <p className="text-pink-300/30 text-lg md:text-2xl tracking-[1em] uppercase mt-[-2rem] md:mt-[-4rem]">
                    Every Dimension Of My Love
                </p>
            </div>
        </div>
    );
}
