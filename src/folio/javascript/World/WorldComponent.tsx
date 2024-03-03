import FloorComponent from "./FloorComponent";
import * as THREE from "three";
import IntroSectionComponent from "./Sections/IntroSectionComponent";
interface WorldComponentProps {
  options_prop: any;
}

export default function WorldComponent({ options_prop}: WorldComponentProps) {
  // if(options_prop){
  // console.log(options_prop.objects)
  // // if(options_prop.objects){
  // //   options_prop.objects.add({
  // //       base: options_prop.resources.items.crossroadsStaticBase.scene,
  // //       collision: options_prop.resources.items.crossroadsStaticCollision.scene,
  // //       floorShadowTexture: options_prop.resources.items.crossroadsStaticFloorShadowTexture,
  // //       offset: new THREE.Vector3(1, options_prop.y, 2),
  // //       mass: 10
  // //   })
  //   console.log(options_prop.objects)
  //   console.log("got there")
  // }
  // console.log(options_prop.objects)
// }
  return (
    <>
      <FloorComponent />
      <IntroSectionComponent scale={[2,2,4]}/>

      
    </>
  );
}
