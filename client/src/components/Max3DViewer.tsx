import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Group } from 'three';
import { Sparkles } from "lucide-react";
import modelPath from "@assets/poset_1759781344032.glb";

interface Max3DModelProps {
  isThinking?: boolean;
  isSpeaking?: boolean;
}

function Max3DModel({ isThinking = false, isSpeaking = false }: Max3DModelProps) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(modelPath);
  
  useFrame((state) => {
    if (!group.current) return;
    
    if (isSpeaking) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.1;
      group.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.05);
    } else {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={2.5} />
    </group>
  );
}

interface Max3DViewerProps {
  isThinking?: boolean;
  isSpeaking?: boolean;
}

export default function Max3DViewer({ isThinking = false, isSpeaking = false }: Max3DViewerProps) {
  return (
    <div className="relative h-full w-full bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,185,11,0.15)_0%,rgba(252,213,53,0.08)_25%,transparent_70%)]" />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(240,185,11,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(240,185,11,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg shadow-red-500/50" data-testid="badge-live">
          <div className="h-2.5 w-2.5 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" />
          <span className="text-white text-sm font-bold uppercase tracking-wider">LIVE</span>
        </div>
      </div>

      {isThinking && (
        <div className="absolute top-6 right-6 z-10 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/40 shadow-lg shadow-primary/20" data-testid="status-thinking">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-primary text-sm font-semibold">Pensando...</span>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full h-full" data-testid="model-max">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#F0B90B" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FCD535" />
          <spotLight 
            position={[0, 5, 0]} 
            intensity={isSpeaking ? 2 : 1} 
            color="#F0B90B"
            angle={0.6}
            penumbra={1}
          />
          <Suspense fallback={null}>
            <Max3DModel isThinking={isThinking} isSpeaking={isSpeaking} />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {isSpeaking && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-12 z-20" data-testid="audio-waves">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-gradient-to-t from-primary to-primary/60 rounded-full shadow-lg shadow-primary/50"
              style={{
                height: '40%',
                animation: `audioWave ${0.4 + (i * 0.05)}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes audioWave {
          0% { height: 20%; }
          50% { height: 100%; }
          100% { height: 30%; }
        }
      `}</style>
    </div>
  );
}
