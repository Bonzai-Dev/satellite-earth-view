import { TextureLoader, Mesh, Euler } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";

import Clouds from "@/app/components/earth/clouds";
import math from "@/app/utils/math";
import config from "@/app/config";

export default function EarthMesh() {
  const earthRef = useRef<Mesh>(null!);
  const albedoMap = useLoader(TextureLoader, config.files.textures.earth.albedoMap);
  const bumpMap = useLoader(TextureLoader, config.files.textures.earth.bumpMap);

  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta * config.earth.rotationSpeed;
  });

  return (
    <>
    <Clouds />
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
    </>
  );
}
