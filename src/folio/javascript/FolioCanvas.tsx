import { Canvas } from "@react-three/fiber";
import { LinearEncoding, NoToneMapping } from "three";
import Folio from "./Folio";
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'


export default function FolioCanvas() {
  return (
    <Canvas
      gl={{
        pixelRatio: 2,
        physicallyCorrectLights: true ,
        autoClear: false,
        outputEncoding: LinearEncoding,
        toneMapping: NoToneMapping,
      }}
    >
        <ambientLight intensity={9} />


      <color attach="background" args={[0x000000]} />
      <Folio />
    </Canvas>
  );
}
