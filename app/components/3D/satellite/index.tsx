import React, { useState, useEffect } from "react";
import { Line, Billboard, Text } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Vector3, TextureLoader } from "three";
import { DetailedSatellite, TleLine1, TleLine2 } from "ootk";
import satelliteMarker from "@/public/assets/img/Satellite.png";
import math from "@/app/utils/math";

import config from "@/app/config";

type SatelliteProps = {
  onCoordinatesUpdate?: (coords: Vector3) => void;
  satelliteId: string;
};

export default function Satellite({
  onCoordinatesUpdate,
  satelliteId,
}: SatelliteProps) {
  const [satelliteCoordinates, setSatelliteCoordinates] = useState<Vector3>(
    new Vector3()
  );
  const [satellitePosition, setSatellitePosition] = useState<Vector3>(
    new Vector3()
  );
  const [satelliteName, setSatelliteName] = useState<string>("Satellite");
  const [data, setSatelliteData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${config.api}${satelliteId}`);
        const data = await res.json();
        setSatelliteData(data);
        console.log("Fetching data")
      } catch (error) {
        console.error(error);
      }
    } 
    fetchData();
  }, [satelliteId]);

  useEffect(() => {
    function parseSatelliteData() {
      try {
        const detailedSatellite = new DetailedSatellite({
          id: parseInt(data.noradId),
          tle1: data.tleData.tleOne as TleLine1,
          tle2: data.tleData.tleTwo as TleLine2,
        });

        const lla = detailedSatellite.lla();

        const newCoordinates = new Vector3(lla.lon, lla.lat, lla.alt);
        setSatelliteCoordinates(newCoordinates);
        if (onCoordinatesUpdate) onCoordinatesUpdate(newCoordinates);

        const radius = 100;
        setSatellitePosition(
          new Vector3().setFromSphericalCoords(
            radius + (lla.alt * radius) / 6371,
            Math.PI / 2 - math.toRadians(lla.lat),
            math.toRadians(lla.lon)
          )
        );
        setSatelliteName(data.name);
      } catch (error) {
        console.error(error);
      }
    }

    parseSatelliteData();
    const interval = setInterval(parseSatelliteData, 1000);
    return () => clearInterval(interval);
  }, [onCoordinatesUpdate, data]);

  if (!satellitePosition) return null;

  return (
    <>
      <mesh position={satellitePosition}>
        <Billboard>
          <mesh>
            <planeGeometry args={[2.5, 2.5]} />
            <meshBasicMaterial
              map={useLoader(TextureLoader, satelliteMarker.src)}
              color={0xe80000}
              transparent
            />
          </mesh>
        </Billboard>

        <Billboard>
          <Text fontSize={5} color="white" position={[0, 5, 0]}>
            {satelliteName}
          </Text>
          <Text fontSize={3} color="white">
            {`${Math.floor(satelliteCoordinates.z * 100) / 100} km`}
          </Text>
        </Billboard>
      </mesh>

      <Line points={[satellitePosition, new Vector3(0, 0, 0)]} color="white" />
    </>
  );
}
