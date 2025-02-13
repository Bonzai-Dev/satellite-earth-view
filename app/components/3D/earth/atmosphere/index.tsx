import { Mesh, Euler, AdditiveBlending, BackSide } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import math from "@/app/utils/math";
import config from "@/app/config";

import vertexShader from "@/public/assets/shaders/vertex.glsl";
import fragmentShader from "@/public/assets/shaders/fragment.glsl";

export default function AtmosphereMesh() {
  const atmosphereRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    atmosphereRef.current.rotation.y += delta * config.earth.rotationSpeed;
  });

  return (
    <mesh
      ref={atmosphereRef}
      rotation={new Euler(math.toRadians(config.earth.inclination))}
    >
      <sphereGeometry
        args={[
          config.earth.geometrySize + 0.15,
          config.earth.resolution,
          config.earth.resolution,
        ]}
      />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={AdditiveBlending}
        side={BackSide}
        uniforms={{
          opacity: config.earth.atmosphere.opacity,
          powerFactor: config.earth.atmosphere.powerFactor,
          multiplier: config.earth.atmosphere.multiplier,
        }}
      />
    </mesh>
  );
}
