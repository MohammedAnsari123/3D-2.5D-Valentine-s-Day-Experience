import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Stars } from "@react-three/drei";
import { Suspense } from "react";

const SceneContainer = ({ children, cameraPos = [0, 0, 5], showStars = true }) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <PerspectiveCamera makeDefault position={cameraPos} fov={75} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Environment preset="sunset" />
        {showStars && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
        
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
      <div className="absolute inset-x-0 bottom-4 text-center text-white/20 text-xs pointer-events-none uppercase tracking-[0.5em]">
        Move to rotate
      </div>
    </div>
  );
};

export default SceneContainer;
