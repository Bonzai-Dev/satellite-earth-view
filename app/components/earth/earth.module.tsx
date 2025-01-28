"use client";
import React, { useRef, useEffect } from "react";
import * as three from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
			const scene = new three.Scene();
			const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			const renderer = new three.WebGLRenderer();
			
			containerRef.current?.appendChild(renderer.domElement);
		}
  }, []);

  return <div ref={containerRef} />;
}
