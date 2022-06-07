import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Group } from "three";
import useStore from "../../store/rotate-store";
import { Card } from "./card";
import { state } from "./state";

export const Scene: React.FC = () => {
  console.log("Rotating Scene");
  const { rotating } = useStore();

  const groupRef = useRef<Group | null>(null);

  // rotate the model if not idle state
  useFrame((_, delta) => {
    if (rotating) groupRef.current!.rotation.y += 0.01;
  });

  useEffect(() => {
    if (rotating) {
      groupRef.current!.rotation.y = 0;
      state.controls.reset();
    }
  }, [rotating]);

  return (
    <group ref={groupRef}>
      <Card
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
