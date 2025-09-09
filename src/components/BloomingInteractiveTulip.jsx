// src/components/BloomingInteractiveTulip.jsx
import React, { useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Center } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";

function TulipModel({ color, onClick }) {
  const { scene } = useGLTF("/models/8th_march_composition.glb");
  const [hovered, setHovered] = useState(false);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useMemo(() => {
    if (!color) return;
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color = new THREE.Color(color);
      }
    });
  }, [color, clonedScene]);

  return (
    <Center>
      <primitive
        object={clonedScene}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        rotation={[0, Math.PI / 2, 0]} // Tulip rotated on Z axis
        // scale={hovered ? 1.6 : 1.5} // Hover scaling (can tweak)
      />
    </Center>
  );
}

function SparklingParticles() {
  const particlesRef = useRef();
  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 400; i++) {
      positions.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 20
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.material.opacity =
        0.6 + Math.sin(clock.getElapsedTime() * 3) * 0.4;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#fff7c2"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

export default function BloomingInteractiveTulip() {
  const [color, setColor] = useState(null);
  const { scale } = useSpring({
    from: { scale: 0.1 },
    to: { scale: 1 },
    config: { duration: 4000 },
  });

  const handleClick = () => {
  setColor((prev) =>
    prev === null
      ? "#ff7eb9" // pink
      : prev === "#ff7eb9"
      ? "#e172fc" // purple instead of yellow
      : prev === "#e172fc"
      ? "#ff6f61" // red
      : null // reset to original
  );
};

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-black">
      <Canvas
        className="w-full h-full"
        shadows
        // 🔑 Camera defaults (adjust here if too zoomed)
        camera={{
          position: [4,3,8], // pulled back a bit for better fit
          fov: 70, // narrower field of view = less distortion
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.3} castShadow />

        {/* Blooming animation */}
        <a.group scale={scale}>
          <TulipModel color={color} onClick={handleClick} />
        </a.group>

        {/* Sparkling background particles */}
        <SparklingParticles />

        {/* OrbitControls with zoom limits */}
        <OrbitControls
          enablePan={false} // disable panning (optional)
          minDistance={5} // 👈 clamp zoom in
          maxDistance={20} // 👈 clamp zoom out
          maxPolarAngle={Math.PI / 2} // 👈 prevent going below ground
        />

        {/* Atmosphere */}
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
