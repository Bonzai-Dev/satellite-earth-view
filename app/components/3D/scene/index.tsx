"use client";
import styles from "./index.module.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  Stats,
  OrbitControls,
  Environment,
} from "@react-three/drei";

import Earth from "@/app/components/3D/earth";
import environmentTexture from "@/public/assets/img/hiptyc_2020_4k_gal.exr";
import Satellite from "../satellite";

export default function Scene() {
  return (
    <div className={styles.scene}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          {/* <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={2}
          /> */}

          <Earth />
          <Satellite />
        </Suspense>

        <Environment files={environmentTexture} background />
        <Stats />

        <OrbitControls
          dampingFactor={0.01}
          zoomSpeed={0.5}
          minDistance={2.1}
          maxDistance={100}
          enablePan
        />
      </Canvas>
    </div>
  );
}
