import FloorComponent from "./FloorComponent";
import PlantWall from '../Components/PlantWall'
import * as THREE from "three";
import IntroSectionComponent from "./Sections/IntroSectionComponent";
import { Boxes } from "./Boxes";
interface WorldComponentProps {
  options_prop: any;
}

export default function WorldComponent({ options_prop}: WorldComponentProps) {

  return (
    <>
      <FloorComponent />
      <IntroSectionComponent/>
      <PlantWall />


      
    </>
  );
}
