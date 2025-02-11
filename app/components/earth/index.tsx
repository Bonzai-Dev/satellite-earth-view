import { TextureLoader, Mesh, Euler } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";

import math from "@/app/utils/math";
import config from "@/app/config";

export default function EarthMesh() {
  const earthRef = useRef<Mesh>(null!);
  const albedoMap = useLoader(TextureLoader, config.files.images.earth.albedo);

  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta * config.earth.rotationSpeed;
  });

  return (
    <mesh ref={earthRef} rotation={new Euler(math.toRadians(23.5))}>
      <sphereGeometry
        args={[
          config.earth.geometrySize,
          config.earth.resolution,
          config.earth.resolution,
        ]}
      />
      <meshStandardMaterial map={albedoMap} />
    </mesh>
  );
}
