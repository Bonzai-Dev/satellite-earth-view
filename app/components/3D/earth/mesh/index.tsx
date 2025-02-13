import { TextureLoader, Mesh, Euler } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";

import math from "@/app/utils/math";
import config from "@/app/config";

import earthAlbedoMap from "@/public/assets/img/earth/albedo.jpg";
import earthBumpMap from "@/public/assets/img/earth/bump.jpg";

export default function EarthMesh() {
  const earthRef = useRef<Mesh>(null!);
  const albedoMap = useLoader(TextureLoader, earthAlbedoMap.src);
  const bumpMap = useLoader(TextureLoader, earthBumpMap.src);

  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta * config.earth.rotationSpeed;
  });

  return (
    <mesh ref={earthRef} rotation={new Euler(math.toRadians(config.earth.inclination))}>
      <sphereGeometry
        args={[
          config.earth.geometrySize,
          config.earth.resolution,
          config.earth.resolution,
        ]}
      />
      <meshStandardMaterial map={albedoMap} bumpMap={bumpMap} />
    </mesh>
  );
}
