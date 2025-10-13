"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import type { Mesh } from "three";

function SpinningKnot() {
  const ref = React.useRef<Mesh | null>(null);
  React.useEffect(() => {
    let raf = 0 as number;
    const tick = () => {
      if (ref.current) {
        ref.current.rotation.x += 0.003;
        ref.current.rotation.y += 0.004;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <mesh ref={ref} castShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 150, 32]} />
      <meshStandardMaterial color="#22D3EE" metalness={0.3} roughness={0.2} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1} castShadow />
      <PresentationControls snap global>
        <SpinningKnot />
      </PresentationControls>
    </Canvas>
  );
}
