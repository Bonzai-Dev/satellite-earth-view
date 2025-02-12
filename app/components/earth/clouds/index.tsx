import { TextureLoader, Mesh, Euler } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";

import math from "@/app/utils/math";
import config from "@/app/config";

export default function CloudMesh() {
  const cloudsRef = useRef<Mesh>(null!);
  const alphaMap = useLoader(
    TextureLoader,
    config.files.textures.clouds.albedoMap
  );

  useFrame((state, delta) => {
    cloudsRef.current.rotation.y += delta * config.earth.cloudsRotationSpeed;
  });

  return (
    <mesh
      ref={cloudsRef}
      rotation={new Euler(math.toRadians(config.earth.inclination))}
    >
      <sphereGeometry
        args={[
          config.earth.geometrySize + 0.005,
          config.earth.resolution,
          config.earth.resolution,
        ]}
      />
      <meshStandardMaterial alphaMap={alphaMap} transparent />
    </mesh>
  );
}
