import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function PlantWall() {

    console.log("hello")
    const gltf = useLoader(GLTFLoader, "./models/intro/static/plant_wall.glb")

    //rotation should match with introsection.js's static placement to line up with collision
    //also holds all of the other objects on the desk
    // may add annother for below.
    return <primitive object={gltf.scene} scale={[10,10,10]} rotation={[1.5,.8,-0.1]} position={[-40,-50,3]}/>
}

useGLTF.preload("./models/intro/static/plant_wall.glb");
