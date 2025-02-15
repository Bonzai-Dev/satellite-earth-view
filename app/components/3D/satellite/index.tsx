import { useState, useEffect } from "react";
import { Detailed, Line } from "@react-three/drei";
import { Vector3 } from "three";
import { DetailedSatellite, TleLine1, TleLine2, Vector } from "ootk";

import config from "@/app/config";
import { vec2 } from "three/tsl";

interface SatelliteData {
  name: string;
  tleData: {
    tleOne: string;
    tleTwo: string;
  };
  noradId: string;
  country: string;
  launchDate: string;
  purpose: string;
  owner: string;
  launchSite: string;
  launchVehicle: string;
  geographicCoordinates: {
    lon: number;
    lat: number;
    alt: number;
  };
}

export default function Satellite() {
  const [satellitePosition, setSatellitePosition] = useState<Vector3>();

  useEffect(() => {
    async function fetchSatellite() {
      try {
        // const res = await fetch(
        //   "http://192.168.0.112:3000/api/get/satellites/search/25544"
        // );
        // const data: SatelliteData = await res.json();
        const data = {
          name: "ISS (ZARYA)",
          tleData: {
            tleOne:
              "1 25544U 98067A   25046.66546928  .00014234  00000-0  25559-3 0  9996",
            tleTwo:
              "2 25544  51.6396 188.9093 0004418 323.8501 155.7067 15.50144684496311",
          },
          noradId: "25544",
          country: "United States",
          launchDate: "1998-11-20",
          purpose: "Space Station",
          owner: "NASA",
          launchSite: "Baikonur Cosmodrome",
          launchVehicle: "Proton",
          geographicCoordinates: { lon: 0, lat: 0, alt: 0 },
        };

        const detailedSatellite = new DetailedSatellite({
          id: parseInt(data.noradId),
          tle1: data.tleData.tleOne as TleLine1,
          tle2: data.tleData.tleTwo as TleLine2,
        });

        setSatellitePosition(
          new Vector3(
            config.earth.geometrySize + detailedSatellite.lla().lon / 3185.5,
            config.earth.geometrySize + detailedSatellite.lla().alt / 3185.5,
            config.earth.geometrySize + detailedSatellite.lla().lat / 3185.5
          )
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchSatellite();
  }, [satellitePosition]);

  if (!satellitePosition) return null;

  return (
    <mesh
      position={satellitePosition}
    >
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshBasicMaterial color="red" opacity={0.8} transparent />
    </mesh>
  );
}
