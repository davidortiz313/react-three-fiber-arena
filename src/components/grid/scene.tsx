import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { data } from "./data";
import { state } from "./utils/state";
import { Corner } from "./drawings/corner";
import { Edges } from "./drawings/edges";
import { Surface } from "./drawings/surface";
import { Center } from "./drawings/center";
// import { Effects , Main} from "./utils/effects";
import { Effects } from "./utils/_effects";
import { useGridContext } from "../../context/project-context";
import { Auto } from "./drawings/auto";

export const Scene: React.FC = () => {
  const {
    data: { dataIdx, side, kind },
  } = useGridContext();
  const meshRef = useRef();
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
    <Effects meshRef={meshRef}>
      <mesh ref={meshRef}>
        <planeBufferGeometry args={[1, 1 * state.ratio]} />
        <meshBasicMaterial map={map} />
      </mesh>
      <ambientLight intensity={1} />
      <directionalLight />
      {kind === "edge" && <Edges pointData={data[parseInt(dataIdx!)]} />}
      {kind === "surface" && <Surface pointData={data[parseInt(dataIdx!)]} />}
      {kind === "center" && <Center pointData={data[parseInt(dataIdx!)]} />}
      {kind === "corner" && <Corner pointData={data[parseInt(dataIdx!)]} />}
      {kind === "auto" && <Auto pointData={data[parseInt(dataIdx!)]} />}
    </Effects>
  );
};

//   return (
//     <>
//       <Main>
//         <pointLight />
//         <ambientLight />
//         <mesh>
//           <planeBufferGeometry args={[1, 1 * state.ratio]} />
//           <meshBasicMaterial map={map} depthTest={false} />
//         </mesh>
//         {/* {kind === "surface" && <Surface pointData={data[parseInt(dataIdx!)]} />}
//         {kind === "center" && <Center pointData={data[parseInt(dataIdx!)]} />} */}
//       </Main>

//       <Effects>
//         <ambientLight intensity={1} />
//         <directionalLight />
//         {/* <mesh>
//           <planeBufferGeometry args={[1, 1 * state.ratio]} />
//           <meshBasicMaterial color="#0c5c03" />
//         </mesh> */}
//         {kind === "edge" && <Edges pointData={data[parseInt(dataIdx!)]} />}
//         {kind === "surface" && <Surface pointData={data[parseInt(dataIdx!)]} />}
//         {kind === "center" && <Center pointData={data[parseInt(dataIdx!)]} />}
//         {kind === "corner" && <Corner pointData={data[parseInt(dataIdx!)]} />}
//       </Effects>
//     </>
//   );
// };
