import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { state } from "./state";

export const Controls: React.FC = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const _controls = new OrbitControls(camera, gl.domElement);
    _controls.target.set(0, 0, 0);
    _controls.enableDamping = false;
    _controls.enableRotate = false;
    _controls.minDistance = 0.1;
    _controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
    _controls.touches.ONE = THREE.TOUCH.PAN;
    state.controls = _controls;

    return () => {
      _controls.dispose();
    };
  }, [camera, gl]);

  useFrame(() => {
    if (!state.controls) return;
    state.controls.update();
  });
  return null;
};
