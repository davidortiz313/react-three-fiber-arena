import React, { useEffect } from "react";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import { state } from "./state";
import { isMobile } from "react-device-detect";

export const CameraDefaultPos: React.FC<{
  toggle: boolean;
}> = ({ toggle }) => {
  const { camera } = useThree();
  useEffect(() => {
    gsap.to(camera.position, {
      duration: 0.5,
      x: 0,
      y: 0,
      z: isMobile ? 3.2 : 2.2,
      onUpdate: () => {
        state.controls.target.set(camera.position.x, camera.position.y, 0);
      },
    });
  }, [toggle, camera]);
  return null;
};
