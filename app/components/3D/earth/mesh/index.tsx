import { TextureLoader, Mesh, Euler, MeshStandardMaterial } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";

import math from "@/app/utils/math";
import config from "@/app/config";

import fragmentShader from "@/public/assets/shaders/earth/fragment.glsl";

import earthAlphaMap from "@/public/assets/img/earth/alpha.png";
import earthAlbedoMap from "@/public/assets/img/earth/albedo.jpg";
import earthBumpMap from "@/public/assets/img/earth/bump.jpg";

export default function EarthMesh() {
  const earthRef = useRef<Mesh>(null!);

  const albedoMap = useLoader(TextureLoader, earthAlbedoMap.src);
  const bumpMap = useLoader(TextureLoader, earthBumpMap.src);
  const alphaMap = useLoader(TextureLoader, earthAlphaMap.src);

  const earthMaterial = new MeshStandardMaterial({
    map: albedoMap,
    bumpMap: bumpMap,
    bumpScale: 0.03,
    roughnessMap: alphaMap,
    metalness: 0.1,
    metalnessMap: alphaMap,
  });

  earthMaterial.onBeforeCompile = function (shader) {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <roughnessmap_fragment>",
      fragmentShader
    );
  };

  useFrame((state, delta) => {
    earthRef.current.rotation.y += delta * config.earth.rotationSpeed;
  });

  return (
    <mesh
      ref={earthRef}
      rotation={new Euler(math.toRadians(config.earth.inclination))}
      material={earthMaterial}
    >
      <sphereGeometry
        args={[
          config.earth.geometrySize,
          config.earth.resolution,
          config.earth.resolution,
        ]}
      />
    </mesh>
  );
}
