import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { FBXLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
import { Sparkles } from "lucide-react";

type AnimationState = 'idle' | 'talking' | 'thinking' | 'angry' | 'celebrating';

interface Max3DViewerProps {
  isThinking?: boolean;
  isSpeaking?: boolean;
}

export default function Max3DViewer({ isThinking = false, isSpeaking = false }: Max3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationsRef = useRef<Record<AnimationState, THREE.AnimationClip | null>>({
    idle: null,
    talking: null,
    thinking: null,
    angry: null,
    celebrating: null
  });
  const [currentState, setCurrentState] = useState<AnimationState>('idle');
  const [isLoading, setIsLoading] = useState(true);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xF0B90B, 0.5);
    pointLight1.position.set(-3, 2, -3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xFCD535, 0.5);
    pointLight2.position.set(0, 3, 3);
    scene.add(pointLight2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 1.5;
    controlsRef.current = controls;

    const gltfLoader = new GLTFLoader();
    const fbxLoader = new FBXLoader();

    gltfLoader.load(
      '/max.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -1, 0);
        model.scale.set(2, 2, 2);
        
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).castShadow = true;
            (child as THREE.Mesh).receiveShadow = true;
          }
        });

        scene.add(model);
        modelRef.current = model;

        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        Promise.all([
          new Promise<void>((resolve) => {
            fbxLoader.load('/idle.fbx', (fbx) => {
              if (fbx.animations && fbx.animations.length > 0) {
                animationsRef.current.idle = fbx.animations[0];
              }
              resolve();
            }, undefined, () => resolve());
          }),
          new Promise<void>((resolve) => {
            fbxLoader.load('/talking.fbx', (fbx) => {
              if (fbx.animations && fbx.animations.length > 0) {
                animationsRef.current.talking = fbx.animations[0];
              }
              resolve();
            }, undefined, () => resolve());
          }),
          new Promise<void>((resolve) => {
            fbxLoader.load('/thinking.fbx', (fbx) => {
              if (fbx.animations && fbx.animations.length > 0) {
                animationsRef.current.thinking = fbx.animations[0];
              }
              resolve();
            }, undefined, () => resolve());
          }),
          new Promise<void>((resolve) => {
            fbxLoader.load('/angry.fbx', (fbx) => {
              if (fbx.animations && fbx.animations.length > 0) {
                animationsRef.current.angry = fbx.animations[0];
              }
              resolve();
            }, undefined, () => resolve());
          }),
          new Promise<void>((resolve) => {
            fbxLoader.load('/celebrating.fbx', (fbx) => {
              if (fbx.animations && fbx.animations.length > 0) {
                animationsRef.current.celebrating = fbx.animations[0];
              }
              resolve();
            }, undefined, () => resolve());
          })
        ]).then(() => {
          setIsLoading(false);
          if (animationsRef.current.idle && mixer) {
            const action = mixer.clipAction(animationsRef.current.idle);
            action.play();
          }
        });
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        setIsLoading(false);
      }
    );

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      if (modelRef.current && !isSpeaking && !isThinking) {
        modelRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.1;
      }

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  useEffect(() => {
    let newState: AnimationState = 'idle';
    
    if (isSpeaking) {
      newState = 'talking';
    } else if (isThinking) {
      newState = 'thinking';
    }
    
    if (newState !== currentState) {
      setCurrentState(newState);
      
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        
        const animation = animationsRef.current[newState];
        if (animation) {
          const action = mixerRef.current.clipAction(animation);
          action.reset();
          action.play();
        }
      }
    }
  }, [isSpeaking, isThinking, currentState]);

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

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-primary text-lg font-semibold animate-pulse">
            Cargando modelo 3D...
          </div>
        </div>
      )}

      <div ref={containerRef} className="relative z-10 w-full h-full" data-testid="model-max" />

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
