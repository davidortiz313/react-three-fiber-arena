import React, { useEffect } from "react";
import { Environment as EnvironmentLoader } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, useThree } from "@react-three/fiber";
import { usePackAnimContext } from "../../context/project-context";

export const Environment: React.FC = () => {
  const {
    data: { state },
  } = usePackAnimContext();
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.target.set(0, -0.1, 0);
    controls.dampingFactor = 0.05;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = false;
    state.controls = controls;
    return () => {
      controls.dispose();
    };
  }, [camera, gl, state]);

  useFrame(() => {
    if (!state.controls) return;
    state.controls.update();
  });

  return (
    <React.Fragment>
      <EnvironmentLoader
        background={false}
        path={"./assets/HDRI/"}
        files={"small.hdr"}
      />
      <ambientLight intensity={2} />
      <directionalLight position={[3, 5, -3]} intensity={1} />
    </React.Fragment>
  );
};
