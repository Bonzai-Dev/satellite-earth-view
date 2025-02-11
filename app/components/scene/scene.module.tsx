"use client";
import styles from "./scene.module.css";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Stats, OrbitControls, Environment } from "@react-three/drei";

function EarthMesh() {
  const earthRef = useRef<THREE.Mesh>(null!);
  const albedoMap = useLoader(
    THREE.TextureLoader,
    "/assets/img/earth/albedo.jpg"
  );

  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={albedoMap} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className={styles.scene}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />

          <EarthMesh />
        </Suspense>

        <Stats />
        <OrbitControls dampingFactor={0.02} zoomSpeed={0.5} enablePan/>
      </Canvas>
    </div>
  );
}
