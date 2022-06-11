import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { usePackAnimContext } from "../../context/project-context";
import { AnimatedCard } from "./animated-card";

export const Scene: React.FC<{ toggle: boolean }> = ({ toggle }) => {
  console.log("Pack Scene");
  const {
    data: {
      playing,
      rotating,
      idle,
      state: { controls },
    },
    updateData,
  } = usePackAnimContext();

  const groupRef = useRef<any>(null);
  // reset entire animation with togggle button
  useEffect(() => {
    updateData({
      playing: true,
      rotating: false,
      idle: false,
    });
    groupRef.current!.rotation.y = 0;
    if (controls) {
      controls.reset();
      controls.enableDamping = true;
      controls.enableRotate = false;
    }
  }, [toggle, controls, updateData]);

  // rotate the model if not idle state
  useFrame(() => {
    if (playing || !rotating || idle) return;
    groupRef.current!.rotation.y += 0.01;
  });

  // if animaion stops, start rotating
  useEffect(() => {
    if (playing) return;
    groupRef.current!.rotation.y = 0;
    updateData({ rotating: true });
  }, [playing, updateData]);

  // reset control when idle --> rotate
  useEffect(() => {
    if (idle) return;
    controls?.reset();
    groupRef.current!.rotation.y = 0;
  }, [idle, controls]);

  return (
    <group ref={groupRef}>
      <AnimatedCard
        cardFront={
          "https://storage.googleapis.com/arenaxlab/trimmed_scans/cc5c0bff-35e4-43d7-98bf-559189da9249_front_scan_1646698221.993237.jpg"
        }
        cardBack={
          "https://storage.googleapis.com/arenaxlab/trimmed_scans/cc5c0bff-35e4-43d7-98bf-559189da9249_back_scan_1646698388.097209.jpg"
        }
        labelFront={
          "https://storage.googleapis.com/arenaxlab/800_labels/8AC000001089-front.png"
        }
        labelBack={
          "https://storage.googleapis.com/arenaxlab/800_labels/8AC000001089-back.png"
        }
      />
    </group>
  );
};
