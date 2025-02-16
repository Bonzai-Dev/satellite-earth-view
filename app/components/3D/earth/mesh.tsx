import { TextureLoader, Mesh, Euler, MeshStandardMaterial, Clock } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";

import math from "@/app/utils/math";
import config from "@/app/config";

import fragmentShader from "@/public/assets/shaders/earth/fragment.glsl";

import earthAlpha from "@/public/assets/img/earth/alpha.png";
import earthAlbedo from "@/public/assets/img/earth/albedo.jpg";
import earthBump from "@/public/assets/img/earth/bump.jpg";

export default function EarthMesh() {
  const earthRef = useRef<Mesh>(null!);

  const albedoMap = useLoader(TextureLoader, earthAlbedo.src);
  const bumpMap = useLoader(TextureLoader, earthBump.src);
  const alphaMap = useLoader(TextureLoader, earthAlpha.src);

  const earthMaterial = new MeshStandardMaterial({
    map: albedoMap,
    bumpMap: bumpMap,
    roughnessMap: alphaMap,
    metalnessMap: alphaMap,
    bumpScale: config.earth.ocean.bumpScale,
    metalness: config.earth.ocean.metalness,
  });

  earthMaterial.onBeforeCompile = function (shader) {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <roughnessmap_fragment>",
      fragmentShader
    );
  };

  useEffect(() => {
    const now = new Date();
    const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const initialRotation = (secondsSinceMidnight / 86400) * Math.PI * 2.1;
    earthRef.current.rotation.y = initialRotation;
  }, []);
  
  const rotationSpeed = (2 * Math.PI) / 86400;
  useFrame((state, delta) => {
    earthRef.current.rotation.y += rotationSpeed * delta;
  });

  return (
    <mesh
      ref={earthRef}
      rotation={new Euler(math.toRadians(config.earth.inclination))}
      material={earthMaterial}
    >
      <sphereGeometry
        args={[
          config.earth.radius,
          config.earth.resolution,
          config.earth.resolution,
        ]}
      />
    </mesh>
  );
}
