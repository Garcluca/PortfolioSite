import FloorComponent from "./FloorComponent";
import PlantWall from '../Components/PlantWall'
import * as THREE from "three";
import IntroSectionComponent from "./Sections/IntroSectionComponent";


export default function WorldComponent() {

  return (
    <>
      <FloorComponent />
      <IntroSectionComponent/>
      <PlantWall />


      
    </>
  );
}
