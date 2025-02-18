"use client";
import Input from "@/app/components/Layout/ControlPanel/Input";
import { useRef } from "react";
import { Vector3 } from "three";

export default function Menu({
  satelliteCoordinates,
  satelliteId,
  setSatelliteId,
}: {
  satelliteCoordinates: Vector3;
  satelliteId: string;
  setSatelliteId: (value: string) => void;
}) {
  const satelliteIdRef = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute flex items-end justify-end top-0 left-0 w-full h-full z-50 pointer-events-none">
      <div className="p-6 text-white bg-slate-900 rounded-lg h-screen backdrop-filter backdrop-blur-sm bg-opacity-0">
        <span className="w-full h-screen pointer-events-auto">
          <h1 className="font-bold">Control panel</h1>

          <div className="w-full h-full">
            <div>
              <Input
                ref={satelliteIdRef}
                title="Satellite ID"
                type="text"
                placeholder="00000"
              />

              <input
                onClick={() => {
                  console.log(
                    "satelliteIdRef value:",
                    satelliteIdRef.current?.value
                  );
                  setSatelliteId(satelliteIdRef.current?.value || "");
                }}
                className="ml-3 cursor-pointer"
                type="button"
                value="Submit"
              />
            </div>

            <div>
              <p>Satellite position</p>
              <div className="ml-3">
                <p>Longitude: {satelliteCoordinates.x}</p>
                <p>Latitude: {satelliteCoordinates.y}</p>
                <p>Altitude: {satelliteCoordinates.z}</p>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}
