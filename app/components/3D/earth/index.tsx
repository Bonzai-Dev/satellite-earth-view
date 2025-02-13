import CloudsMesh from "@/app/components/3D/earth/clouds";
import EarthMesh from "@/app/components/3D/earth/mesh";
import AtmosphereMesh from "@/app/components/3D/earth/atmosphere";

export default function Earth() {
  return (
    <>
      <CloudsMesh />
      <EarthMesh />
      <AtmosphereMesh />
    </>
  );
}
