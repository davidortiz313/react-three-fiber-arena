import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import useGridStore from "../../store/grid-store";
import { data } from "./data";
import { state } from "./utils/state";
import { Corner } from "./drawings/corner";
import { Edges } from "./drawings/edges";
import { Surface } from "./drawings/surface";
import { Center } from "./drawings/center";

export const Scene: React.FC = () => {
  const { dataIdx, side, kind } = useGridStore();
  const [frontMap, backMap] = useLoader(THREE.TextureLoader, [
    "./assets/front.jpg",
    "./assets/back.jpg",
  ]);
  const [map, setMap] = useState(frontMap);
  useEffect(() => {
    setMap(side === "front" ? frontMap : backMap);
  }, [side, setMap, frontMap, backMap]);

  state.ratio = frontMap.image.height / frontMap.image.width;

  return (
    <group>
      <mesh>
        <planeBufferGeometry args={[1, 1 * state.ratio]} />
        <meshBasicMaterial map={map} />
      </mesh>

      {kind === "edge" && <Edges pointData={data[parseInt(dataIdx)]} />}
      {kind === "surface" && <Surface pointData={data[parseInt(dataIdx)]} />}
      {kind === "center" && <Center pointData={data[parseInt(dataIdx)]} />}
      {kind === "corner" && <Corner pointData={data[parseInt(dataIdx)]} />}
    </group>
  );
};
