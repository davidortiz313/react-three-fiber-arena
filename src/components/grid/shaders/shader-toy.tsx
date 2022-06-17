import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, ShaderMaterial, TextureLoader, Vector4 } from "three";
import { vertexShader } from "../shaders/vertex-shader";
import { fragmentShader } from "../shaders/fragment-shader";
import { state } from "../utils/state";
import { useGridContext } from "../../../context/project-context";

export function ShaderToy({ edges }: { edges: Vector4[] }) {
  const {
    data: { side },
  } = useGridContext();

  const [frontMap, backMap] = useLoader(TextureLoader, [
    "./assets/front.jpg",
    "./assets/back.jpg",
  ]);
  const [map, setMap] = useState(frontMap);

  useEffect(() => {
    setMap(side === "front" ? frontMap : backMap);
  }, [side, setMap, frontMap, backMap]);

  const mesh = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      ratio: { value: state.ratio },
      tex: { value: map },
      edges: { value: edges.length !== 0 ? edges : [new Vector4(0, 0, 0, 0)] },
    }),
    [edges, map]
  );

  useEffect(() => {
    if (!mesh.current) return;
    (mesh.current as Mesh).material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader: `#define lenOfEdges ${
        edges.length !== 0 ? edges.length : 1
      } \n ${fragmentShader}`,
      transparent: true,
    });
  }, [edges, uniforms]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    (mesh.current as any).material.uniforms.uTime.value += delta;
  });
  return (
    <group>
      <mesh ref={mesh}>
        <planeGeometry args={[1.2, 1.2 * state.ratio]} />
      </mesh>
    </group>
  );
}
