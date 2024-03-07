import { Plane } from "@react-three/drei";
import { useControls } from "leva";

export default function FloorComponent() {
  const { topLeftColor, topRightColor, bottomLeftColor, bottomRightColor } =
    useControls(
      "Floor",
      {
        // apparently if you omit or double add the sharp  it defaults to white
        topLeftColor: "#df00f5",
        topRightColor: "#8928eb",
        bottomLeftColor: "#4980f2",
        bottomRightColor: "#9944fc",
      },
      { collapsed: true, color: "#f58e11" }
    );

  return (
    <Plane args={[2, 2]} frustumCulled={false} matrixAutoUpdate={false}>
      <floorMaterial
        topLeftColor={topLeftColor}
        topRightColor={topRightColor}
        bottomRightColor={bottomRightColor}
        bottomLeftColor={bottomLeftColor}
      />
    </Plane>
  );
}
