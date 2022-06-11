// @ts-nocheck
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { useEffect, useRef, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
extend({ EffectComposer, UnrealBloomPass, RenderPass });

export function Effects({ children }) {
  const { gl, camera, size } = useThree();
  const [scene, setScene] = useState();
  const composer = useRef();
  useEffect(
    () => void scene && composer.current.setSize(size.width, size.height),
    [size, scene]
  );
  useFrame(() => {
    if (scene) {
      composer.current.render();
    }
  }, 1);
  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 0.8, 0]} />
      </effectComposer>
    </>
  );
}

export function Main({ children }) {
  const scene = useRef();
  const { gl, camera } = useThree();
  useFrame(() => {
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene.current, camera);
  }, 2);
  return <scene ref={scene}>{children}</scene>;
}
