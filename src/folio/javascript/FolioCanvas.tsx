import { Canvas } from "@react-three/fiber";
import { LinearEncoding, NoToneMapping } from "three";
import Folio from "./Folio";
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'


export default function FolioCanvas() {
  return (
    <Canvas
      gl={{
        pixelRatio: 8,
        physicallyCorrectLights: true,
        autoClear: false,
        outputEncoding: LinearEncoding,
        toneMapping: NoToneMapping,
      }}
    >
        <ambientLight intensity={1} />
        <directionalLight
    position={[3.3, 1.0, 4.4]}
    castShadow
    intensity={3.5}
  />
          <directionalLight
    position={[10.3, -510.0, 4.4]}
    castShadow
    intensity={0.7}
  />

      <color attach="background" args={[0x000000]} />
      <Folio />
    </Canvas>
  );
}
