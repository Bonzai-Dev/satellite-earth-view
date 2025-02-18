import { MeshStandardMaterial, TextureLoader } from "three";
import dynamic from "next/dynamic";
import { useLoader } from "@react-three/fiber";

import earthAlpha from "@/public/assets/img/earth/alpha.png";
import earthAlbedo from "@/public/assets/img/earth/albedo.jpg";
import earthBump from "@/public/assets/img/earth/bump.jpg";

import config from "@/app/config";
const Globe = dynamic(() => import("r3f-globe"), { ssr: false });

export default function Earth() {
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

  return (    
    <Globe globeMaterial={earthMaterial} />
  );
}
