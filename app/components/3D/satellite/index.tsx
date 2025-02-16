import { useState, useEffect } from "react";
import { Line, Billboard, Text } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Vector3, TextureLoader, Euler } from "three";
import { DetailedSatellite, TleLine1, TleLine2 } from "ootk";

import config from "@/app/config";
import satelliteMarker from "@/public/assets/img/Satellite.png";

import math from "@/app/utils/math";

export default function Satellite() {
  const [satelliteCoordinates, setSatelliteCoordinates] = useState<Vector3>(new Vector3());
  const [satellitePosition, setSatellitePosition] = useState<Vector3>(new Vector3());
  const [satelliteName, setSatelliteName] = useState<string>("Satellite");

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
              "1 00900U 64063C   25047.58174728  .00001043  00000-0  10668-2 0  9999",
            tleTwo:
              "2 00900  90.2072  60.6864 0024169 326.3522 155.1313 13.75817356  4634",
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

        setSatelliteCoordinates(
          new Vector3(
            detailedSatellite.lla().lon,
            detailedSatellite.lla().lat,
            detailedSatellite.lla().alt
          )
        );

        setSatellitePosition(
          new Vector3().setFromSphericalCoords(
            config.earth.radius + detailedSatellite.lla().alt / 3185.5,
            Math.PI / 2 - math.toRadians(detailedSatellite.lla().lat),
            math.toRadians(detailedSatellite.lla().lon),
          )
        );
        setSatelliteName(data.name);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSatellite();
    const interval = setInterval(fetchSatellite, 1000);
    return () => clearInterval(interval);
  }, []);
  if (!satellitePosition) return null;

  return (
    <>
      <mesh position={satellitePosition.applyEuler(new Euler(config.earth.inclination, 0, 0))}>
        <Billboard>
          <mesh>
            <planeGeometry args={[0.05, 0.05]} />
            <meshBasicMaterial
              map={useLoader(TextureLoader, satelliteMarker.src)}
              color={0xe80000}
              transparent
            />
          </mesh>
        </Billboard>

        <Billboard>
          <Text fontSize={0.05} color="white" position={[0, 0.05, 0]}>
            {satelliteName}
          </Text>

          <Text fontSize={0.03} color="white">
            {`${Math.floor(satelliteCoordinates.z * 100) / 100} km`}
          </Text>
        </Billboard>
      </mesh>

      <Line points={[satellitePosition, new Vector3(0, 0, 0)]} color="white" />
    </>
  );
}
