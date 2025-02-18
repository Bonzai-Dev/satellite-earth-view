"use client";
import styles from "./index.module.css";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { Suspense, useState } from "react";
import { Stats, OrbitControls, Environment } from "@react-three/drei";

import environmentTexture from "@/public/assets/img/hiptyc_2020_4k_gal.exr";
import ControlMenu from "@/app/components/Layout/ControlPanel";
import Satellite from "@/app/components/3D/satellite";
import Earth from "@/app/components/3D/earth";

export default function Scene() {
  const [satelliteCoordinates, setSatelliteCoordinates] = useState<Vector3>(
    new Vector3()
  );
  const [satelliteId, setSatelliteId] = useState<string>("25544");

  return (
    <div className={`${styles.scene} relative`}>
      <Canvas camera={{ position: [0, 0, 250] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[500, 500, 500]}
            angle={0.5}
            penumbra={1}
            decay={0}
            intensity={2}
          />
          <Earth />
          <Satellite
            satelliteId={satelliteId}
            onCoordinatesUpdate={setSatelliteCoordinates}
          />
        </Suspense>
        <Environment files={environmentTexture} background />
        <Stats />
        <OrbitControls
          dampingFactor={0.01}
          zoomSpeed={0.5}
          maxDistance={500}
          enablePan
        />
      </Canvas>

      <ControlMenu
        satelliteId={satelliteId}
        setSatelliteId={setSatelliteId}
        satelliteCoordinates={satelliteCoordinates}
      />
    </div>
  );
}
